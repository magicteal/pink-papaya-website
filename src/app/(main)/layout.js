"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion";
import { usePathname } from "next/navigation";
import WhiteNavbar from "@/components/WhiteNavbar";
import BlackNavbar from "@/components/BlackNavbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const scope = useRef(null);

  // Use WhiteNavbar for "/" and "/stays", BlackNavbar for all other routes
  const useWhiteNavbar = pathname === "/" || pathname === "/stays";

  useEffect(() => {
    if (!scope.current) return;
    const animation = animate(
      scope.current,
      { opacity: [0, 1], transform: ["translateY(8px)", "translateY(0px)"] },
      { duration: 0.6, easing: "ease-in-out" }
    );
    return () => animation?.cancel?.();
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      {useWhiteNavbar ? <WhiteNavbar /> : <BlackNavbar />}
      {/* Content renders without global top padding so the hero can sit under the fixed navbar */}
      <main ref={scope} key={pathname}>
        {children}
      </main>
      {/* footer */}
      <Footer />
    </div>
  );
}
