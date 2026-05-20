import 'package:flutter/material.dart';

import '../../../../core/localization/app_strings.dart';
import '../../../../core/theme/app_theme.dart';

class HelpScreen extends StatelessWidget {
  const HelpScreen({super.key, required this.strings, required this.onBack});

  final AppStrings strings;
  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      body: SafeArea(
        child: Column(
          children: [
            _Header(title: strings.helpTitle, onBack: onBack),
            Expanded(
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 720),
                  child: ListView(
                    padding: const EdgeInsets.all(18),
                    children: [
                      _HeroHelpCard(),
                      const SizedBox(height: 22),
                      _SectionTitle(
                        icon: Icons.favorite_rounded,
                        title: strings.trustedAdult,
                        color: Colors.pink,
                      ),
                      _ListCard(
                        items: const [
                          'You feel scared or unsafe',
                          'Someone is hurting you',
                          'You feel very sad or confused',
                          "I can't truly understand these feelings, but adults can.",
                        ],
                      ),
                      const SizedBox(height: 22),
                      const _SectionTitle(
                        icon: Icons.groups_rounded,
                        title: 'Trusted Adults',
                        color: AppTheme.primary,
                      ),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children:
                            const ['Parent', 'Teacher', 'Coach', 'Relative']
                                .map(
                                  (text) => Chip(
                                    label: Text(text),
                                    backgroundColor: Colors.white,
                                    side: BorderSide(color: AppTheme.border),
                                  ),
                                )
                                .toList(),
                      ),
                      const SizedBox(height: 22),
                      OutlinedButton.icon(
                        onPressed: () {},
                        icon: const Icon(Icons.phone_rounded),
                        label: const Text('Call Kids Helpline: 116 111'),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: Colors.pink,
                          side: BorderSide(
                            color: Colors.pink.shade100,
                            width: 2,
                          ),
                          backgroundColor: Colors.pink.shade50,
                          minimumSize: const Size.fromHeight(52),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                      ),
                      const SizedBox(height: 22),
                      const _SectionTitle(
                        icon: Icons.auto_awesome_rounded,
                        title: 'Things to Remember',
                        color: AppTheme.primary,
                      ),
                      const _ReminderCard(),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Header extends StatelessWidget {
  const _Header({required this.title, required this.onBack});

  final String title;
  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    return Container(
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
          Text(title, style: Theme.of(context).textTheme.titleMedium),
        ],
      ),
    );
  }
}

class _HeroHelpCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [AppTheme.primary, AppTheme.primaryDark],
        ),
        borderRadius: BorderRadius.circular(18),
        boxShadow: const [
          BoxShadow(
            color: AppTheme.border,
            blurRadius: 16,
            offset: Offset(0, 8),
          ),
        ],
      ),
      child: const Padding(
        padding: EdgeInsets.all(20),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              backgroundColor: Colors.white24,
              child: Icon(Icons.mode_comment_outlined, color: Colors.white),
            ),
            SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'How I can help',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 17,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  SizedBox(height: 6),
                  Text(
                    "I'm here to help you think through problems and chat. Remember, I'm a computer program, not a person.",
                    style: TextStyle(
                      color: AppTheme.soft,
                      height: 1.4,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle({
    required this.icon,
    required this.title,
    required this.color,
  });

  final IconData icon;
  final String title;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          Icon(icon, color: color, size: 18),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              title.toUpperCase(),
              style: const TextStyle(
                color: AppTheme.ink,
                fontWeight: FontWeight.w900,
                fontSize: 12,
                letterSpacing: 0.7,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ListCard extends StatelessWidget {
  const _ListCard({required this.items});

  final List<String> items;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        children: [
          for (final item in items)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: const BoxDecoration(
                border: Border(bottom: BorderSide(color: AppTheme.surface)),
              ),
              child: Text(
                item,
                style: const TextStyle(
                  color: AppTheme.ink,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _ReminderCard extends StatelessWidget {
  const _ReminderCard();

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.border),
      ),
      child: const Column(
        children: [
          _ReminderItem(
            icon: Icons.shield_outlined,
            title: 'Stay Safe',
            text: 'I must tell your parents if things get dangerous.',
          ),
          _ReminderItem(
            icon: Icons.psychology_alt_rounded,
            title: 'Learn Together',
            text: "I help you think, but I won't do your homework!",
          ),
          _ReminderItem(
            icon: Icons.lock_outline_rounded,
            title: 'Privacy',
            text: 'Our chats stay private unless you are in danger.',
          ),
        ],
      ),
    );
  }
}

class _ReminderItem extends StatelessWidget {
  const _ReminderItem({
    required this.icon,
    required this.title,
    required this.text,
  });

  final IconData icon;
  final String title;
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: AppTheme.primary, size: 22),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '$title:',
                  style: const TextStyle(
                    color: AppTheme.ink,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                Text(text, style: const TextStyle(color: AppTheme.body)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
