import 'package:flutter/material.dart';

import '../../../../core/localization/app_strings.dart';
import '../../../../core/theme/app_theme.dart';

class ExitScreen extends StatelessWidget {
  const ExitScreen({
    super.key,
    required this.strings,
    required this.onNewSession,
  });

  final AppStrings strings;
  final VoidCallback onNewSession;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 560),
            child: Padding(
              padding: const EdgeInsets.all(28),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const CircleAvatar(
                    radius: 48,
                    backgroundColor: Colors.white,
                    child: Icon(
                      Icons.auto_awesome_rounded,
                      color: AppTheme.primary,
                      size: 44,
                    ),
                  ),
                  const SizedBox(height: 28),
                  Text(
                    strings.exitTitle,
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.headlineLarge,
                  ),
                  const SizedBox(height: 10),
                  Text(
                    strings.exitBody,
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                  const SizedBox(height: 28),
                  DecoratedBox(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(color: AppTheme.border),
                      boxShadow: const [
                        BoxShadow(
                          color: AppTheme.border,
                          blurRadius: 18,
                          offset: Offset(0, 8),
                        ),
                      ],
                    ),
                    child: const Padding(
                      padding: EdgeInsets.all(18),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          CircleAvatar(
                            backgroundColor: AppTheme.surface,
                            child: Icon(
                              Icons.lock_outline_rounded,
                              color: AppTheme.primary,
                            ),
                          ),
                          SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Privacy',
                                  style: TextStyle(
                                    color: AppTheme.ink,
                                    fontWeight: FontWeight.w900,
                                  ),
                                ),
                                SizedBox(height: 4),
                                Text(
                                  'I clear our chats after each session, keeping only a short summary for 7 days. If I worry about your safety, I save things for 30 days to help get you support.',
                                  style: TextStyle(
                                    color: AppTheme.body,
                                    height: 1.35,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 26),
                  FilledButton.icon(
                    onPressed: onNewSession,
                    icon: const Icon(Icons.refresh_rounded),
                    label: Text(strings.newSession),
                  ),
                  const SizedBox(height: 20),
                  Text(
                    'You can safely close this app now.',
                    style: TextStyle(
                      color: AppTheme.body.withValues(alpha: 0.65),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
