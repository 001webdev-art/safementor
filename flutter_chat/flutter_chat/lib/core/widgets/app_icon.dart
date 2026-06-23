import 'package:flutter/material.dart';

class AppBrainIcon extends StatelessWidget {
  const AppBrainIcon({super.key, this.size = 56, this.rotate = false});

  /// App icon shown on the login and chat screens. The image already carries
  /// its own (circular) background, so it is rendered directly.
  static const String _asset = 'assets/images/app_icon.png';

  final double size;
  final bool rotate;

  @override
  Widget build(BuildContext context) {
    final icon = SizedBox(
      width: size,
      height: size,
      child: Image.asset(_asset, fit: BoxFit.contain),
    );

    return rotate ? Transform.rotate(angle: 0.08, child: icon) : icon;
  }
}
