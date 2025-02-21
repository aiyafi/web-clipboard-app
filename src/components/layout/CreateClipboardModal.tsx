import React, { useState } from 'react';
import { sha256 } from 'js-sha256';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CreateClipboardModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClose: () => void;
}

const CreateClipboardModal: React.FC<CreateClipboardModalProps> = ({ open, onOpenChange, onClose }) => {
    const [clipboardText, setClipboardText] = useState('');

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setClipboardText(event.target.value);
    };

    // Function to generate SHA-256 hash of text
    const generateHash = (text: string) => {
        return sha256(text);
    };

    const handleSubmit = async () => {
        if (!clipboardText.trim()) {
            console.warn("Clipboard text is empty. Not saving.");
            return;
        }

        try {
            const clipboardsCollectionRef = collection(db, 'clipboards');
            await addDoc(clipboardsCollectionRef, {
                text: clipboardText,
                hashedText: generateHash(clipboardText),
                createdAt: serverTimestamp(),
                deviceName: navigator.userAgent,
            });
            console.log("Clipboard saved successfully.");
            setClipboardText('');
            onClose();
        } catch (error: any) {
            console.error("Error adding clipboard to Firestore: ", error);
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setClipboardText(text);
        } catch (err) {
            console.error("Failed to read clipboard contents:", err);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Clip</DialogTitle>
                    <DialogDescription>
                        Enter the text.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Textarea
                            placeholder="Type or paste your text here..."
                            value={clipboardText}
                            onChange={handleTextChange}
                            onKeyDown={handleKeyDown}
                            className="col-span-4"
                        />
                    </div>
                </div>
                <DialogFooter className="flex items-center">
                    <div className="space-x-2">
                        <Button type="button" onClick={handlePaste}>
                            Paste
                        </Button>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { CreateClipboardModal };