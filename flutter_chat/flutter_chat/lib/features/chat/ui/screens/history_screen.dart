import 'package:flutter/material.dart';

import '../../../../core/localization/app_strings.dart';
import '../../../../core/theme/app_theme.dart';
import '../../models/chat_message.dart';
import '../../state/chat_controller.dart';
import 'chat_screen.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({
    super.key,
    required this.strings,
    required this.controller,
    required this.onBack,
  });

  final AppStrings strings;
  final ChatController controller;
  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      body: SafeArea(
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: const BoxDecoration(
                color: Colors.white,
                border: Border(bottom: BorderSide(color: AppTheme.border)),
              ),
              child: Row(
                children: [
                  IconButton(
                    onPressed: onBack,
                    icon: const Icon(Icons.chevron_left_rounded),
                  ),
                  Text(
                    strings.history,
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const Spacer(),
                  IconButton(
                    tooltip: 'Refresh',
                    onPressed: controller.loadMessages,
                    icon: const Icon(Icons.refresh_rounded),
                  ),
                ],
              ),
            ),
            Expanded(
              child: AnimatedBuilder(
                animation: controller,
                builder: (context, _) {
                  final messages = controller.messages;
                  if (messages.isEmpty) {
                    return const Center(
                      child: Text(
                        'No stored messages for this child yet.',
                        style: TextStyle(color: AppTheme.body),
                      ),
                    );
                  }
                  return ListView.builder(
                    padding: const EdgeInsets.all(14),
                    itemCount: messages.length,
                    itemBuilder: (context, index) {
                      final message = messages[index];
                      return Column(
                        crossAxisAlignment: message.role == MessageRole.user
                            ? CrossAxisAlignment.end
                            : CrossAxisAlignment.start,
                        children: [MessageBubble(message: message)],
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
