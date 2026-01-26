import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import GlobalLoader from "@/components/GlobalLoader";
import { LoadingProvider } from "@/lib/loading-context";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vyan Abimanyu - Tour Guide",
  description: "Tour Guide",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className={`${montserrat.className} antialiased `}>
        <LoadingProvider>
          <GlobalLoader />
          <PageTransition>{children}</PageTransition>
        </LoadingProvider>
      </body>
    </html>
  );
}
