import 'package:flutter/material.dart';

import '../../../../core/localization/app_strings.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/widgets/app_icon.dart';
import '../../../auth/state/auth_controller.dart';
import '../../models/chat_message.dart';
import '../../models/child_profile.dart';
import '../../state/chat_controller.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({
    super.key,
    required this.strings,
    required this.locale,
    required this.onLocaleChanged,
    required this.authController,
    required this.controller,
  });

  final AppStrings strings;
  final AppLocale locale;
  final ValueChanged<AppLocale> onLocaleChanged;
  final AuthController authController;
  final ChatController controller;

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _message = TextEditingController();
  final _scrollController = ScrollController();
  bool _showPiiWarning = false;

  @override
  void initState() {
    super.initState();
    widget.controller.addListener(_scrollAfterBuild);
  }

  @override
  void dispose() {
    widget.controller.removeListener(_scrollAfterBuild);
    _message.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollAfterBuild() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!_scrollController.hasClients) return;
      _scrollController.animateTo(
        _scrollController.position.maxScrollExtent,
        duration: const Duration(milliseconds: 260),
        curve: Curves.easeOut,
      );
    });
  }

  bool _containsPii(String text) {
    final phone = RegExp(r'(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}');
    final email = RegExp(r'\S+@\S+\.\S+');
    final lower = text.toLowerCase();
    return phone.hasMatch(text) ||
        email.hasMatch(text) ||
        lower.contains('my address is') ||
        lower.contains('i live at') ||
        lower.contains('come to my house');
  }

  Future<void> _send() async {
    final text = _message.text.trim();
    if (text.isEmpty ||
        widget.controller.streamingStatus != StreamingStatus.idle) {
      return;
    }
    _message.clear();
    setState(() => _showPiiWarning = false);
    await widget.controller.sendMessage(text);
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: widget.controller,
      builder: (context, _) {
        return Scaffold(
          backgroundColor: AppTheme.surface,
          body: SafeArea(
            child: Column(
              children: [
                _ChatHeader(
                  strings: widget.strings,
                  locale: widget.locale,
                  onLocaleChanged: widget.onLocaleChanged,
                  controller: widget.controller,
                ),
                Expanded(
                  child: ListView.builder(
                    controller: _scrollController,
                    padding: const EdgeInsets.fromLTRB(14, 16, 14, 14),
                    itemCount:
                        widget.controller.messages.length +
                        _streamingExtraCount,
                    itemBuilder: (context, index) {
                      if (index < widget.controller.messages.length) {
                        return MessageBubble(
                          message: widget.controller.messages[index],
                        );
                      }
                      return _StreamingBubble(
                        strings: widget.strings,
                        status: widget.controller.streamingStatus,
                        content: widget.controller.streamingContent,
                        onStop: widget.controller.stopStreaming,
                      );
                    },
                  ),
                ),
                _Composer(
                  strings: widget.strings,
                  controller: _message,
                  showPiiWarning: _showPiiWarning,
                  isBusy:
                      widget.controller.streamingStatus != StreamingStatus.idle,
                  onChanged: (text) =>
                      setState(() => _showPiiWarning = _containsPii(text)),
                  onSend: _send,
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  int get _streamingExtraCount =>
      widget.controller.streamingStatus == StreamingStatus.idle ? 0 : 1;
}

class ChildGate extends StatefulWidget {
  const ChildGate({super.key, required this.strings, required this.controller});
  final AppStrings strings;
  final ChatController controller;

  @override
  State<ChildGate> createState() => _ChildGateState();
}

class _ChildGateState extends State<ChildGate> {
  String? _selectedChildId;

  @override
  Widget build(BuildContext context) {
    final children = widget.controller.children;

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 680),
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: children.isEmpty
                  ? _emptyState(context)
                  : _selector(context, children),
            ),
          ),
        ),
      ),
    );
  }

  Widget _emptyState(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: const [
          BoxShadow(
            color: Color(0x1A000000),
            blurRadius: 24,
            offset: Offset(0, 12),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(28),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const CircleAvatar(
              radius: 34,
              backgroundColor: AppTheme.rose,
              child: Icon(Icons.shield_outlined, color: Colors.pink, size: 34),
            ),
            const SizedBox(height: 20),
            Text(
              widget.strings.noChildrenTitle,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 10),
            Text(
              widget.strings.noChildrenBody,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 22),
            FilledButton(
              onPressed: widget.controller.loadChildren,
              child: const Text('Refresh'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _selector(BuildContext context, List<ChildProfile> children) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        const AppBrainIcon(size: 76),
        const SizedBox(height: 20),
        Text(
          widget.strings.selectChildTitle,
          textAlign: TextAlign.center,
          style: Theme.of(context).textTheme.headlineLarge,
        ),
        const SizedBox(height: 8),
        Text(
          widget.strings.selectChildSubtitle,
          textAlign: TextAlign.center,
          style: Theme.of(context).textTheme.bodyLarge,
        ),
        const SizedBox(height: 26),
        Wrap(
          alignment: WrapAlignment.center,
          spacing: 14,
          runSpacing: 14,
          children: children.map((child) {
            final selected = _selectedChildId == child.id;
            return InkWell(
              borderRadius: BorderRadius.circular(18),
              onTap: () => setState(() => _selectedChildId = child.id),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 160),
                width: 156,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: selected ? AppTheme.soft : Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(
                    color: selected ? AppTheme.primary : Colors.transparent,
                    width: 2,
                  ),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x11000000),
                      blurRadius: 12,
                      offset: Offset(0, 6),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    CircleAvatar(
                      radius: 28,
                      backgroundColor: _avatarColor(child.nickname),
                      child: Text(
                        child.nickname.characters.first.toUpperCase(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w900,
                          fontSize: 22,
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      child.nickname,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: AppTheme.ink,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }).toList(),
        ),
        const SizedBox(height: 24),
        FilledButton(
          onPressed: _selectedChildId == null
              ? null
              : () => widget.controller.selectChild(_selectedChildId),
          child: Text(widget.strings.proceed),
        ),
      ],
    );
  }

  Color _avatarColor(String seed) {
    final colors = [
      AppTheme.primary,
      Colors.deepOrange,
      Colors.indigo,
      Colors.teal,
      Colors.pink,
    ];
    return colors[seed.codeUnits.fold<int>(0, (sum, code) => sum + code) %
        colors.length];
  }
}

class _ChatHeader extends StatelessWidget {
  const _ChatHeader({
    required this.strings,
    required this.locale,
    required this.onLocaleChanged,
    required this.controller,
  });

  final AppStrings strings;
  final AppLocale locale;
  final ValueChanged<AppLocale> onLocaleChanged;
  final ChatController controller;

  @override
  Widget build(BuildContext context) {
    final child = controller.activeChild!;
    return Container(
      padding: const EdgeInsets.fromLTRB(12, 10, 12, 10),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(bottom: BorderSide(color: AppTheme.border)),
        boxShadow: [
          BoxShadow(
            color: Color(0x0F000000),
            blurRadius: 10,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 720),
          child: Column(
            children: [
              SizedBox(
                height: 46,
                child: Row(
                  children: [
                    SizedBox(
                      height: 40,
                      child: Image.asset(
                        ageBandForAge(child.age) == AgeBand.young
                            ? 'assets/images/samy_8_11_chat.png'
                            : 'assets/images/samy_12_15_chat.png',
                        height: 40,
                        fit: BoxFit.contain,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Text(
                      'SAMY',
                      style: TextStyle(
                        color: AppTheme.ink,
                        fontWeight: FontWeight.w500,
                        fontSize: 18,
                      ),
                    ),
                    const Spacer(),
                    IconButton(
                      tooltip: strings.help,
                      onPressed: () => controller.setView(ChatView.help),
                      icon: const Icon(
                        Icons.help_outline_rounded,
                        color: AppTheme.body,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 8,
                ),
                decoration: BoxDecoration(
                  color: AppTheme.soft.withValues(alpha: 0.55),
                  border: Border.all(
                    color: AppTheme.border.withValues(alpha: 0.65),
                  ),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Row(
                  children: [
                    const Icon(
                      Icons.shield_outlined,
                      size: 14,
                      color: AppTheme.primary,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        strings.safetyBadge(ageBandForAge(child.age)),
                        softWrap: true,
                        style: const TextStyle(
                          color: AppTheme.body,
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class MessageBubble extends StatelessWidget {
  const MessageBubble({super.key, required this.message});

  final ChatMessage message;

  @override
  Widget build(BuildContext context) {
    final isUser = message.role == MessageRole.user;
    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Padding(
        padding: const EdgeInsets.only(bottom: 12),
        child: Column(
          crossAxisAlignment: isUser
              ? CrossAxisAlignment.end
              : CrossAxisAlignment.start,
          children: [
            ConstrainedBox(
              constraints: BoxConstraints(
                maxWidth: MediaQuery.sizeOf(context).width * 0.78,
              ),
              child: DecoratedBox(
                decoration: BoxDecoration(
                  color: isUser ? AppTheme.primary : Colors.white,
                  border: isUser ? null : Border.all(color: AppTheme.border),
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(isUser ? 18 : 4),
                    topRight: Radius.circular(isUser ? 4 : 18),
                    bottomLeft: const Radius.circular(18),
                    bottomRight: const Radius.circular(18),
                  ),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x0F000000),
                      blurRadius: 8,
                      offset: Offset(0, 3),
                    ),
                  ],
                ),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 10,
                  ),
                  child: Text(
                    message.content,
                    style: TextStyle(
                      color: isUser ? Colors.white : AppTheme.ink,
                      height: 1.35,
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              TimeOfDay.fromDateTime(message.timestamp).format(context),
              style: TextStyle(
                color: AppTheme.body.withValues(alpha: 0.6),
                fontSize: 10,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StreamingBubble extends StatelessWidget {
  const _StreamingBubble({
    required this.strings,
    required this.status,
    required this.content,
    required this.onStop,
  });

  final AppStrings strings;
  final StreamingStatus status;
  final String content;
  final Future<void> Function() onStop;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Padding(
        padding: const EdgeInsets.only(bottom: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            DecoratedBox(
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: AppTheme.border),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(4),
                  topRight: Radius.circular(18),
                  bottomLeft: Radius.circular(18),
                  bottomRight: Radius.circular(18),
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 14,
                  vertical: 10,
                ),
                child: content.isEmpty
                    ? const SizedBox(
                        width: 44,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            _TypingDot(delay: 0),
                            _TypingDot(delay: 160),
                            _TypingDot(delay: 320),
                          ],
                        ),
                      )
                    : Text(
                        content,
                        style: const TextStyle(
                          color: AppTheme.ink,
                          height: 1.35,
                        ),
                      ),
              ),
            ),
            if (status == StreamingStatus.streaming)
              TextButton(
                onPressed: onStop,
                child: Text(strings.stopGeneration),
              ),
          ],
        ),
      ),
    );
  }
}

class _TypingDot extends StatefulWidget {
  const _TypingDot({required this.delay});
  final int delay;

  @override
  State<_TypingDot> createState() => _TypingDotState();
}

class _TypingDotState extends State<_TypingDot>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 760),
    );
    Future<void>.delayed(Duration(milliseconds: widget.delay), () {
      if (mounted) _controller.repeat(reverse: true);
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: Tween<double>(begin: 0.35, end: 1).animate(_controller),
      child: const CircleAvatar(radius: 3, backgroundColor: AppTheme.primary),
    );
  }
}

class _Composer extends StatefulWidget {
  const _Composer({
    required this.strings,
    required this.controller,
    required this.showPiiWarning,
    required this.isBusy,
    required this.onChanged,
    required this.onSend,
  });

  final AppStrings strings;
  final TextEditingController controller;
  final bool showPiiWarning;
  final bool isBusy;
  final ValueChanged<String> onChanged;
  final VoidCallback onSend;

  @override
  State<_Composer> createState() => _ComposerState();
}

class _ComposerState extends State<_Composer> {
  bool _showAttachments = false;

  @override
  Widget build(BuildContext context) {
    final strings = widget.strings;
    return SafeArea(
      top: false,
      child: Container(
        padding: const EdgeInsets.fromLTRB(10, 8, 10, 10),
        decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(top: BorderSide(color: AppTheme.border)),
        ),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Flexible(
                  child: AnimatedSwitcher(
                    duration: const Duration(milliseconds: 170),
                    child: _showAttachments
                        ? SingleChildScrollView(
                            child: _AttachmentPanel(strings: strings),
                          )
                        : const SizedBox.shrink(),
                  ),
                ),
                AnimatedSwitcher(
                  duration: const Duration(milliseconds: 170),
                  child: widget.showPiiWarning
                      ? Container(
                          key: const ValueKey('pii'),
                          width: double.infinity,
                          margin: const EdgeInsets.only(bottom: 8),
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.amber.shade50,
                            border: Border.all(color: Colors.amber.shade200),
                            borderRadius: BorderRadius.circular(14),
                          ),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Icon(
                                Icons.warning_amber_rounded,
                                color: Colors.amber.shade700,
                                size: 20,
                              ),
                              const SizedBox(width: 9),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      strings.piiTitle,
                                      style: TextStyle(
                                        color: Colors.amber.shade900,
                                        fontWeight: FontWeight.w900,
                                      ),
                                    ),
                                    Text(
                                      strings.piiBody,
                                      style: TextStyle(
                                        color: Colors.amber.shade800,
                                        fontSize: 12,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        )
                      : const SizedBox.shrink(),
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    IconButton(
                      tooltip: strings.attachUploadTitle,
                      onPressed: () => setState(
                        () => _showAttachments = !_showAttachments,
                      ),
                      style: IconButton.styleFrom(
                        foregroundColor: AppTheme.primary,
                        side: const BorderSide(color: AppTheme.border),
                        shape: const CircleBorder(),
                      ),
                      icon: Icon(
                        _showAttachments
                            ? Icons.close_rounded
                            : Icons.add_rounded,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextField(
                        controller: widget.controller,
                        minLines: 1,
                        maxLines: 4,
                        onChanged: widget.onChanged,
                        onSubmitted: (_) => widget.onSend(),
                        decoration: InputDecoration(
                          hintText: strings.chatHint,
                          filled: true,
                          fillColor: AppTheme.surface,
                          contentPadding: const EdgeInsets.symmetric(
                            horizontal: 14,
                            vertical: 12,
                          ),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(22),
                            borderSide: BorderSide.none,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    SizedBox(
                      width: 42,
                      height: 42,
                      child: FilledButton(
                        onPressed: widget.isBusy ? null : widget.onSend,
                        style: FilledButton.styleFrom(
                          padding: EdgeInsets.zero,
                          shape: const CircleBorder(),
                          minimumSize: const Size(42, 42),
                        ),
                        child: const Icon(Icons.arrow_upward_rounded, size: 20),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _AttachmentPanel extends StatelessWidget {
  const _AttachmentPanel({required this.strings});

  final AppStrings strings;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 2, bottom: 10),
            child: Text(
              strings.attachComingSoon,
              style: const TextStyle(
                color: AppTheme.body,
                fontWeight: FontWeight.w700,
                fontSize: 13,
              ),
            ),
          ),
          Row(
            children: [
              Expanded(
                child: _AttachmentCard(
                  icon: Icons.image_outlined,
                  title: strings.attachUploadTitle,
                  subtitle: strings.attachUploadSubtitle,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _AttachmentCard(
                  icon: Icons.alt_route_rounded,
                  title: strings.attachSecondOpinionTitle,
                  subtitle: strings.attachSecondOpinionSubtitle,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: _AttachmentCard(
                  icon: Icons.menu_book_rounded,
                  title: strings.attachModulesTitle,
                  subtitle: strings.attachModulesSubtitle,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _AttachmentCard(
                  icon: Icons.folder_outlined,
                  title: strings.attachProjectsTitle,
                  subtitle: strings.attachProjectsSubtitle,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _AttachmentCard extends StatelessWidget {
  const _AttachmentCard({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  final IconData icon;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    // Feature not yet available: rendered greyed out and non-interactive.
    return Opacity(
      opacity: 0.45,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        decoration: BoxDecoration(
          color: AppTheme.soft.withValues(alpha: 0.4),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppTheme.border),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: AppTheme.body, size: 22),
            const SizedBox(height: 6),
            Text(
              title,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: AppTheme.body,
                fontWeight: FontWeight.w800,
                fontSize: 13,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              subtitle,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: AppTheme.body,
                fontWeight: FontWeight.w600,
                fontSize: 11,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
