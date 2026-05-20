import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

class AppBrainIcon extends StatelessWidget {
  const AppBrainIcon({super.key, this.size = 56, this.rotate = false});

  final double size;
  final bool rotate;

  @override
  Widget build(BuildContext context) {
    final icon = Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(size * 0.25),
        gradient: const LinearGradient(
          colors: [AppTheme.primary, AppTheme.primaryDark],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: const [
          BoxShadow(
            color: AppTheme.border,
            blurRadius: 18,
            offset: Offset(0, 8),
          ),
        ],
      ),
      child: Icon(
        Icons.psychology_alt_rounded,
        color: Colors.white,
        size: size * 0.56,
      ),
    );

    return rotate ? Transform.rotate(angle: 0.08, child: icon) : icon;
  }
}
