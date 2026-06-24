enum AppLocale { en, pt, es, de }

/// Age band that drives the age-appropriate welcome copy and mascot.
/// 8-11 -> young (friendly Samy), 12-15 -> teen (cool Samy).
enum AgeBand { young, teen }

AgeBand ageBandForAge(int age) => age <= 11 ? AgeBand.young : AgeBand.teen;

extension AppLocaleX on AppLocale {
  String get code => switch (this) {
    AppLocale.en => 'en',
    AppLocale.pt => 'pt',
    AppLocale.es => 'es',
    AppLocale.de => 'de',
  };

  String get label => switch (this) {
    AppLocale.en => 'English',
    AppLocale.pt => 'Português',
    AppLocale.es => 'Español',
    AppLocale.de => 'Deutsch',
  };
}

class AppStrings {
  AppStrings(this.locale);

  final AppLocale locale;

  static const _values = {
    'checkingAuth': {
      'en': 'Checking authentication...',
      'pt': 'Verificando autenticação...',
      'es': 'Comprobando autenticación...',
      'de': 'Anmeldung wird geprüft...',
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
          'Use a mesma conta do painel. O app guarda a sessão com segurança em vez de cookies.',
      'es':
          'Usa la misma cuenta del panel. La app guarda la sesión de forma segura en vez de cookies.',
      'de':
          'Nutze dasselbe Konto wie im Dashboard. Die App speichert die Sitzung sicher statt in Browser-Cookies.',
    },
    'email': {'en': 'Email', 'pt': 'Email', 'es': 'Email', 'de': 'E-Mail'},
    'password': {
      'en': 'Password',
      'pt': 'Senha',
      'es': 'Contraseña',
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
      'pt': 'Eu ajudo você a pensar, aprender e ficar seguro online.',
      'es': 'Te ayudo a pensar, aprender y estar seguro en línea.',
      'de': 'Ich helfe dir beim Denken, Lernen und Sicherbleiben online.',
    },
    'whatWeCanDo': {
      'en': 'What we can do',
      'pt': 'O que podemos fazer',
      'es': 'Qué podemos hacer',
      'de': 'Was wir tun können',
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
      'pt': 'Sou um cérebro de computador, não uma pessoa.',
      'es': 'Soy un cerebro de computadora, no una persona.',
      'de': 'Ich bin ein Computerhirn, keine echte Person.',
    },
    'dangerTell': {
      'en': 'I tell your parents if things get dangerous.',
      'pt': 'Eu aviso seus pais se algo ficar perigoso.',
      'es': 'Aviso a tus padres si algo se vuelve peligroso.',
      'de': 'Ich sage deinen Eltern Bescheid, wenn es gefährlich wird.',
    },
    'startChatting': {
      'en': 'Start Chatting',
      'pt': 'Começar chat',
      'es': 'Empezar chat',
      'de': 'Chat starten',
    },
    // --- Age-appropriate welcome copy (8-11 = young, 12-15 = teen) ---
    'welcomeTitle_young': {
      'en': "Hi, I'm Samy!",
      'pt': 'Oi, eu sou o Samy!',
      'es': '¡Hola, soy Samy!',
      'de': 'Hallo, ich bin Samy!',
    },
    'welcomeTitle_teen': {
      'en': 'Hey, Samy here!',
      'pt': 'E aí, Samy aqui!',
      'es': '¡Hey, aquí Samy!',
      'de': 'Hey, Samy hier!',
    },
    'welcomeSubtitle_young': {
      'en': 'Learn, build, explore! 🌟 Your co-pilot for new ideas and smart questions.',
      'pt': 'Aprender, criar, descobrir! 🌟 Seu copiloto para ideias novas e perguntas inteligentes.',
      'es': '¡Aprender, crear, descubrir! 🌟 Tu copiloto para ideas nuevas y preguntas inteligentes.',
      'de': 'Lernen, Projekte, Entdecken! 🌟 Dein Co-Pilot für neue Ideen und schlaue Fragen.',
    },
    'welcomeSubtitle_teen': {
      'en': 'Learn, build, explore! Your co-pilot for wild ideas and smart questions.',
      'pt': 'Aprender, criar, descobrir! Seu copiloto para ideias geniais e perguntas inteligentes.',
      'es': '¡Aprender, crear, descubrir! Tu copiloto para ideas geniales y preguntas inteligentes.',
      'de': 'Lernen, Projekte, Entdecken! Dein Co-Pilot für krasse Ideen und schlaue Fragen.',
    },
    'whatWeCanDo_young': {
      'en': 'What we do together',
      'pt': 'O que fazemos juntos',
      'es': 'Lo que hacemos juntos',
      'de': 'Das machen wir zusammen',
    },
    'whatWeCanDo_teen': {
      'en': "What we've got",
      'pt': 'O que sabemos fazer',
      'es': 'Lo que sabemos hacer',
      'de': 'Das haben wir drauf',
    },
    'homework_young': {
      'en': 'Get homework done',
      'pt': 'Fazer a lição de casa',
      'es': 'Terminar la tarea',
      'de': 'Hausaufgaben schaffen',
    },
    'homework_teen': {
      'en': 'Master homework & studying',
      'pt': 'Mandar bem nos estudos',
      'es': 'Dominar tareas y estudio',
      'de': 'Hausaufgaben & Lernen meistern',
    },
    'projects_young': {
      'en': 'Plan and practice stuff',
      'pt': 'Planejar e praticar coisas',
      'es': 'Planear y practicar cosas',
      'de': 'Sachen planen und üben',
    },
    'projects_teen': {
      'en': 'Plan & structure projects',
      'pt': 'Planejar e organizar projetos',
      'es': 'Planear y organizar proyectos',
      'de': 'Projekte planen & strukturieren',
    },
    'ideas_young': {
      'en': 'Find cool ideas',
      'pt': 'Achar ideias legais',
      'es': 'Encontrar ideas geniales',
      'de': 'Coole Ideen finden',
    },
    'ideas_teen': {
      'en': 'Discover new ideas',
      'pt': 'Descobrir novas ideias',
      'es': 'Descubrir nuevas ideas',
      'de': 'Neue Ideen entdecken',
    },
    'notHuman_young': {
      'en': "I'm a clever computer, not a real animal.",
      'pt': 'Sou um computador esperto, não um animal de verdade.',
      'es': 'Soy una computadora lista, no un animal de verdad.',
      'de': 'Ich bin ein schlauer Computer, kein echtes Tier.',
    },
    'notHuman_teen': {
      'en': "I'm an AI, not a real person.",
      'pt': 'Sou uma IA, não uma pessoa real.',
      'es': 'Soy una IA, no una persona real.',
      'de': 'Ich bin eine KI, keine echte Person.',
    },
    'dangerTell_young': {
      'en': "If something gets dangerous, I'll tell your parents.",
      'pt': 'Se algo ficar perigoso, eu aviso seus pais.',
      'es': 'Si algo se vuelve peligroso, aviso a tus padres.',
      'de': 'Wenn etwas gefährlich wird, sage ich deinen Eltern Bescheid.',
    },
    'dangerTell_teen': {
      'en': "If things get risky, I'll let your parents know.",
      'pt': 'Se a coisa apertar, eu aviso seus pais.',
      'es': 'Si la cosa se complica, aviso a tus padres.',
      'de': "Wird's brenzlig, gebe ich deinen Eltern Bescheid.",
    },
    'startChatting_young': {
      'en': "Let's go!",
      'pt': 'Vamos lá!',
      'es': '¡Vamos!',
      'de': "Los geht's!",
    },
    'startChatting_teen': {
      'en': 'Get started',
      'pt': 'Começar',
      'es': 'Empezar',
      'de': 'Loslegen',
    },
    'selectChildTitle': {
      'en': 'Welcome back!',
      'pt': 'Bem-vindo de volta!',
      'es': '¡Bienvenido de nuevo!',
      'de': 'Willkommen zurück!',
    },
    'selectChildSubtitle': {
      'en': 'Please select the child who will use Samy',
      'pt': 'Selecione a criança que usará o Samy',
      'es': 'Selecciona el niño que usará Samy',
      'de': 'Bitte wähle das Kind aus, das Samy nutzen wird',
    },
    'proceed': {
      'en': 'Proceed',
      'pt': 'Continuar',
      'es': 'Continuar',
      'de': 'Weiter',
    },
    'noChildrenTitle': {
      'en': 'Account initialization required',
      'pt': 'Conta precisa ser configurada',
      'es': 'Cuenta requiere configuración',
      'de': 'Konto muss eingerichtet werden',
    },
    'noChildrenBody': {
      'en':
          'Please add the children that will use the chat app in your dashboard.',
      'pt': 'Adicione no painel as crianças que usarão o chat.',
      'es': 'Agrega en el panel los niños que usarán el chat.',
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
      'pt': 'Oi {name}, procuro linguagem insegura para proteger você',
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
      'pt': 'Não compartilhe endereço, telefone ou dados pessoais.',
      'es': 'No compartas dirección, teléfono ni datos personales.',
      'de': 'Bitte teile keine Adresse, Telefonnummer oder persönlichen Daten.',
    },
    'stopGeneration': {
      'en': 'Stop generation',
      'pt': 'Parar resposta',
      'es': 'Detener respuesta',
      'de': 'Antwort stoppen',
    },
    'help': {'en': 'Help', 'pt': 'Ajuda', 'es': 'Ayuda', 'de': 'Hilfe'},
    'changeChild': {
      'en': 'Change child',
      'pt': 'Trocar criança',
      'es': 'Cambiar niño',
      'de': 'Kind wechseln',
    },
    'signOut': {
      'en': 'Sign out',
      'pt': 'Sair da conta',
      'es': 'Cerrar sesión',
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
      'pt': 'Fale com um adulto de confiança quando...',
      'es': 'Habla con un adulto de confianza cuando...',
      'de': 'Sprich mit einem Erwachsenen, wenn...',
    },
    'helpHeroTitle': {
      'en': 'How I can help',
      'pt': 'Como posso ajudar',
      'es': 'Cómo puedo ayudar',
      'de': 'Wie ich helfen kann',
    },
    'helpHeroBody': {
      'en':
          "I'm here to help you think through problems and chat. Remember, I'm a computer program, not a person.",
      'pt':
          'Estou aqui para te ajudar a pensar sobre problemas e conversar. Lembre-se: sou um programa de computador, não uma pessoa.',
      'es':
          'Estoy aquí para ayudarte a pensar sobre tus problemas y conversar. Recuerda: soy un programa de computadora, no una persona.',
      'de':
          'Ich helfe dir, über Probleme nachzudenken und zu reden. Denk dran: Ich bin ein Computerprogramm, keine Person.',
    },
    'helpFeel1': {
      'en': 'You feel scared or unsafe',
      'pt': 'Você se sente com medo ou inseguro',
      'es': 'Te sientes asustado o inseguro',
      'de': 'Du fühlst dich ängstlich oder unsicher',
    },
    'helpFeel2': {
      'en': 'Someone is hurting you',
      'pt': 'Alguém está te machucando',
      'es': 'Alguien te está haciendo daño',
      'de': 'Jemand tut dir weh',
    },
    'helpFeel3': {
      'en': 'You feel very sad or confused',
      'pt': 'Você se sente muito triste ou confuso',
      'es': 'Te sientes muy triste o confundido',
      'de': 'Du bist sehr traurig oder verwirrt',
    },
    'helpFeel4': {
      'en': "I can't truly understand these feelings",
      'pt': 'Eu não consigo entender de verdade esses sentimentos',
      'es': 'No puedo entender de verdad estos sentimientos',
      'de': 'Ich kann diese Gefühle nicht wirklich verstehen',
    },
    'helpAdultsTitle': {
      'en': 'Trusted Adults',
      'pt': 'Adultos de confiança',
      'es': 'Adultos de confianza',
      'de': 'Vertrauenspersonen',
    },
    'helpAdultParent': {
      'en': 'Parent',
      'pt': 'Pais',
      'es': 'Padres',
      'de': 'Eltern',
    },
    'helpAdultTeacher': {
      'en': 'Teacher',
      'pt': 'Professor',
      'es': 'Profesor',
      'de': 'Lehrer',
    },
    'helpAdultCoach': {
      'en': 'Coach',
      'pt': 'Treinador',
      'es': 'Entrenador',
      'de': 'Trainer',
    },
    'helpAdultRelative': {
      'en': 'Relative',
      'pt': 'Parente',
      'es': 'Familiar',
      'de': 'Verwandte',
    },
    'helpRememberTitle': {
      'en': 'Things to Remember',
      'pt': 'Para lembrar',
      'es': 'Para recordar',
      'de': 'Wichtig zu wissen',
    },
    'helpSafeTitle': {
      'en': 'Stay Safe',
      'pt': 'Fique seguro',
      'es': 'Mantente seguro',
      'de': 'Sicher bleiben',
    },
    'helpSafeBody': {
      'en': 'I must tell your parents if things get dangerous.',
      'pt': 'Eu preciso avisar seus pais se algo ficar perigoso.',
      'es': 'Debo avisar a tus padres si algo se vuelve peligroso.',
      'de': 'Ich muss deinen Eltern Bescheid sagen, wenn es gefährlich wird.',
    },
    'helpLearnTitle': {
      'en': 'Learn Together',
      'pt': 'Aprender juntos',
      'es': 'Aprender juntos',
      'de': 'Gemeinsam lernen',
    },
    'helpLearnBody': {
      'en': "I help you think, but I won't do your homework!",
      'pt': 'Eu te ajudo a pensar, mas não faço a sua lição de casa!',
      'es': 'Te ayudo a pensar, ¡pero no haré tu tarea!',
      'de': 'Ich helfe dir beim Denken, aber ich mache deine Hausaufgaben nicht!',
    },
    'helpPrivacyTitle': {
      'en': 'Privacy',
      'pt': 'Privacidade',
      'es': 'Privacidad',
      'de': 'Privatsphäre',
    },
    'helpPrivacyBody': {
      'en': 'Our chats stay private unless you are in danger.',
      'pt': 'Nossas conversas ficam privadas, a menos que você esteja em perigo.',
      'es': 'Nuestras conversaciones quedan privadas, salvo que estés en peligro.',
      'de': 'Unsere Chats bleiben privat — außer du bist in Gefahr.',
    },
    'helpCallButton': {
      'en': 'Call Kids Helpline · 116 111',
      'pt': 'Ligar para o Disque-Ajuda · 116 111',
      'es': 'Llamar a la línea de ayuda · 116 111',
      'de': 'Kinder-Sorgentelefon anrufen · 116 111',
    },
    'attachUploadTitle': {
      'en': 'Upload image',
      'pt': 'Enviar imagem',
      'es': 'Subir imagen',
      'de': 'Bild hochladen',
    },
    'attachUploadSubtitle': {
      'en': 'Show homework',
      'pt': 'Mostrar tarefas',
      'es': 'Mostrar tareas',
      'de': 'Hausaufgaben zeigen',
    },
    'attachSecondOpinionTitle': {
      'en': 'Second opinion',
      'pt': 'Segunda opinião',
      'es': 'Segunda opinión',
      'de': 'Zweite Meinung',
    },
    'attachSecondOpinionSubtitle': {
      'en': 'Ask another AI',
      'pt': 'Perguntar a outra IA',
      'es': 'Preguntar a otra IA',
      'de': 'Andere KI fragen',
    },
    'attachModulesTitle': {
      'en': 'Learning modules',
      'pt': 'Módulos de estudo',
      'es': 'Módulos de estudio',
      'de': 'Lernmodule',
    },
    'attachModulesSubtitle': {
      'en': 'Math · Reading',
      'pt': 'Matemática · Leitura',
      'es': 'Matemáticas · Lectura',
      'de': 'Mathe · Lesen',
    },
    'attachProjectsTitle': {
      'en': 'My projects',
      'pt': 'Meus projetos',
      'es': 'Mis proyectos',
      'de': 'Meine Projekte',
    },
    'attachProjectsSubtitle': {
      'en': 'Invent a backpack',
      'pt': 'Inventar uma mochila',
      'es': 'Inventar una mochila',
      'de': 'Rucksack erfinden',
    },
    'helplineSection': {
      'en': 'Or call someone trained for this',
      'pt': 'Ou ligue para alguém treinado para isso',
      'es': 'O llama a alguien preparado para esto',
      'de': 'Oder ruf jemanden an, der dafür ausgebildet ist',
    },
    'helplineBadge': {
      'en': 'Free · Anonymous · For kids',
      'pt': 'Grátis · Anônimo · Para crianças',
      'es': 'Gratis · Anónimo · Para niños',
      'de': 'Kostenlos · Anonym · Für Kinder',
    },
    'helplineHint': {
      'en':
          'Sometimes it helps to talk to someone from outside your family or school, trained just for this, and completely anonymous',
      'pt':
          'Às vezes ajuda conversar com alguém de fora da sua família ou escola, treinado especialmente para isso e totalmente anônimo.',
      'es':
          'A veces ayuda hablar con alguien de fuera de tu familia o escuela, preparado especialmente para esto y completamente anónimo.',
      'de':
          'Manchmal hilft es, mit jemandem zu sprechen, der nicht zu deiner Familie oder Schule gehört — speziell dafür ausgebildet und völlig anonym.',
    },
    'switchChild': {
      'en': 'Switch child / Sign out',
      'pt': 'Trocar criança / Sair',
      'es': 'Cambiar niño / Cerrar sesión',
      'de': 'Kind wechseln / Abmelden',
    },
    'switchChildHint': {
      'en': 'To switch the child you need to sign out.',
      'pt': 'Para trocar de criança, é necessário sair.',
      'es': 'Para cambiar de niño debe cerrar sesión.',
      'de': 'Um das Kind zu wechseln müssen Sie sich abmelden.',
    },
    'sessionNote': {
      'en':
          'This app uses the same protected and encrypted database as your parent dashboard. Your login details are stored exclusively on your device, locally and securely, to prevent unauthorized access.',
      'pt':
          'Este app usa o mesmo banco de dados protegido e criptografado do seu painel dos pais. Os seus dados de acesso são armazenados exclusivamente de forma local e segura no seu dispositivo, para impedir acessos não autorizados.',
      'es':
          'Esta app usa la misma base de datos protegida y cifrada que tu panel para padres. Tus datos de acceso se almacenan exclusivamente de forma local y segura en tu dispositivo, para evitar accesos no autorizados.',
      'de':
          'Diese App nutzt dieselbe geschützte und verschlüsselte Datenbank wie Ihr Eltern-Dashboard. Ihre Anmeldedaten werden ausschließlich lokal und sicher auf Ihrem Gerät gespeichert, um unbefugten Zugriff zu verhindern.',
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
  String get noChildrenTitle => text('noChildrenTitle');
  String get noChildrenBody => text('noChildrenBody');
  String get chatHint => text('chatHint');
  String get piiTitle => text('piiTitle');
  String get piiBody => text('piiBody');
  String get stopGeneration => text('stopGeneration');
  String get help => text('help');
  String get changeChild => text('changeChild');
  String get signOut => text('signOut');
  String get helpTitle => text('helpTitle');
  String get trustedAdult => text('trustedAdult');
  String get helpHeroTitle => text('helpHeroTitle');
  String get helpHeroBody => text('helpHeroBody');
  String get helpFeel1 => text('helpFeel1');
  String get helpFeel2 => text('helpFeel2');
  String get helpFeel3 => text('helpFeel3');
  String get helpFeel4 => text('helpFeel4');
  String get helpAdultsTitle => text('helpAdultsTitle');
  String get helpAdultParent => text('helpAdultParent');
  String get helpAdultTeacher => text('helpAdultTeacher');
  String get helpAdultCoach => text('helpAdultCoach');
  String get helpAdultRelative => text('helpAdultRelative');
  String get helpRememberTitle => text('helpRememberTitle');
  String get helpSafeTitle => text('helpSafeTitle');
  String get helpSafeBody => text('helpSafeBody');
  String get helpLearnTitle => text('helpLearnTitle');
  String get helpLearnBody => text('helpLearnBody');
  String get helpPrivacyTitle => text('helpPrivacyTitle');
  String get helpPrivacyBody => text('helpPrivacyBody');
  String get helpCallButton => text('helpCallButton');
  String get attachUploadTitle => text('attachUploadTitle');
  String get attachUploadSubtitle => text('attachUploadSubtitle');
  String get attachSecondOpinionTitle => text('attachSecondOpinionTitle');
  String get attachSecondOpinionSubtitle => text('attachSecondOpinionSubtitle');
  String get attachModulesTitle => text('attachModulesTitle');
  String get attachModulesSubtitle => text('attachModulesSubtitle');
  String get attachProjectsTitle => text('attachProjectsTitle');
  String get attachProjectsSubtitle => text('attachProjectsSubtitle');
  String get helplineSection => text('helplineSection');
  String get helplineBadge => text('helplineBadge');
  String get helplineHint => text('helplineHint');
  String get switchChild => text('switchChild');
  String get switchChildHint => text('switchChildHint');
  String get sessionNote => text('sessionNote');

  String safetyBadge(String name) =>
      text('safetyBadge').replaceAll('{name}', name);

  /// Returns the age-appropriate variant for a base key, e.g.
  /// ageText('welcomeTitle', AgeBand.teen) -> 'Hey, Samy hier!'.
  String ageText(String baseKey, AgeBand band) =>
      text('${baseKey}_${band.name}');

  String text(String key) =>
      _values[key]?[locale.code] ?? _values[key]?['en'] ?? key;
}
