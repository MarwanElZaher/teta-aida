import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import CartSidebar from "./components/CartSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-family-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-family-serif" });
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["600"], // SemiBold
  variable: "--font-noto-kufi"
});

export const metadata: Metadata = {
  title: "Teta-Aida | Authentic Egyptian Preserved Foods",
  description: "Handcrafted green olives, kronb, and pickles made with Teta Aida's secret recipes.",
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.variable} ${playfair.variable} ${notoKufiArabic.variable}`}>
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            {children}
            <CartSidebar />
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
