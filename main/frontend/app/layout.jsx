import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import MobileStickyBar from "../components/MobileStickyBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins"
});

export const metadata = {
  title: "EPR Group Company | Buy & Sell Properties | Real Estate Experts",
  description:
    "Find your dream property with EPR Group Company. Trusted real estate solutions, verified listings, and expert guidance.",
  keywords: "real estate, property buying, property selling, Chennai real estate"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-[var(--font-poppins)]">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileStickyBar />
      </body>
    </html>
  );
}
