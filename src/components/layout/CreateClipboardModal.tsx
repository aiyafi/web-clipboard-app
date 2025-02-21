import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from '@/lib/firebaseConfig'; // Import Firebase Firestore database
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions

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

    const handleSubmit = async () => { // Make handleSubmit async
        if (!clipboardText.trim()) {
            console.warn("Clipboard text is empty. Not saving."); // Optional: Log a warning instead of toast
            return; // Prevent saving empty clipboard - removed toast notification
        }

        try {
            const clipboardsCollectionRef = collection(db, 'clipboards');
            await addDoc(clipboardsCollectionRef, {
                text: clipboardText, // Save text to Firestore 'text' field
                createdAt: serverTimestamp(), // Firestore server timestamp
                deviceName: navigator.userAgent, // Optional deviceName
            });
            console.log("Clipboard saved successfully."); // Optional: Log success instead of toast
            setClipboardText(''); // Clear textarea after successful save
            onClose(); // Close the dialog after successful save
        } catch (error: any) {
            console.error("Error adding clipboard to Firestore: ", error); // Keep console error logging
            // Removed toast error notification - no toast anymore
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setClipboardText(text);
        } catch (err) {
            console.error("Failed to read clipboard contents:", err); // Keep console error logging
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