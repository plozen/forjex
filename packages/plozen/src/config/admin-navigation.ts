import { LayoutDashboard, FileText, MessageSquare, Settings, LogIn } from 'lucide-react';

export interface AdminNavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  matchPath: string;
}

export const adminNavigation: AdminNavItem[] = [
  {
    title: '대시보드',
    href: '/admin',
    icon: LayoutDashboard,
    matchPath: '/admin',
  },
  {
    title: '프로젝트 의뢰',
    href: '/admin/quotes',
    icon: FileText,
    matchPath: '/admin/quotes',
  },
  {
    title: '일반 문의',
    href: '/admin/inquiries',
    icon: MessageSquare,
    matchPath: '/admin/inquiries',
  },
  {
    title: '설정',
    href: '/admin/settings',
    icon: Settings,
    matchPath: '/admin/settings',
  },
];
