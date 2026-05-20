import 'package:flutter/material.dart';

import '../../../core/localization/app_strings.dart';
import '../../auth/state/auth_controller.dart';
import '../state/chat_controller.dart';
import 'screens/chat_screen.dart';
import 'screens/exit_screen.dart';
import 'screens/help_screen.dart';
import 'screens/history_screen.dart';
import 'screens/welcome_screen.dart';
import 'widgets/chat_bottom_nav.dart';

class ChatShell extends StatefulWidget {
  const ChatShell({
    super.key,
    required this.strings,
    required this.locale,
    required this.onLocaleChanged,
    required this.authController,
    required this.chatController,
  });

  final AppStrings strings;
  final AppLocale locale;
  final ValueChanged<AppLocale> onLocaleChanged;
  final AuthController authController;
  final ChatController chatController;

  @override
  State<ChatShell> createState() => _ChatShellState();
}

class _ChatShellState extends State<ChatShell> {
  @override
  void initState() {
    super.initState();
    widget.chatController.loadChildren();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: widget.chatController,
      builder: (context, _) {
        final view = widget.chatController.view;
        return Scaffold(
          body: _bodyFor(view),
          bottomNavigationBar: view == ChatView.hello || view == ChatView.exit
              ? null
              : ChatBottomNav(
                  strings: widget.strings,
                  currentView: view,
                  onChanged: widget.chatController.setView,
                ),
        );
      },
    );
  }

  Widget _bodyFor(ChatView view) {
    return switch (view) {
      ChatView.hello => WelcomeScreen(
        strings: widget.strings,
        locale: widget.locale,
        onLocaleChanged: widget.onLocaleChanged,
        onStart: () => widget.chatController.setView(ChatView.chat),
        onSignOut: widget.authController.signOut,
      ),
      ChatView.chat => ChatScreen(
        strings: widget.strings,
        locale: widget.locale,
        onLocaleChanged: widget.onLocaleChanged,
        authController: widget.authController,
        controller: widget.chatController,
      ),
      ChatView.help => HelpScreen(
        strings: widget.strings,
        onBack: () => widget.chatController.setView(ChatView.chat),
      ),
      ChatView.history => HistoryScreen(
        strings: widget.strings,
        controller: widget.chatController,
        onBack: () => widget.chatController.setView(ChatView.chat),
      ),
      ChatView.exit => ExitScreen(
        strings: widget.strings,
        onNewSession: () => widget.chatController.setView(ChatView.hello),
      ),
    };
  }
}
