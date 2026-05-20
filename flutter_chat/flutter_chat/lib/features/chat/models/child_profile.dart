class ChildProfile {
  const ChildProfile({
    required this.id,
    required this.nickname,
    this.birthMonth,
    this.birthYear,
    this.language,
  });

  final String id;
  final String nickname;
  final int? birthMonth;
  final int? birthYear;
  final String? language;

  int get age {
    if (birthYear == null) return 10;
    final now = DateTime.now();
    var computed = now.year - birthYear!;
    final month = birthMonth ?? 1;
    if (now.month < month) computed--;
    return computed.clamp(4, 18);
  }

  factory ChildProfile.fromJson(Map<String, dynamic> json) {
    return ChildProfile(
      id: json['id'] as String,
      nickname: json['nickname'] as String? ?? 'Friend',
      birthMonth: json['birth_month'] as int?,
      birthYear: json['birth_year'] as int?,
      language: json['language'] as String?,
    );
  }
}
