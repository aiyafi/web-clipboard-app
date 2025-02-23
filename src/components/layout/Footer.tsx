"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CreateClipboardModal } from '@/components/layout/CreateClipboardModal';
import { House, CirclePlus, CircleHelp } from 'lucide-react'; // Added icons

const Footer = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const createButtonRef = useRef<HTMLButtonElement>(null);

    const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
    const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.altKey && event.key === 'c') {
                event.preventDefault();
                openCreateModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [openCreateModal]);

    return (
        <footer className="fixed bottom-0 left-0 flex justify-center items-center w-full p-4 bg-white border-t z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <NavigationMenu className="flex justify-center w-full">
                <NavigationMenuList className="flex space-x-4 justify-center">
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink 
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                aria-label="Dashboard"
                            >
                                <House size={20} /> {/* Replaced text with icon */}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Button
                            variant="outline"
                            onClick={openCreateModal}
                            ref={createButtonRef}
                            aria-label="Create"
                        >
                            <CirclePlus size={20} /> {/* Replaced text with icon */}
                        </Button>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            
            {/* Added help icon on the right side */}
            <div className="absolute right-4">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    aria-label="Help"
                    className="text-muted-foreground hover:text-foreground"
                >
                    <CircleHelp size={20} />
                </Button>
            </div>

            <CreateClipboardModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onClose={closeCreateModal}
            />
        </footer>
    );
}

export { Footer };