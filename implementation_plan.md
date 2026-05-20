# Migrate Web Chat to Flutter

Migrate the existing `/app/[locale]/chat` experience from the current Next.js monorepo into the standalone Flutter mobile app in `flutter_chat/flutter_chat`.

## User Review Required

> [!IMPORTANT]
> The Next.js application seems to use PouchDB for local sync and offline capabilities. In Flutter, the exact equivalent would require an embedded database like `sqflite`, `hive`, or `isar`. For the initial phase, we will implement standard HTTP API calls. Please confirm if full offline PouchDB-like synchronization is required for the MVP, or if we can start with basic API integration for chat history.
>
> We will use `provider` or `riverpod` for state management in Flutter. For this plan, we will stick to `provider` as it is a common standard, unless `riverpod` or `bloc` is preferred.
>
> As per the cookies/auth requirement, the Next.js app shares session cookies. Since Flutter mobile apps don't handle cross-domain browser cookies seamlessly for background API calls, we will implement an auth layer in Flutter that handles token/session management, assuming an endpoint will provide or validate the token. 

## Open Questions

> [!WARNING]
> What is the preferred state management library for this Flutter project? (e.g., Provider, Riverpod, BLoC, GetX)
> Do we have REST API endpoints mapped out for fetching/sending messages, or do we strictly need to reproduce the `mentor-client.ts` WebSocket / Polling logic?

## Proposed Changes

We will establish a scalable feature-first folder structure inside `lib/`.

### App Structure & Core

Setup basic routing, theming, and API clients.

#### [NEW] [lib/main.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/main.dart)
Entry point, localization setup, and routing initialization.
#### [NEW] [lib/core/api_client.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/core/api_client.dart)
HTTP client handling session/tokens and requests to the backend.
#### [NEW] [lib/core/theme.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/core/theme.dart)
Visual aspects mirroring the Next.js app's child-focused UI.
#### [NEW] [pubspec.yaml](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/pubspec.yaml)
Add dependencies: `provider` (or preferred state management), `http` or `dio`, `shared_preferences` (for token/cookie storage), `flutter_localizations`.

---

### Models

Dart data models equivalent to `/src/features/chat/types`.

#### [NEW] [lib/models/chat_message.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/models/chat_message.dart)
Dart representation of chat messages.
#### [NEW] [lib/models/mentor.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/models/mentor.dart)
Dart representation of mentor data.
#### [NEW] [lib/models/child.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/models/child.dart)
Dart representation for ChildSelector.

---

### Chat Feature

Re-creating the components and screens from `features/chat`.

#### [NEW] [lib/features/chat/screens/chat_screen.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/features/chat/screens/chat_screen.dart)
Main chat view corresponding to `ChatClient.tsx`.
#### [NEW] [lib/features/chat/widgets/message_bubble.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/features/chat/widgets/message_bubble.dart)
UI for chat bubbles (equivalent to `MessageBubble.tsx`).
#### [NEW] [lib/features/chat/widgets/chat_footer.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/features/chat/widgets/chat_footer.dart)
Input area for messages (equivalent to `ChatFooter.tsx`).
#### [NEW] [lib/features/chat/widgets/child_selector.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/features/chat/widgets/child_selector.dart)
Selector equivalent to `ChildSelector.tsx`.
#### [NEW] [lib/features/chat/widgets/chat_emoji_picker.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/features/chat/widgets/chat_emoji_picker.dart)
Emoji input equivalent to `ChatEmojiPicker.tsx`.

---

### Services & State Management

Handling API calls and local state.

#### [NEW] [lib/services/mentor_service.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/services/mentor_service.dart)
Replaces `mentor-client.ts`.
#### [NEW] [lib/services/auth_service.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/services/auth_service.dart)
Handles session token management and acts as a bridge for the shared cookie system.
#### [NEW] [lib/providers/chat_provider.dart](file:///c:/xampp/htdocs/temp/next1_intl_proto/flutter_chat/flutter_chat/lib/providers/chat_provider.dart)
Manages the state of messages and syncing.

## Verification Plan

### Automated Tests
- N/A for MVP Flutter UI setup, but `flutter test` can be used once we establish API mocking.

### Manual Verification
- `cd flutter_chat/flutter_chat && flutter run` on a mobile emulator or desktop (if enabled).
- Validate that the UI matches the child-focused web application.
- Verify basic message state creation, even if hardcoded or hitting an unauthenticated stub API initially.
