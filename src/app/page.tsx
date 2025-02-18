// src/app/dashboard/page.tsx
import React from 'react';
import { Header } from '@/components/layout/Header';

const Page = () => {
  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>This is the Dashboard page. It will eventually show your clipboard history.</p>
      </div>
    </div>
  );
};

export default Page;