"use client"

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { useTheme } from "next-themes";
import { Particles } from "@/components/magicui/particles";
import { db } from '@/lib/firebaseConfig'; // Import Firebase Firestore database
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; // Import Firestore functions

interface ClipboardItem { // You can adjust this interface if needed to match Firestore data
    id: string; // Firestore document ID is a string
    createdAt: any; // Firestore Timestamp, keep as 'any' or refine type if needed
    text: string; // Changed 'content' to 'text' to match Firestore field name
    deviceName?: string; // Optional deviceName
}

const Page = () => {
    const { resolvedTheme } = useTheme();
    const [particleColor, setParticleColor] = useState("#ffffff");
    const [clipboardItems, setClipboardItems] = useState<ClipboardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = () => { // Remove async, onSnapshot handles real-time updates
            setLoading(true);
            setError(null);
            const clipboardsCollectionRef = collection(db, 'clipboards');
            const q = query(clipboardsCollectionRef, orderBy("createdAt", "desc"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const clipboardData: ClipboardItem[] = [];
                snapshot.forEach((doc) => {
                    clipboardData.push({
                        id: doc.id,
                        createdAt: doc.data().createdAt, // Access createdAt from doc.data()
                        text: doc.data().text,         // Access text (content) from doc.data() - assuming you stored as 'text' in Firestore
                        deviceName: doc.data().deviceName, // Access deviceName if available
                    });
                });
                setClipboardItems(clipboardData);
                setLoading(false);
            }, (fetchError) => {
                setError(fetchError);
                console.error("Error fetching data:", fetchError);
                setLoading(false);
            });

            return () => unsubscribe(); // Unsubscribe on unmount
        };

        fetchData();
    }, []);

    useEffect(() => {
        setParticleColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);


    // Helper function to format the timestamp (adjust for Firestore Timestamp if needed)
    const formatDate = (timestamp: any) => { // Expecting Firestore Timestamp or similar
        try {
            if (!timestamp) return "Invalid Date"; // Handle null or undefined timestamp
            const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short',
            };
            return date.toLocaleDateString(undefined, options);
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid Date";
        }
    };


    return (
        <div className="relative min-h-screen">
            <Header />
            <Particles
                className="absolute inset-0 -z-10"
                quantity={100}
                ease={80}
                color={particleColor}
                refresh
            />
            <div className="relative p-4">
                <h1 className="z-10 relative text-2xl font-bold mb-4">Dashboard</h1>
                <p className="z-10 relative">Lorem ipsum dolor sit amet</p>

                {loading && <p>Loading clipboard data...</p>}
                {error && <p>Error: {error.message}</p>}

                {!loading && !error && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Clipboard History</h2>
                        {clipboardItems.length === 0 ? (
                            <p>No data found.</p>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created At
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Content
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {clipboardItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatDate(item.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.text}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;