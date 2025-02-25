"use client";

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { useTheme } from "next-themes";
import { Particles } from "@/components/magicui/particles";
import { db } from '@/lib/firebaseConfig';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import { Copy, Trash } from 'lucide-react';
import { linkifyText } from '@/lib/LinkifyText';

interface ClipboardItem {
    id: string;
    createdAt: Timestamp;
    text: string;
    hashedText: string;
    deviceName?: string;
}

const Page = () => {
    const { resolvedTheme } = useTheme();
    const [particleColor, setParticleColor] = useState("#ffffff");
    const [clipboardItems, setClipboardItems] = useState<ClipboardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            setError(null);
            const clipboardsCollectionRef = collection(db, 'clipboards');
            const q = query(clipboardsCollectionRef, orderBy("createdAt", "desc"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const clipboardData: ClipboardItem[] = [];
                snapshot.forEach((doc) => {
                    clipboardData.push({
                        id: doc.id,
                        createdAt: doc.data().createdAt,
                        text: doc.data().text,
                        hashedText: doc.data().hashedText,
                        deviceName: doc.data().deviceName,
                    });
                });
                setClipboardItems(clipboardData);
                setLoading(false);
            }, (fetchError) => {
                setError(fetchError);
                console.error("Error fetching data:", fetchError);
                setLoading(false);
            });

            return () => unsubscribe();
        };

        fetchData();
    }, []);

    useEffect(() => {
        setParticleColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!");
        }).catch((error) => {
            console.error("Failed to copy:", error);
        });
    };

    const handleDelete = async (id: string) => {
        try {
            const docRef = doc(db, 'clipboards', id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    const formatDate = (timestamp: Timestamp) => {
        try {
            if (!timestamp) return "Invalid Date";
            const date = timestamp.toDate();
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
            <div className="relative container mx-auto p-4 pb-20 sm:p-6 lg:p-8">
                <h1 className="z-10 relative text-2xl font-bold mb-4">Dashboard</h1>

                {loading && <p>Loading clipboard data...</p>}
                {error && <p>Error: {error.message}</p>}

                {!loading && !error && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Clipboard History</h2>
                        {clipboardItems.length === 0 ? (
                            <p>No data found.</p>
                        ) : (
                            <>
                                {/* Table for larger screens */}
                                <div className="hidden sm:block overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 border shadow-md">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    No.
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Created At
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Content
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {clipboardItems.map((item, index) => (
                                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm sm:text-base">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm sm:text-base">
                                                        {formatDate(item.createdAt)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm sm:text-base">
                                                        {linkifyText(item.text)}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <Button variant="outline" size="icon" onClick={() => handleCopy(item.text)}>
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)} className="ml-2">
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Cards for smaller screens */}
                                <div className="block sm:hidden space-y-4">
                                    {clipboardItems.map((item, index) => (
                                        <div key={item.id} className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <span className="font-semibold text-sm">No. {index + 1}</span>
                                                    <p className="text-xs text-gray-600 mt-1">{formatDate(item.createdAt)}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="icon" onClick={() => handleCopy(item.text)}>
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-800">{linkifyText(item.text)}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;