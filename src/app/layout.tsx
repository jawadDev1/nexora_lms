import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "@/modules/auth/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nexora LMS",
  description: "Learn by doing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased bg-bg text-white `}>
        <NextTopLoader
          color="#FFDE00"
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Toaster closeButton={true} richColors={true} position="top-right" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
