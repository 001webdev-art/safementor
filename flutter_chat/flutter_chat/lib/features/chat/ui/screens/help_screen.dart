import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../../core/localization/app_strings.dart';
import '../../../../core/theme/app_theme.dart';

/// Child/youth helpline number dialed by the help screen.
const String _helplineNumber = '116111';

Future<void> _callHelpline() async {
  final uri = Uri(scheme: 'tel', path: _helplineNumber);
  if (await canLaunchUrl(uri)) {
    await launchUrl(uri);
  }
}

class HelpScreen extends StatelessWidget {
  const HelpScreen({
    super.key,
    required this.strings,
    required this.onBack,
    required this.onSignOut,
  });

  final AppStrings strings;
  final VoidCallback onBack;
  final VoidCallback onSignOut;

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
                      _HeroHelpCard(strings: strings),
                      const SizedBox(height: 22),
                      _SectionTitle(
                        icon: Icons.favorite_rounded,
                        title: strings.trustedAdult,
                        color: Colors.pink,
                      ),
                      _ListCard(
                        items: [
                          strings.helpFeel1,
                          strings.helpFeel2,
                          strings.helpFeel3,
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 12, left: 4, right: 4),
                        child: Text(
                          strings.helpFeel4,
                          style: const TextStyle(
                            color: AppTheme.body,
                            height: 1.5,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      const SizedBox(height: 22),
                      _SectionTitle(
                        icon: Icons.groups_rounded,
                        title: strings.helpAdultsTitle,
                        color: AppTheme.primary,
                      ),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children:
                            [
                                  strings.helpAdultParent,
                                  strings.helpAdultTeacher,
                                  strings.helpAdultCoach,
                                  strings.helpAdultRelative,
                                ]
                                .map(
                                  (text) => Chip(
                                    label: Text(text),
                                    backgroundColor: Colors.white,
                                    side: const BorderSide(
                                      color: AppTheme.border,
                                    ),
                                  ),
                                )
                                .toList(),
                      ),
                      const SizedBox(height: 22),
                      _SectionTitle(
                        icon: Icons.phone_in_talk_rounded,
                        title: strings.helplineSection,
                        color: AppTheme.primary,
                      ),
                      _HelplineBadge(text: strings.helplineBadge),
                      const SizedBox(height: 12),
                      Text(
                        strings.helplineHint,
                        style: const TextStyle(
                          color: AppTheme.body,
                          height: 1.5,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 12),
                      OutlinedButton.icon(
                        onPressed: _callHelpline,
                        icon: const Icon(Icons.phone_rounded),
                        label: Text(strings.helpCallButton),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: AppTheme.primaryDark,
                          side: const BorderSide(
                            color: AppTheme.primary,
                            width: 2,
                          ),
                          backgroundColor: AppTheme.soft,
                          minimumSize: const Size.fromHeight(52),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                      ),
                      const SizedBox(height: 22),
                      _SectionTitle(
                        icon: Icons.auto_awesome_rounded,
                        title: strings.helpRememberTitle,
                        color: AppTheme.primary,
                      ),
                      _ReminderCard(strings: strings),
                      const SizedBox(height: 22),
                      _SwitchChildButton(
                        label: strings.switchChild,
                        hint: strings.switchChildHint,
                        onPressed: onSignOut,
                      ),
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
  const _HeroHelpCard({required this.strings});

  final AppStrings strings;

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
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const CircleAvatar(
              backgroundColor: Colors.white24,
              child: Icon(Icons.mode_comment_outlined, color: Colors.white),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    strings.helpHeroTitle,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 17,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    strings.helpHeroBody,
                    style: const TextStyle(
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

class _HelplineBadge extends StatelessWidget {
  const _HelplineBadge({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
        decoration: BoxDecoration(
          color: AppTheme.soft,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppTheme.border),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(
              Icons.shield_outlined,
              size: 14,
              color: AppTheme.primary,
            ),
            const SizedBox(width: 6),
            Text(
              text.toUpperCase(),
              style: const TextStyle(
                color: AppTheme.primaryDark,
                fontWeight: FontWeight.w800,
                fontSize: 11,
                letterSpacing: 0.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SwitchChildButton extends StatelessWidget {
  const _SwitchChildButton({
    required this.label,
    required this.hint,
    required this.onPressed,
  });

  final String label;
  final String hint;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
      onPressed: onPressed,
      style: OutlinedButton.styleFrom(
        foregroundColor: AppTheme.primary,
        backgroundColor: Colors.white,
        side: const BorderSide(color: AppTheme.primary, width: 2),
        minimumSize: const Size.fromHeight(60),
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            label,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontWeight: FontWeight.w900,
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            hint,
            textAlign: TextAlign.center,
            style: TextStyle(
              color: AppTheme.primary.withValues(alpha: 0.85),
              fontWeight: FontWeight.w600,
              fontSize: 11,
            ),
          ),
        ],
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
  const _ReminderCard({required this.strings});

  final AppStrings strings;

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
          _ReminderItem(
            icon: Icons.shield_outlined,
            title: strings.helpSafeTitle,
            text: strings.helpSafeBody,
          ),
          _ReminderItem(
            icon: Icons.psychology_alt_rounded,
            title: strings.helpLearnTitle,
            text: strings.helpLearnBody,
          ),
          _ReminderItem(
            icon: Icons.lock_outline_rounded,
            title: strings.helpPrivacyTitle,
            text: strings.helpPrivacyBody,
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
