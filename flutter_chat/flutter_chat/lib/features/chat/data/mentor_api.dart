import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;

import '../../../core/config/app_config.dart';

class MentorChunk {
  const MentorChunk({required this.type, this.content, this.data});

  final String type;
  final String? content;
  final Map<String, dynamic>? data;
}

class MentorApi {
  MentorApi(this._config, {http.Client? client})
    : _client = client ?? http.Client();

  final AppConfig _config;
  final http.Client _client;

  Stream<MentorChunk> streamResponse({
    required String message,
    required String childAge,
    required String childLanguage,
    required List<Map<String, String>> chatHistory,
  }) async* {
    final request =
        http.Request('POST', Uri.parse('${_config.mentorBaseUrl}/mentor'))
          ..headers.addAll({
            'Content-Type': 'application/json',
            'Accept': 'application/x-ndjson',
          })
          ..body = jsonEncode({
            'message': message,
            'chat_history': chatHistory,
            'child_age': childAge,
            'child_country': 'Germany',
            'child_language': childLanguage,
          });

    final response = await _client.send(request);
    if (response.statusCode < 200 || response.statusCode >= 300) {
      final body = await response.stream.bytesToString();
      throw Exception('Mentor API error (${response.statusCode}): $body');
    }

    var buffer = '';
    await for (final chunk in response.stream.transform(utf8.decoder)) {
      buffer += chunk;
      final lines = buffer.split('\n');
      buffer = lines.removeLast();
      for (final line in lines) {
        final trimmed = line.trim();
        if (trimmed.isEmpty) continue;
        final json = jsonDecode(trimmed) as Map<String, dynamic>;
        yield MentorChunk(
          type: json['type'] as String? ?? 'content',
          content: json['content'] as String?,
          data: json['data'] as Map<String, dynamic>?,
        );
      }
    }

    final tail = buffer.trim();
    if (tail.isNotEmpty) {
      final json = jsonDecode(tail) as Map<String, dynamic>;
      yield MentorChunk(
        type: json['type'] as String? ?? 'content',
        content: json['content'] as String?,
        data: json['data'] as Map<String, dynamic>?,
      );
    }
  }

  Future<String> fallbackResponse(String message) async {
    await Future<void>.delayed(const Duration(milliseconds: 700));
    return "I can't reach my brain right now, but I am still here. Ask an adult to check the Mentor backend, then try again.";
  }
}
