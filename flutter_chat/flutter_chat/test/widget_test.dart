import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:flutter_chat/app.dart';

void main() {
  testWidgets('SafeMentor app boots to login', (WidgetTester tester) async {
    await tester.pumpWidget(const SafeMentorApp());
    await tester.pump();

    expect(find.byType(MaterialApp), findsOneWidget);
    expect(find.textContaining('Checking authentication'), findsWidgets);
  });
}
