enum AppLocale { en, pt, es, de }

extension AppLocaleX on AppLocale {
  String get code => switch (this) {
    AppLocale.en => 'en',
    AppLocale.pt => 'pt',
    AppLocale.es => 'es',
    AppLocale.de => 'de',
  };

  String get label => switch (this) {
    AppLocale.en => 'English',
    AppLocale.pt => 'Portugues',
    AppLocale.es => 'Espanol',
    AppLocale.de => 'Deutsch',
  };
}

class AppStrings {
  AppStrings(this.locale);

  final AppLocale locale;

  static const _values = {
    'checkingAuth': {
      'en': 'Checking authentication...',
      'pt': 'Verificando autenticacao...',
      'es': 'Comprobando autenticacion...',
      'de': 'Anmeldung wird gepruft...',
    },
    'loginTitle': {
      'en': 'Parent login',
      'pt': 'Login dos pais',
      'es': 'Acceso para padres',
      'de': 'Eltern-Login',
    },
    'loginSubtitle': {
      'en':
          'Use the same account as the dashboard. Mobile keeps the session in secure storage instead of browser cookies.',
      'pt':
          'Use a mesma conta do painel. O app guarda a sessao com seguranca em vez de cookies.',
      'es':
          'Usa la misma cuenta del panel. La app guarda la sesion de forma segura en vez de cookies.',
      'de':
          'Nutze dasselbe Konto wie im Dashboard. Die App speichert die Sitzung sicher statt in Browser-Cookies.',
    },
    'email': {'en': 'Email', 'pt': 'Email', 'es': 'Email', 'de': 'E-Mail'},
    'password': {
      'en': 'Password',
      'pt': 'Senha',
      'es': 'Contrasena',
      'de': 'Passwort',
    },
    'signIn': {
      'en': 'Sign in',
      'pt': 'Entrar',
      'es': 'Entrar',
      'de': 'Anmelden',
    },
    'welcomeTitle': {
      'en': "Hi, I'm\nSafeMentor.",
      'pt': 'Oi, eu sou o\nSafeMentor.',
      'es': 'Hola, soy\nSafeMentor.',
      'de': 'Hallo, ich bin\nSafeMentor.',
    },
    'welcomeSubtitle': {
      'en': 'I help you think, learn, and stay safe online.',
      'pt': 'Eu ajudo voce a pensar, aprender e ficar seguro online.',
      'es': 'Te ayudo a pensar, aprender y estar seguro en linea.',
      'de': 'Ich helfe dir beim Denken, Lernen und Sicherbleiben online.',
    },
    'whatWeCanDo': {
      'en': 'What we can do',
      'pt': 'O que podemos fazer',
      'es': 'Que podemos hacer',
      'de': 'Was wir tun konnen',
    },
    'homework': {
      'en': 'Tackle homework',
      'pt': 'Encarar tarefas',
      'es': 'Resolver tareas',
      'de': 'Hausaufgaben angehen',
    },
    'projects': {
      'en': 'Plan fun projects',
      'pt': 'Planejar projetos',
      'es': 'Planear proyectos',
      'de': 'Projekte planen',
    },
    'ideas': {
      'en': 'Explore cool ideas',
      'pt': 'Explorar ideias',
      'es': 'Explorar ideas',
      'de': 'Ideen entdecken',
    },
    'goodToKnow': {
      'en': 'Good to know',
      'pt': 'Bom saber',
      'es': 'Bueno saber',
      'de': 'Gut zu wissen',
    },
    'notHuman': {
      'en': "I'm a computer brain, not a real person.",
      'pt': 'Sou um cerebro de computador, nao uma pessoa.',
      'es': 'Soy un cerebro de computadora, no una persona.',
      'de': 'Ich bin ein Computerhirn, keine echte Person.',
    },
    'dangerTell': {
      'en': 'I tell your parents if things get dangerous.',
      'pt': 'Eu aviso seus pais se algo ficar perigoso.',
      'es': 'Aviso a tus padres si algo se vuelve peligroso.',
      'de': 'Ich sage deinen Eltern Bescheid, wenn es gefahrlich wird.',
    },
    'startChatting': {
      'en': 'Start Chatting',
      'pt': 'Comecar chat',
      'es': 'Empezar chat',
      'de': 'Chat starten',
    },
    'selectChildTitle': {
      'en': 'Welcome back!',
      'pt': 'Bem-vindo de volta!',
      'es': 'Bienvenido de nuevo!',
      'de': 'Willkommen zuruck!',
    },
    'selectChildSubtitle': {
      'en': 'Please select the child using the chat today',
      'pt': 'Selecione a crianca que usara o chat hoje',
      'es': 'Selecciona el nino que usara el chat hoy',
      'de': 'Bitte wahle das Kind aus, das heute chattet',
    },
    'proceed': {
      'en': 'Proceed',
      'pt': 'Continuar',
      'es': 'Continuar',
      'de': 'Weiter',
    },
    'cancelExit': {
      'en': 'Cancel and Exit',
      'pt': 'Cancelar e sair',
      'es': 'Cancelar y salir',
      'de': 'Abbrechen',
    },
    'noChildrenTitle': {
      'en': 'Account initialization required',
      'pt': 'Conta precisa ser configurada',
      'es': 'Cuenta requiere configuracion',
      'de': 'Konto muss eingerichtet werden',
    },
    'noChildrenBody': {
      'en':
          'Please add the children that will use the chat app in your dashboard.',
      'pt': 'Adicione no painel as criancas que usarao o chat.',
      'es': 'Agrega en el panel los ninos que usaran el chat.',
      'de': 'Bitte lege im Dashboard die Kinder an, die den Chat nutzen.',
    },
    'chatHint': {
      'en': 'Type a message...',
      'pt': 'Digite uma mensagem...',
      'es': 'Escribe un mensaje...',
      'de': 'Nachricht schreiben...',
    },
    'safetyBadge': {
      'en': 'Hi {name}, I look for unsafe language to keep you safe',
      'pt': 'Oi {name}, procuro linguagem insegura para proteger voce',
      'es': 'Hola {name}, busco lenguaje inseguro para protegerte',
      'de': 'Hallo {name}, ich achte auf unsichere Sprache',
    },
    'piiTitle': {
      'en': 'Wait a second',
      'pt': 'Espere um pouco',
      'es': 'Espera un segundo',
      'de': 'Einen Moment',
    },
    'piiBody': {
      'en': "Please don't share personal info like address or phone.",
      'pt': 'Nao compartilhe endereco, telefone ou dados pessoais.',
      'es': 'No compartas direccion, telefono ni datos personales.',
      'de': 'Bitte teile keine Adresse, Telefonnummer oder personlichen Daten.',
    },
    'stopGeneration': {
      'en': 'Stop generation',
      'pt': 'Parar resposta',
      'es': 'Detener respuesta',
      'de': 'Antwort stoppen',
    },
    'help': {'en': 'Help', 'pt': 'Ajuda', 'es': 'Ayuda', 'de': 'Hilfe'},
    'exit': {'en': 'Exit', 'pt': 'Sair', 'es': 'Salir', 'de': 'Beenden'},
    'hello': {'en': 'Hello', 'pt': 'Ola', 'es': 'Hola', 'de': 'Hallo'},
    'chat': {'en': 'Chat', 'pt': 'Chat', 'es': 'Chat', 'de': 'Chat'},
    'history': {
      'en': 'History',
      'pt': 'Historico',
      'es': 'Historial',
      'de': 'Verlauf',
    },
    'changeChild': {
      'en': 'Change child',
      'pt': 'Trocar crianca',
      'es': 'Cambiar nino',
      'de': 'Kind wechseln',
    },
    'signOut': {
      'en': 'Sign out',
      'pt': 'Sair da conta',
      'es': 'Cerrar sesion',
      'de': 'Abmelden',
    },
    'helpTitle': {
      'en': 'Help & Support',
      'pt': 'Ajuda e suporte',
      'es': 'Ayuda y soporte',
      'de': 'Hilfe & Support',
    },
    'trustedAdult': {
      'en': 'Talk to a trusted adult when...',
      'pt': 'Fale com um adulto de confianca quando...',
      'es': 'Habla con un adulto de confianza cuando...',
      'de': 'Sprich mit einem Erwachsenen, wenn...',
    },
    'exitTitle': {
      'en': 'Was great to see you',
      'pt': 'Foi otimo ver voce',
      'es': 'Fue genial verte',
      'de': 'Schon, dich zu sehen',
    },
    'exitBody': {
      'en': 'Now go play outside and have fun!',
      'pt': 'Agora va brincar e se divertir!',
      'es': 'Ahora ve a jugar y divertirte!',
      'de': 'Jetzt geh spielen und hab Spass!',
    },
    'newSession': {
      'en': 'Start New Session',
      'pt': 'Nova sessao',
      'es': 'Nueva sesion',
      'de': 'Neue Sitzung',
    },
  };

  String get checkingAuth => text('checkingAuth');
  String get loginTitle => text('loginTitle');
  String get loginSubtitle => text('loginSubtitle');
  String get email => text('email');
  String get password => text('password');
  String get signIn => text('signIn');
  String get welcomeTitle => text('welcomeTitle');
  String get welcomeSubtitle => text('welcomeSubtitle');
  String get whatWeCanDo => text('whatWeCanDo');
  String get homework => text('homework');
  String get projects => text('projects');
  String get ideas => text('ideas');
  String get goodToKnow => text('goodToKnow');
  String get notHuman => text('notHuman');
  String get dangerTell => text('dangerTell');
  String get startChatting => text('startChatting');
  String get selectChildTitle => text('selectChildTitle');
  String get selectChildSubtitle => text('selectChildSubtitle');
  String get proceed => text('proceed');
  String get cancelExit => text('cancelExit');
  String get noChildrenTitle => text('noChildrenTitle');
  String get noChildrenBody => text('noChildrenBody');
  String get chatHint => text('chatHint');
  String get piiTitle => text('piiTitle');
  String get piiBody => text('piiBody');
  String get stopGeneration => text('stopGeneration');
  String get help => text('help');
  String get exit => text('exit');
  String get hello => text('hello');
  String get chat => text('chat');
  String get history => text('history');
  String get changeChild => text('changeChild');
  String get signOut => text('signOut');
  String get helpTitle => text('helpTitle');
  String get trustedAdult => text('trustedAdult');
  String get exitTitle => text('exitTitle');
  String get exitBody => text('exitBody');
  String get newSession => text('newSession');

  String safetyBadge(String name) =>
      text('safetyBadge').replaceAll('{name}', name);

  String text(String key) =>
      _values[key]?[locale.code] ?? _values[key]?['en'] ?? key;
}
