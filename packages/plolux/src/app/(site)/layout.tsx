import Link from "next/link";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 items-center">
             {/* Header Placeholder - will be implemented with design data */}
             <div className="mr-4 hidden md:flex">
               <Link className="mr-6 flex items-center space-x-2" href="/">
                 <span className="hidden font-bold sm:inline-block">PLOLUX</span>
               </Link>
            </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:py-0">
          {/* Footer Placeholder */}
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 PLOLUX. All rights reserved.
            </p>
          </div>
      </footer>
    </div>
  );
}
