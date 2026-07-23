import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./lib/cart";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";

export const metadata: Metadata = {
  title: "Mr.Pet — интернет-магазин витаминов для собак",
  description: "Mr.Pet — многофункциональные витамины 5В1 для собак всех пород. Здоровые суставы, сердце, кишечник, кожа, печень.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
