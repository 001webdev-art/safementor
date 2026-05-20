import 'package:flutter/foundation.dart';

import '../data/auth_repository.dart';
import '../models/auth_session.dart';

class AuthController extends ChangeNotifier {
  AuthController(this._repository);

  final AuthRepository _repository;

  AuthSession? _session;
  bool _isRestoring = true;
  bool _isBusy = false;
  String? _error;

  AuthSession? get session => _session;
  bool get isRestoring => _isRestoring;
  bool get isBusy => _isBusy;
  bool get isAuthenticated => _session != null;
  String? get error => _error;

  Future<void> restoreSession() async {
    _isRestoring = true;
    notifyListeners();
    try {
      _session = await _repository.restore();
    } finally {
      _isRestoring = false;
      notifyListeners();
    }
  }

  Future<void> signIn(String email, String password) async {
    _isBusy = true;
    _error = null;
    notifyListeners();
    try {
      _session = await _repository.signIn(email, password);
    } catch (error) {
      _error = error.toString().replaceFirst('Exception: ', '');
    } finally {
      _isBusy = false;
      notifyListeners();
    }
  }

  Future<void> signOut() async {
    final oldSession = _session;
    _session = null;
    notifyListeners();
    await _repository.signOut(oldSession);
  }
}
