import 'package:flutter/material.dart';

import '../../../core/localization/app_strings.dart';
import '../../../core/theme/app_theme.dart';
import '../../auth/state/auth_controller.dart';
import '../state/chat_controller.dart';
import 'screens/chat_screen.dart';
import 'screens/help_screen.dart';
import 'screens/welcome_screen.dart';

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
        final controller = widget.chatController;

        if (controller.isLoadingChildren) {
          return const Scaffold(
            backgroundColor: AppTheme.surface,
            body: Center(child: CircularProgressIndicator()),
          );
        }

        // Child selection comes first; only after a child is picked do we
        // show the age-appropriate welcome and the rest of the app.
        if (controller.activeChild == null) {
          return ChildGate(strings: widget.strings, controller: controller);
        }

        return Scaffold(body: _bodyFor(controller.view));
      },
    );
  }

  Widget _bodyFor(ChatView view) {
    return switch (view) {
      ChatView.hello => WelcomeScreen(
        strings: widget.strings,
        band: ageBandForAge(widget.chatController.activeChild?.age ?? 10),
        onStart: () => widget.chatController.setView(ChatView.chat),
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
        onSignOut: widget.authController.signOut,
      ),
    };
  }
}
