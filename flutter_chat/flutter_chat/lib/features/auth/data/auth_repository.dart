import 'dart:convert';

import 'package:http/http.dart' as http;

import '../../../core/config/app_config.dart';
import '../../../core/storage/secure_session_store.dart';
import '../models/auth_session.dart';

class AuthRepository {
  AuthRepository(this._config, {http.Client? client, SecureSessionStore? store})
    : _client = client ?? http.Client(),
      _store = store ?? SecureSessionStore();

  final AppConfig _config;
  final http.Client _client;
  final SecureSessionStore _store;

  Map<String, String> get _baseHeaders => {
    'apikey': _config.supabaseAnonKey,
    'Content-Type': 'application/json',
  };

  Future<AuthSession?> restore() async {
    final session = await _store.read();
    if (session == null) return null;
    if (!session.isExpired) return session;
    return refresh(session.refreshToken);
  }

  Future<AuthSession> signIn(String email, String password) async {
    final response = await _client.post(
      Uri.parse('${_config.authUrl}/token?grant_type=password'),
      headers: _baseHeaders,
      body: jsonEncode({'email': email.trim(), 'password': password}),
    );

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(_readError(response.body, fallback: 'Login failed'));
    }

    final session = AuthSession.fromSupabaseJson(
      jsonDecode(response.body) as Map<String, dynamic>,
    );
    await _store.save(session);
    return session;
  }

  Future<AuthSession?> refresh(String refreshToken) async {
    final response = await _client.post(
      Uri.parse('${_config.authUrl}/token?grant_type=refresh_token'),
      headers: _baseHeaders,
      body: jsonEncode({'refresh_token': refreshToken}),
    );

    if (response.statusCode < 200 || response.statusCode >= 300) {
      await _store.clear();
      return null;
    }

    final session = AuthSession.fromSupabaseJson(
      jsonDecode(response.body) as Map<String, dynamic>,
    );
    await _store.save(session);
    return session;
  }

  Future<void> signOut(AuthSession? session) async {
    if (session != null) {
      await _client.post(
        Uri.parse('${_config.authUrl}/logout'),
        headers: {..._baseHeaders, ...session.authHeaders},
      );
    }
    await _store.clear();
  }

  String _readError(String body, {required String fallback}) {
    try {
      final data = jsonDecode(body) as Map<String, dynamic>;
      return data['msg'] as String? ??
          data['error_description'] as String? ??
          fallback;
    } catch (_) {
      return fallback;
    }
  }
}
