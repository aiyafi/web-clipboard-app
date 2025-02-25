// src/lib/utils.ts
import React from 'react';

export function linkifyText(text: string) {
    // Regex to match URLs (http or https)
    const urlRegex = /(\bhttps?:\/\/[^\s]+)/gi;
    // Split the text by URLs
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
        // If the part matches the URL regex, render as a link
        if (urlRegex.test(part)) {
            return (
                <a
                    key={index}
                    href={part}
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