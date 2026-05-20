import 'dart:convert';

import 'package:http/http.dart' as http;

import '../../../core/config/app_config.dart';
import '../../auth/models/auth_session.dart';
import '../models/chat_message.dart';
import '../models/child_profile.dart';

class ChatRepository {
  ChatRepository(this._config, {http.Client? client})
    : _client = client ?? http.Client();

  final AppConfig _config;
  final http.Client _client;

  Map<String, String> _headers(AuthSession session) => {
    'apikey': _config.supabaseAnonKey,
    'Authorization': 'Bearer ${session.accessToken}',
    'Content-Type': 'application/json',
  };

  Future<List<ChildProfile>> fetchChildren(AuthSession session) async {
    final uri = Uri.parse(
      '${_config.restUrl}/children?select=id,nickname,birth_month,birth_year,language&parent_id=eq.${session.userId}',
    );
    final response = await _client.get(uri, headers: _headers(session));
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception('Failed to load children');
    }
    final rows = jsonDecode(response.body) as List<dynamic>;
    return rows
        .map((row) => ChildProfile.fromJson(row as Map<String, dynamic>))
        .toList();
  }

  Future<List<ChatMessage>> fetchMessages(
    AuthSession session,
    String childId,
  ) async {
    final uri = Uri.parse(
      '${_config.restUrl}/chat_messages?select=*&child_id=eq.$childId&order=timestamp.asc&limit=100',
    );
    final response = await _client.get(uri, headers: _headers(session));
    if (response.statusCode < 200 || response.statusCode >= 300) {
      return const [];
    }
    final rows = jsonDecode(response.body) as List<dynamic>;
    return rows
        .map((row) => ChatMessage.fromSupabaseJson(row as Map<String, dynamic>))
        .toList();
  }

  Future<bool> saveMessage(AuthSession session, ChatMessage message) async {
    final response = await _client.post(
      Uri.parse('${_config.restUrl}/chat_messages'),
      headers: {..._headers(session), 'Prefer': 'return=minimal'},
      body: jsonEncode(message.toSupabaseJson()),
    );
    return response.statusCode >= 200 && response.statusCode < 300;
  }
}
