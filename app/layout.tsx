import type { Metadata } from "next";
import { Inter, Roboto, Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto" 
});
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins" 
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "Ooty Baker & Confectioner - Premium Bakery in Bengaluru",
  description: "Welcome to Ooty Baker & Confectioner, your premium bakery in Bommanahalli, Bengaluru. We offer handcrafted Jelly, Candy, and Coated Candy made with love and finest ingredients.",
  keywords: "Ooty Baker, Confectioner, Bakery, Bengaluru, Bommanahalli, Jelly, Candy, Coated Candy, Premium Bakery",
  authors: [{ name: "Ooty Baker & Confectioner" }],
  openGraph: {
    type: "website",
    url: "https://ootybaker.com/",
    title: "Ooty Baker & Confectioner - Premium Bakery in Bengaluru",
    description: "Welcome to Ooty Baker & Confectioner, your premium bakery in Bommanahalli, Bengaluru.",
    images: ["/images/brand-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ooty Baker & Confectioner - Premium Bakery in Bengaluru",
    description: "Welcome to Ooty Baker & Confectioner, your premium bakery in Bommanahalli, Bengaluru.",
    images: ["/images/brand-logo.png"],
  },
  icons: {
    icon: "/images/brand-logo.png",
    apple: "/images/brand-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <Script id="hash-redirect" strategy="beforeInteractive">
          {`
            (function() {
              if (typeof window !== 'undefined') {
                var hash = window.location.hash;
                var pathname = window.location.pathname;
                if (hash && pathname !== '/') {
                  window.location.replace('https://ooty-baker-and-confectioner.vercel.app' + hash);
                }
              }
            })();
          `}
        </Script>
        {children}
        <Script src="https://unpkg.com/aos@next/dist/aos.js" strategy="afterInteractive" />
        <Script id="aos-init" strategy="afterInteractive">
          {`AOS.init({ offset: 1 });`}
        </Script>
      </body>
    </html>
  );
}
