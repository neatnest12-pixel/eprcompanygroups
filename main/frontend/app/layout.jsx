import "./globals.css";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
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
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display"
});

export const metadata = {
  title: "ERP Group Company | Richman Maker | Land Promoters in Chennai",
  description:
    "ERP Group Company presents Richman Maker, its land promoter brand in Chennai, helping buyers discover plots in Tambaram, Guduvanchery, Vandalur, and Chengalpattu with trusted guidance.",
  keywords: "ERP Group Company, Richman Maker, real estate, property buying, property selling, Chennai real estate"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfair.variable}`}>
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
