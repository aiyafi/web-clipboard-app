"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CreateClipboardModal } from '@/components/layout/CreateClipboardModal';

const Footer = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const createButtonRef = useRef<HTMLButtonElement>(null);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.altKey && event.key === 'c') {
                event.preventDefault(); // Prevent browser shortcuts
                openCreateModal(); // Open the modal
                //Or, use focus and click if direct model open is a problem:
                // createButtonRef.current?.focus();
                // createButtonRef.current?.click();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [openCreateModal]);

    return (
        <footer className="fixed bottom-0 left-0 flex justify-center items-center w-full p-4 bg-white border-t z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <NavigationMenu className="flex justify-center w-full">
                <NavigationMenuList className="flex space-x-4 justify-center">
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                Dashboard
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Button
                            variant="outline"
                            onClick={openCreateModal}
                            ref={createButtonRef}
                        >
                            Create
                        </Button>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <CreateClipboardModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onClose={closeCreateModal}
            />
        </footer>
    );
}

export { Footer };