import 'package:flutter/material.dart';

import '../../../core/localization/app_strings.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/app_icon.dart';
import '../state/auth_controller.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({
    super.key,
    required this.strings,
    required this.locale,
    required this.onLocaleChanged,
    required this.authController,
  });

  final AppStrings strings;
  final AppLocale locale;
  final ValueChanged<AppLocale> onLocaleChanged;
  final AuthController authController;

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _email = TextEditingController();
  final _password = TextEditingController();

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    FocusScope.of(context).unfocus();
    await widget.authController.signIn(_email.text, _password.text);
  }

  @override
  Widget build(BuildContext context) {
    final strings = widget.strings;

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 520),
            child: ListView(
              padding: const EdgeInsets.all(24),
              shrinkWrap: true,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    DropdownButton<AppLocale>(
                      value: widget.locale,
                      underline: const SizedBox.shrink(),
                      items: AppLocale.values
                          .map(
                            (locale) => DropdownMenuItem(
                              value: locale,
                              child: Text(locale.label),
                            ),
                          )
                          .toList(),
                      onChanged: (value) {
                        if (value != null) widget.onLocaleChanged(value);
                      },
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                const Center(child: AppBrainIcon(size: 72, rotate: true)),
                const SizedBox(height: 28),
                Text(
                  strings.loginTitle,
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.headlineLarge,
                ),
                const SizedBox(height: 12),
                Text(
                  strings.loginSubtitle,
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
                const SizedBox(height: 32),
                TextField(
                  controller: _email,
                  keyboardType: TextInputType.emailAddress,
                  textInputAction: TextInputAction.next,
                  decoration: InputDecoration(
                    labelText: strings.email,
                    prefixIcon: const Icon(Icons.mail_outline_rounded),
                  ),
                ),
                const SizedBox(height: 14),
                TextField(
                  controller: _password,
                  obscureText: true,
                  onSubmitted: (_) => _submit(),
                  decoration: InputDecoration(
                    labelText: strings.password,
                    prefixIcon: const Icon(Icons.lock_outline_rounded),
                  ),
                ),
                AnimatedBuilder(
                  animation: widget.authController,
                  builder: (context, _) {
                    final error = widget.authController.error;
                    return AnimatedSwitcher(
                      duration: const Duration(milliseconds: 180),
                      child: error == null
                          ? const SizedBox(height: 20)
                          : Padding(
                              padding: const EdgeInsets.only(top: 14),
                              child: DecoratedBox(
                                decoration: BoxDecoration(
                                  color: Colors.red.shade50,
                                  border: Border.all(
                                    color: Colors.red.shade100,
                                  ),
                                  borderRadius: BorderRadius.circular(14),
                                ),
                                child: Padding(
                                  padding: const EdgeInsets.all(12),
                                  child: Text(
                                    error,
                                    style: TextStyle(
                                      color: Colors.red.shade700,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                    );
                  },
                ),
                const SizedBox(height: 18),
                AnimatedBuilder(
                  animation: widget.authController,
                  builder: (context, _) {
                    return FilledButton(
                      onPressed: widget.authController.isBusy ? null : _submit,
                      child: widget.authController.isBusy
                          ? const SizedBox(
                              width: 22,
                              height: 22,
                              child: CircularProgressIndicator(
                                color: Colors.white,
                                strokeWidth: 2.5,
                              ),
                            )
                          : Text(strings.signIn),
                    );
                  },
                ),
                const SizedBox(height: 20),
                const _SessionNote(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _SessionNote extends StatelessWidget {
  const _SessionNote();

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.border),
      ),
      child: const Padding(
        padding: EdgeInsets.all(12),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(Icons.shield_outlined, color: AppTheme.primary, size: 20),
            SizedBox(width: 10),
            Expanded(
              child: Text(
                'Mobile session bridge: this app authenticates against the same Supabase backend as the dashboard and stores tokens securely on device.',
                style: TextStyle(color: AppTheme.body, height: 1.35),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
