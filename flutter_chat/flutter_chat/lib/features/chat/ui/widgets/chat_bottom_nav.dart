import 'package:flutter/material.dart';

import '../../../../core/localization/app_strings.dart';
import '../../../../core/theme/app_theme.dart';
import '../../state/chat_controller.dart';

class ChatBottomNav extends StatelessWidget {
  const ChatBottomNav({
    super.key,
    required this.strings,
    required this.currentView,
    required this.onChanged,
  });

  final AppStrings strings;
  final ChatView currentView;
  final ValueChanged<ChatView> onChanged;

  @override
  Widget build(BuildContext context) {
    final items = [
      _NavItem(ChatView.hello, Icons.waving_hand_rounded, strings.hello),
      _NavItem(ChatView.chat, Icons.mode_comment_outlined, strings.chat),
      _NavItem(ChatView.help, Icons.help_outline_rounded, strings.help),
      _NavItem(ChatView.exit, Icons.logout_rounded, strings.exit),
    ];

    return SafeArea(
      top: false,
      child: Container(
        height: 68,
        decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(top: BorderSide(color: AppTheme.border)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: items.map((item) {
            final selected = currentView == item.view;
            return IconButton(
              tooltip: item.label,
              onPressed: () => onChanged(item.view),
              icon: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    item.icon,
                    color: selected ? AppTheme.primary : Colors.black45,
                    size: 24,
                  ),
                  const SizedBox(height: 3),
                  Text(
                    item.label,
                    style: TextStyle(
                      color: selected ? AppTheme.primary : Colors.black45,
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            );
          }).toList(),
        ),
      ),
    );
  }
}

class _NavItem {
  const _NavItem(this.view, this.icon, this.label);
  final ChatView view;
  final IconData icon;
  final String label;
}
