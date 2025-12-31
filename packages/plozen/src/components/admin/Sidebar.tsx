"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigation } from "@/config/admin-navigation";
import { LogOut } from "lucide-react";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.logo}>
          PLOZEN <span>ADMIN</span>
        </div>
        <nav className={styles.nav}>
          {adminNavigation.map((item) => {
             const isActive = item.matchPath === '/admin' 
               ? pathname === item.matchPath 
               : pathname.startsWith(item.matchPath);
             const Icon = item.icon;
             
             return (
               <Link 
                 key={item.href} 
                 href={item.href}
                 className={`${styles.link} ${isActive ? styles.active : ''}`}
                 onClick={onClose}
               >
                 <Icon className={styles.icon} size={20} />
                 <span>{item.title}</span>
               </Link>
             );
          })}
        </nav>
        <div className={styles.footer}>
          <button className={styles.logoutBtn}>
            <LogOut className={styles.icon} size={20} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          onClick={onClose}
        />
      )}
    </>
  );
}
