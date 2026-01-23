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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Remove credentials from URL (security)
                var urlParams = new URLSearchParams(window.location.search);
                if (urlParams.has('username') || urlParams.has('password')) {
                  urlParams.delete('username');
                  urlParams.delete('password');
                  var redirect = urlParams.get('redirect');
                  var newUrl = redirect 
                    ? window.location.pathname + '?redirect=' + encodeURIComponent(redirect)
                    : window.location.pathname;
                  window.history.replaceState({}, '', newUrl);
                }
                
                // Handle hash redirects
                var hash = window.location.hash;
                var pathname = window.location.pathname;
                if (hash && hash.length > 0 && pathname && pathname !== '/') {
                  window.location.replace('/' + hash);
                }
              })();
            `,
          }}
        />
        {children}
        <Script 
          src="https://unpkg.com/aos@next/dist/aos.js" 
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window !== 'undefined' && (window as any).AOS) {
              (window as any).AOS.init({ offset: 1 });
            }
          }}
        />
        <Script id="aos-fallback" strategy="afterInteractive">
          {`
            (function() {
              function initAOS() {
                if (typeof window !== 'undefined' && window.AOS && !window.AOS.initialized) {
                  try {
                    window.AOS.init({ offset: 1 });
                  } catch (e) {
                    console.error('AOS initialization error:', e);
                  }
                } else if (typeof window !== 'undefined' && !window.AOS) {
                  // Retry after a short delay if AOS is not yet available
                  setTimeout(initAOS, 50);
                }
              }
              // Start checking after a short delay to ensure AOS script has loaded
              setTimeout(initAOS, 200);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
