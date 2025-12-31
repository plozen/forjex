"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Login page should not have Dashboard layout
  if (pathname === '/admin/login') {
    return <main style={{ minHeight: '100vh', backgroundColor: 'var(--admin-bg)' }}>{children}</main>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--admin-bg)' }}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main style={{ flex: 1, padding: '24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
