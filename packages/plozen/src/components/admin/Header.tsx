"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/atomic/ThemeToggle/ThemeToggle";
import { Menu } from "lucide-react";
import styles from "./Header.module.scss";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  
  const getPageTitle = (path: string) => {
    if (path === '/admin') return 'Dashboard';
    if (path.startsWith('/admin/quotes')) return 'Project Quotes';
    if (path.startsWith('/admin/inquiries')) return 'Inquiries';
    if (path.startsWith('/admin/settings')) return 'Settings';
    return 'Admin';
  };

  return (
    <header className={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Toggle Menu">
          <Menu size={24} />
        </button>
        <h1 className={styles.title}>{getPageTitle(pathname)}</h1>
      </div>
      <div className={styles.actions}>
        <ThemeToggle />
      </div>
    </header>
  );
}
