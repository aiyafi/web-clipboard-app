// src/lib/utils.ts
import React from 'react';

export function linkifyText(text: string) {
    // Match URLs starting with http://, https://, or www.
    const urlRegex = /(\b(?:https?:\/\/|www\.)[^\s]+)/gi;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
        if (/^(https?:\/\/|www\.)/.test(part)) {
            // If the URL doesn't start with http, add it
            const href = part.startsWith("http") ? part : `https://${part}`;
            return (
                <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    {part}
                </a>
            );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
    });
}
