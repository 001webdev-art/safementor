import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uuid/uuid.dart';

import '../../auth/state/auth_controller.dart';
import '../data/chat_repository.dart';
import '../data/mentor_api.dart';
import '../models/chat_message.dart';
import '../models/child_profile.dart';

enum ChatView { hello, chat, help }

enum StreamingStatus { idle, analyzing, streaming, error }

class ChatController extends ChangeNotifier {
  ChatController({
    required AuthController authController,
    required ChatRepository chatRepository,
    required MentorApi mentorApi,
  }) : _authController = authController,
       _chatRepository = chatRepository,
       _mentorApi = mentorApi;

  final AuthController _authController;
  final ChatRepository _chatRepository;
  final MentorApi _mentorApi;
  final _uuid = const Uuid();

  ChatView view = ChatView.hello;
  List<ChildProfile> children = [];
  ChildProfile? activeChild;
  List<ChatMessage> messages = [];
  StreamingStatus streamingStatus = StreamingStatus.idle;
  String streamingContent = '';
  String? error;
  bool isLoadingChildren = false;

  StreamSubscription<MentorChunk>? _streamSub;

  Future<void> loadChildren() async {
    final session = _authController.session;
    if (session == null) return;
    isLoadingChildren = true;
    error = null;
    // Always start at the child-selection screen: clear any child kept from a
    // previous session so the parent picks who is using the chat each time.
    activeChild = null;
    messages = [];
    notifyListeners();
    try {
      children = await _chatRepository.fetchChildren(session);
      // With a single child there is nothing to pick: skip the selection
      // screen and go straight to the welcome screen.
      if (children.length == 1) {
        await selectChild(children.first.id);
      }
    } catch (err) {
      error = err.toString().replaceFirst('Exception: ', '');
    } finally {
      isLoadingChildren = false;
      notifyListeners();
    }
  }

  Future<void> selectChild(String? childId) async {
    if (childId == null) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('chat_selected_child');
      activeChild = null;
      messages = [];
      notifyListeners();
      return;
    }

    activeChild = children.where((child) => child.id == childId).firstOrNull;
    // Show the age-appropriate welcome screen right after a child is picked.
    view = ChatView.hello;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('chat_selected_child', childId);
    notifyListeners();
    await loadMessages();
  }

  Future<void> loadMessages() async {
    final session = _authController.session;
    final child = activeChild;
    if (session == null || child == null) return;
    messages = await _chatRepository.fetchMessages(session, child.id);
    notifyListeners();
  }

  void setView(ChatView next) {
    view = next;
    notifyListeners();
  }

  Future<void> sendMessage(String content) async {
    final session = _authController.session;
    final child = activeChild;
    if (session == null || child == null || content.trim().isEmpty) return;

    final userMessage = ChatMessage(
      id: _uuid.v4(),
      childId: child.id,
      role: MessageRole.user,
      content: content.trim(),
      timestamp: DateTime.now(),
      nickname: child.nickname,
    );
    messages = [...messages, userMessage];
    notifyListeners();
    unawaited(_chatRepository.saveMessage(session, userMessage));

    streamingStatus = StreamingStatus.analyzing;
    streamingContent = '';
    error = null;
    notifyListeners();

    final history = messages
        .where(
          (message) =>
              message.role == MessageRole.user ||
              message.role == MessageRole.assistant,
        )
        .take(messages.length - 1)
        .toList()
        .reversed
        .take(5)
        .toList()
        .reversed
        .map(
          (message) => {'role': message.role.name, 'content': message.content},
        )
        .toList();

    var fullContent = '';
    Map<String, dynamic>? intent;

    try {
      _streamSub = _mentorApi
          .streamResponse(
            message: content.trim(),
            childAge: child.age.toString(),
            childLanguage: child.language ?? 'en',
            chatHistory: history,
          )
          .listen(
            (chunk) {
              if (chunk.type == 'intent') {
                intent = chunk.data;
                streamingStatus = StreamingStatus.streaming;
              } else if (chunk.type == 'content') {
                streamingStatus = StreamingStatus.streaming;
                fullContent += chunk.content ?? '';
                streamingContent = fullContent;
              } else if (chunk.type == 'error') {
                error = chunk.content;
                streamingStatus = StreamingStatus.error;
              }
              notifyListeners();
            },
            onError: (Object err) async {
              fullContent = await _mentorApi.fallbackResponse(content);
              await _finalizeAssistantMessage(
                session,
                child,
                userMessage.id,
                fullContent,
                intent,
              );
            },
            onDone: () async {
              if (fullContent.isNotEmpty) {
                await _finalizeAssistantMessage(
                  session,
                  child,
                  userMessage.id,
                  fullContent,
                  intent,
                );
              }
              streamingStatus = StreamingStatus.idle;
              streamingContent = '';
              notifyListeners();
            },
            cancelOnError: true,
          );
    } catch (err) {
      fullContent = await _mentorApi.fallbackResponse(content);
      await _finalizeAssistantMessage(
        session,
        child,
        userMessage.id,
        fullContent,
        intent,
      );
      streamingStatus = StreamingStatus.idle;
      streamingContent = '';
      notifyListeners();
    }
  }

  Future<void> _finalizeAssistantMessage(
    dynamic session,
    ChildProfile child,
    String parentId,
    String content,
    Map<String, dynamic>? intent,
  ) async {
    final assistantMessage = ChatMessage(
      id: _uuid.v4(),
      childId: child.id,
      role: MessageRole.assistant,
      content: content,
      timestamp: DateTime.now(),
      parentMessageId: parentId,
      nickname: child.nickname,
      intent: intent,
    );
    messages = [...messages, assistantMessage];
    await _chatRepository.saveMessage(session, assistantMessage);
  }

  Future<void> stopStreaming() async {
    await _streamSub?.cancel();
    _streamSub = null;
    streamingStatus = StreamingStatus.idle;
    streamingContent = '';
    notifyListeners();
  }

  @override
  void dispose() {
    _streamSub?.cancel();
    super.dispose();
  }
}
