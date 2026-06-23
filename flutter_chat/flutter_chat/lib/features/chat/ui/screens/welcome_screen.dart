import 'package:flutter/material.dart';

import '../../../../core/localization/app_strings.dart';
import '../../../../core/theme/app_theme.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({
    super.key,
    required this.strings,
    required this.band,
    required this.onStart,
  });

  final AppStrings strings;

  /// 8-11 -> AgeBand.young (friendly Samy), 12-15 -> AgeBand.teen (cool Samy).
  final AgeBand band;
  final VoidCallback onStart;

  /// Both mascots render at the SAME height so they look equally big.
  static const double _mascotHeight = 184;

  String get _mascotAsset => band == AgeBand.young
      ? 'assets/images/samy_8_11.png'
      : 'assets/images/samy_12_15.png';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Stack(
          children: [
            Positioned(
              top: -70,
              right: -60,
              child: _SoftCircle(
                size: 230,
                color: AppTheme.surface.withValues(alpha: 0.9),
              ),
            ),
            Positioned(
              bottom: -60,
              left: -70,
              child: _SoftCircle(
                size: 210,
                color: AppTheme.soft.withValues(alpha: 0.9),
              ),
            ),
            Column(
              children: [
                Expanded(
                  child: Center(
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 680),
                      child: ListView(
                        padding: const EdgeInsets.fromLTRB(22, 24, 22, 24),
                        children: [
                          Center(
                            child: SizedBox(
                              height: _mascotHeight,
                              child: Image.asset(
                                _mascotAsset,
                                height: _mascotHeight,
                                fit: BoxFit.contain,
                              ),
                            ),
                          ),
                          const SizedBox(height: 20),
                          Text(
                            strings.ageText('welcomeTitle', band),
                            textAlign: TextAlign.center,
                            style: Theme.of(context).textTheme.headlineLarge,
                          ),
                          const SizedBox(height: 12),
                          Text(
                            strings.ageText('welcomeSubtitle', band),
                            textAlign: TextAlign.center,
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                          const SizedBox(height: 26),
                          _FeatureCard(strings: strings, band: band),
                          const SizedBox(height: 14),
                          _TransparencyCard(strings: strings, band: band),
                        ],
                      ),
                    ),
                  ),
                ),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.fromLTRB(20, 14, 20, 20),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    border: Border(top: BorderSide(color: AppTheme.border)),
                  ),
                  child: SafeArea(
                    top: false,
                    child: Center(
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 680),
                        child: FilledButton.icon(
                          onPressed: onStart,
                          icon: const Icon(Icons.arrow_forward_rounded),
                          label: Text(strings.ageText('startChatting', band)),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  const _FeatureCard({required this.strings, required this.band});
  final AppStrings strings;
  final AgeBand band;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.88),
        border: Border.all(color: AppTheme.border),
        borderRadius: BorderRadius.circular(16),
        boxShadow: const [
          BoxShadow(
            color: Color(0x11000000),
            blurRadius: 10,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              strings.ageText('whatWeCanDo', band).toUpperCase(),
              style: const TextStyle(
                color: AppTheme.primary,
                fontSize: 12,
                fontWeight: FontWeight.w900,
                letterSpacing: 0.8,
              ),
            ),
            const SizedBox(height: 12),
            _FeatureItem(
              icon: Icons.menu_book_rounded,
              color: Colors.orange.shade100,
              text: strings.ageText('homework', band),
            ),
            _FeatureItem(
              icon: Icons.auto_awesome_rounded,
              color: Colors.purple.shade100,
              text: strings.ageText('projects', band),
            ),
            _FeatureItem(
              icon: Icons.celebration_rounded,
              color: Colors.green.shade100,
              text: strings.ageText('ideas', band),
            ),
          ],
        ),
      ),
    );
  }
}

class _FeatureItem extends StatelessWidget {
  const _FeatureItem({
    required this.icon,
    required this.color,
    required this.text,
  });

  final IconData icon;
  final Color color;
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: Row(
        children: [
          CircleAvatar(
            radius: 17,
            backgroundColor: color,
            child: Icon(icon, size: 18, color: AppTheme.ink),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                color: AppTheme.body,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _TransparencyCard extends StatelessWidget {
  const _TransparencyCard({required this.strings, required this.band});
  final AppStrings strings;
  final AgeBand band;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [AppTheme.surface, AppTheme.soft],
        ),
        border: Border.all(color: AppTheme.border),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(
                  Icons.info_outline_rounded,
                  color: AppTheme.primary,
                  size: 18,
                ),
                const SizedBox(width: 8),
                Text(
                  strings.goodToKnow,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
              ],
            ),
            const SizedBox(height: 10),
            _Bullet(strings.ageText('notHuman', band)),
            _Bullet(strings.ageText('dangerTell', band)),
          ],
        ),
      ),
    );
  }
}

class _Bullet extends StatelessWidget {
  const _Bullet(this.text);
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 5,
            height: 5,
            margin: const EdgeInsets.only(top: 7, right: 9),
            decoration: const BoxDecoration(
              color: AppTheme.primary,
              shape: BoxShape.circle,
            ),
          ),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                color: AppTheme.body,
                fontWeight: FontWeight.w600,
                height: 1.35,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _SoftCircle extends StatelessWidget {
  const _SoftCircle({required this.size, required this.color});
  final double size;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(color: color, shape: BoxShape.circle),
    );
  }
}
