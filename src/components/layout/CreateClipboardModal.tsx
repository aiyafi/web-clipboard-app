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

    const handleSubmit = () => {
        // TODO: DB
        console.log("Text to save:", clipboardText);
        onClose();
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setClipboardText(text);
        } catch (err) {
            console.error("Failed to read clipboard contents:", err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Clip</DialogTitle>
                    <DialogDescription>
                        Enter the text you want to save to the web clipboard.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Textarea
                            placeholder="Type or paste your text here..."
                            value={clipboardText}
                            onChange={handleTextChange}
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