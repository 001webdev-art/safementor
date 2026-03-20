import os
import pathlib

base = r"c:\xampp\htdocs\temp\next1_intl_proto"

dirs = [
    "src/features/auth/components",
    "src/features/auth/hooks",
    "src/features/auth/services",
    "src/features/auth/types",
    "src/features/auth/contexts",
    "src/features/chat/components",
    "src/features/chat/hooks",
    "src/features/chat/services",
    "src/features/chat/types",
    "src/features/chat/store",
    "src/features/chat/contexts",
    "src/features/chat-history/components",
    "src/features/chat-history/hooks",
    "src/features/chat-history/types",
    "src/features/dashboard/components",
    "src/features/dashboard/hooks",
    "src/features/dashboard/forms",
    "src/features/dashboard/sections",
    "src/features/dashboard/types",
    "src/features/dashboard/store",
    "src/features/profile/components",
    "src/features/profile/hooks",
    "src/features/profile/services",
    "src/features/profile/types",
    "src/features/compliance/components",
    "src/features/compliance/types",
    "src/features/landing/components",
    "src/components/ui",
    "src/components/layout",
    "src/components/shared",
    "src/lib/supabase",
    "src/lib/i18n",
    "src/lib/utils",
    "src/lib/constants",
    "src/lib/hooks",
    "src/types",
    "src/app/api/access",
    "src/app/api/auth",
    "src/app/api/chat",
]

for d in dirs:
    path = os.path.join(base, d)
    pathlib.Path(path).mkdir(parents=True, exist_ok=True)
    print(f"Created: {d}")

print("\nDone!")
