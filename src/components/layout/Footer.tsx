"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CreateClipboardModal } from '@/components/layout/CreateClipboardModal';

const Footer = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false); 

    return (
        <footer className="flex justify-center items-center w-full p-4">
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