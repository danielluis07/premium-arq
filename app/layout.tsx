import type { Metadata } from "next";
import "./globals.css";
import { figtree } from "@/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { IntroLoader } from "@/components/motion/intro-loader";
import { Cursor } from "@/components/motion/cursor";
import { MOTION_BOOT_SCRIPT } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Lorem ipsum — dolor sit amet",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The boot script sets data-js / data-intro on <html> before hydration.
    <html
      lang="pt-BR"
      className={`${figtree.variable} h-full antialiased`}
      suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <IntroLoader />
        {children}
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
