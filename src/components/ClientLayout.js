// Create: src/components/ClientLayout.js
'use client';
import { useEffect } from 'react';

export default function ClientLayout({ children }) {
  useEffect(() => {
    console.log('Client-side layout logic');
  }, []);

  return <>{children}</>;
}