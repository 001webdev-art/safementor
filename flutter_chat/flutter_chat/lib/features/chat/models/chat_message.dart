enum MessageRole { user, assistant }

enum SyncStatus { pending, synced, failed }

class ChatMessage {
  const ChatMessage({
    required this.id,
    required this.childId,
    required this.role,
    required this.content,
    required this.timestamp,
    this.syncStatus = SyncStatus.pending,
    this.parentMessageId,
    this.nickname,
    this.intent,
  });

  final String id;
  final String childId;
  final MessageRole role;
  final String content;
  final DateTime timestamp;
  final SyncStatus syncStatus;
  final String? parentMessageId;
  final String? nickname;
  final Map<String, dynamic>? intent;

  Map<String, dynamic> toSupabaseJson() {
    final base = {
      'local_id': id,
      'child_id': childId,
      'message_type': role.name,
      'content': content,
      'timestamp': timestamp.toIso8601String(),
      'is_synced': false,
    };
    if (intent != null) {
      base.addAll({
        'user_intent_intensity': intent!['intensity'],
        'user_intent_valence': intent!['valence'],
        'user_intent_flag': intent!['flag'],
        'user_intent_means': intent!['means'],
        'user_intent_actionable': intent!['actionable'],
        'user_intent_prob': intent!['prob'],
        'user_intent_summary': intent!['summary'],
      });
    }
    return base;
  }

  factory ChatMessage.fromSupabaseJson(Map<String, dynamic> json) {
    return ChatMessage(
      id: json['local_id'] as String? ?? json['id'].toString(),
      childId: json['child_id'] as String,
      role: (json['message_type'] as String? ?? 'assistant') == 'user'
          ? MessageRole.user
          : MessageRole.assistant,
      content: json['content'] as String? ?? '',
      timestamp:
          DateTime.tryParse(json['timestamp'] as String? ?? '') ??
          DateTime.now(),
      syncStatus: switch (json['sync_status'] as String?) {
        'synced' => SyncStatus.synced,
        'failed' => SyncStatus.failed,
        _ => SyncStatus.pending,
      },
      parentMessageId: json['parent_message_id'] as String?,
      nickname: json['nickname'] as String?,
      intent: {
        'intensity': json['user_intent_intensity'],
        'valence': json['user_intent_valence'],
        'flag': json['user_intent_flag'],
        'means': json['user_intent_means'],
        'actionable': json['user_intent_actionable'],
        'prob': json['user_intent_prob'],
        'summary': json['user_intent_summary'],
      },
    );
  }
}
