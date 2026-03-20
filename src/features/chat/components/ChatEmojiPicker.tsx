'use client';

import React from 'react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

interface ChatEmojiPickerProps {
    onEmojiClick: (emojiData: EmojiClickData) => void;
}

export default function ChatEmojiPicker({ onEmojiClick }: ChatEmojiPickerProps) {
    return (
        <div className="emoji-picker-wrapper">
            <EmojiPicker
                onEmojiClick={onEmojiClick}
                width={300}
                height={400}
                lazyLoadEmojis={true}
                theme={Theme.AUTO}
                searchDisabled={true}
                skinTonesDisabled={false}
                previewConfig={{
                    showPreview: false
                }}
            />
        </div>
    );
}
