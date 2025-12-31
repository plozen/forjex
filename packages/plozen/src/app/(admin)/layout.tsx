import { Montserrat } from "next/font/google";
import "@/styles/main.scss";
import "@/styles/admin-theme.scss";
import { ThemeProvider } from "@/providers/theme-provider";
import { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PLOZEN Admin",
  description: "PLOZEN Administration Dashboard",
  robots: "noindex, nofollow", // Admin pages should not be indexed
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
       <head>
        <link 
          rel="stylesheet" 
          as="style" 
          crossOrigin="anonymous" 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css" 
        />
      </head>
      <body className={`${montserrat.variable} antialiased`} style={{ backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text)' }}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
