class AppConfig {
  const AppConfig({
    required this.supabaseUrl,
    required this.supabaseAnonKey,
    required this.mentorBaseUrl,
  });

  final String supabaseUrl;
  final String supabaseAnonKey;
  final String mentorBaseUrl;

  static const current = AppConfig(
    supabaseUrl: String.fromEnvironment(
      'SUPABASE_URL',
      defaultValue: 'https://qaxfvyxusbbjevtsragn.supabase.co',
    ),
    supabaseAnonKey: String.fromEnvironment(
      'SUPABASE_ANON_KEY',
      defaultValue: 'sb_publishable_EY7dBtmvfQD8BEMAmZKClg_Ix52ZfNm',
    ),
    mentorBaseUrl: String.fromEnvironment(
      'MENTOR_BASE_URL',
      defaultValue: 'https://safementor-api-762553995544.us-central1.run.app',
    ),
  );

  String get authUrl => '$supabaseUrl/auth/v1';
  String get restUrl => '$supabaseUrl/rest/v1';
}
