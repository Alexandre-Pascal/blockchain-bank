import RaimbowKitAndWagmiProvider from "./RaimbowKitAndWagmiProvider";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "BlockChain Bank",
  description: "Use the blockchain to store your money",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <RaimbowKitAndWagmiProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center">
              {children}
            </main>
            <Footer />
          </div>
        </RaimbowKitAndWagmiProvider>
      </body>
    </html>
  );
}
