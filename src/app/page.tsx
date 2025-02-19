// src/app/dashboard/page.tsx
"use client"

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { useTheme } from "next-themes";
import { Particles } from "@/components/magicui/particles";

const Page = () => {
    const { resolvedTheme } = useTheme();
    const [particleColor, setParticleColor] = useState("#ffffff");

    useEffect(() => {
        setParticleColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

    return (
        <div>
            <Header />
            <div className="relative p-4">
                <h1 className="z-10 relative text-2xl font-bold mb-4">Dashboard</h1>
                <p  className="z-10 relative">This is the Dashboard page. It will eventually show your clipboard history.</p>
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    ease={80}
                    color={particleColor}
                    refresh
                />
            </div>
        </div>
    );
};

export default Page;