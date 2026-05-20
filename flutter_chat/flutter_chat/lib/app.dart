import 'package:flutter/material.dart';

import 'core/config/app_config.dart';
import 'core/localization/app_strings.dart';
import 'core/theme/app_theme.dart';
import 'features/auth/data/auth_repository.dart';
import 'features/auth/state/auth_controller.dart';
import 'features/auth/ui/login_screen.dart';
import 'features/chat/data/chat_repository.dart';
import 'features/chat/data/mentor_api.dart';
import 'features/chat/state/chat_controller.dart';
import 'features/chat/ui/chat_shell.dart';

class SafeMentorApp extends StatefulWidget {
  const SafeMentorApp({super.key});

  @override
  State<SafeMentorApp> createState() => _SafeMentorAppState();
}

class _SafeMentorAppState extends State<SafeMentorApp> {
  late final AuthController _authController;
  late final ChatController _chatController;
  late AppLocale _locale;

  @override
  void initState() {
    super.initState();
    _locale = AppLocale.en;
    final authRepository = AuthRepository(AppConfig.current);
    _authController = AuthController(authRepository)..restoreSession();
    _chatController = ChatController(
      authController: _authController,
      chatRepository: ChatRepository(AppConfig.current),
      mentorApi: MentorApi(AppConfig.current),
    );
  }

  @override
  void dispose() {
    _authController.dispose();
    _chatController.dispose();
    super.dispose();
  }

  void _setLocale(AppLocale locale) {
    setState(() => _locale = locale);
  }

  @override
  Widget build(BuildContext context) {
    final strings = AppStrings(_locale);

    return MaterialApp(
      title: 'SafeMentor Chat',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      home: AnimatedBuilder(
        animation: _authController,
        builder: (context, _) {
          if (_authController.isRestoring) {
            return _BootScreen(strings: strings);
          }

          if (!_authController.isAuthenticated) {
            return LoginScreen(
              strings: strings,
              locale: _locale,
              onLocaleChanged: _setLocale,
              authController: _authController,
            );
          }

          return ChatShell(
            strings: strings,
            locale: _locale,
            onLocaleChanged: _setLocale,
            authController: _authController,
            chatController: _chatController,
          );
        },
      ),
    );
  }
}

class _BootScreen extends StatelessWidget {
  const _BootScreen({required this.strings});

  final AppStrings strings;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const SizedBox(
              width: 36,
              height: 36,
              child: CircularProgressIndicator(strokeWidth: 3),
            ),
            const SizedBox(height: 18),
            Text(
              strings.checkingAuth,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}
