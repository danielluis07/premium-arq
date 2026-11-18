import type { Metadata } from "next";
import "./globals.css";
import { figtree } from "@/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { IntroLoader } from "@/components/motion/intro-loader";
import { MOTION_BOOT_SCRIPT } from "@/lib/motion";

export const metadata: Metadata = {
  title: "premium.arq — arquitetura bem pensada",
  description:
    "Estúdio de arquitetura, interiores e paisagismo com escritórios em São Paulo, Curitiba e Cunha. Projetos que começam no terreno e vão até a obra.",
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
      </body>
    </html>
  );
}
