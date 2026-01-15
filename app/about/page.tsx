import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { BiCookie, BiCake, BiHeart, BiMapPin, BiRightArrowAlt } from "react-icons/bi";
import { FaFacebookF, FaLinkedin, FaInstagram } from "react-icons/fa";

export const revalidate = 60;

async function getCategories() {
  try {
    const products = await prisma.product.findMany({
      select: { variety: true },
      distinct: ["variety"],
    });
    return products.map((p) => p.variety).filter((v): v is string => v !== null);
  } catch (error) {
    return [];
  }
}

export default async function AboutPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(to right, #1b6e49, #34C759)" }}>
      <Header categories={categories} />
      
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-white"
        style={{
          background: "linear-gradient(to right, #1b6e49, #34C759)"
        }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div 
            className="text-center mb-12"
            style={{
              animation: "fadeInUp 0.6s ease-out both",
            }}
          >
            <div className="flex justify-center items-center gap-6 md:gap-8 mb-8">
              {/* Brand Logo with white background for green logo visibility */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full group-hover:bg-white/30 transition-all duration-300"></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-white/50 group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
                    <Image
                      src="/images/brand-logo.png"
                      alt="Ooty Baker & Confectioner Logo"
                      width={192}
                      height={192}
                      className="object-contain w-full h-full"
                      priority
                    />
                  </div>
                </div>
              </div>
              {/* Gimmie Logo with white background for green logo visibility */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full group-hover:bg-white/30 transition-all duration-300"></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-white/50 group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
                    <Image
                      src="/images/gimmie-logo.jpg"
                      alt="Gimmie Logo"
                      width={192}
                      height={192}
                      className="object-contain w-full h-full rounded-lg"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 uppercase tracking-tight">
              About Us
            </h1>
            <div className="w-32 h-1.5 bg-white/80 mx-auto rounded-full mb-6"></div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Where tradition meets taste and every bite tells a story
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(to right, #1b6e49, #34C759)"
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Introduction Card */}
          <div 
            className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl mb-12 border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-3xl"
            style={{
              animation: "fadeInUp 0.6s ease-out 0.2s both",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1.5 h-16 bg-gradient-to-b from-accent to-accent-dark rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-800">
                Ooty Baker & Confectioner
              </h2>
            </div>
            <div className="space-y-6 text-primary-700 text-lg leading-relaxed">
              <p>
                Welcome to Ooty Baker & Confectioner, where tradition meets taste and every bite tells a story of quality, care, and creativity. Located in the bustling area of Bommanahalli, Bengaluru, we are a proud local bakery that has built a reputation for excellence in both baked goods and confections.
              </p>
              <p>
                Our journey began with a simple idea — to bring joy to people&apos;s lives through delightful treats made with love and the finest ingredients. At Ooty Baker & Confectioner, we don&apos;t just bake; we craft experiences.
              </p>
            </div>
          </div>

          {/* What We Offer Section */}
          <div 
            className="mb-12"
            style={{
              animation: "fadeInUp 0.6s ease-out 0.4s both",
            }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 inline-block">
                What We Offer
              </h2>
              <div className="w-24 h-1.5 bg-white/80 mx-auto rounded-full"></div>
            </div>
            <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/30">
              <p className="text-primary-700 text-lg leading-relaxed mb-6">
                Our bakery is known for a wide range of delectable offerings — from fresh breads, buns, and classic pastries to custom-designed cakes for every celebration. Each product is prepared with utmost attention to detail, ensuring that our customers receive nothing but the best.
              </p>
              <p className="text-primary-700 text-lg leading-relaxed mb-8">
                But that&apos;s not all — we&apos;re also home to an irresistible variety of chocolates and confections that have won the hearts of sweet lovers across the city. We specialize in a colorful and exciting selection of:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 hover:border-accent/50 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                  <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-4 w-fit mb-4 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 shadow-md">
                    <BiCookie className="text-4xl text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-2">Jellies</h3>
                  <p className="text-primary-600 leading-relaxed">Soft, chewy, and bursting with fruity flavors</p>
                </div>
                
                <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 hover:border-accent/50 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                  <div className="bg-gradient-to-br from-primary-200/30 to-primary-200/20 rounded-xl p-4 w-fit mb-4 group-hover:from-primary-200/40 group-hover:to-primary-200/30 transition-all duration-300 shadow-md">
                    <BiCookie className="text-4xl text-primary-700" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-2">Candies</h3>
                  <p className="text-primary-600 leading-relaxed">Vibrant, classic favorites that bring a touch of nostalgia</p>
                </div>
                
                <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 hover:border-accent/50 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                  <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-4 w-fit mb-4 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 shadow-md">
                    <BiCake className="text-4xl text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-2">Coated Candies</h3>
                  <p className="text-primary-600 leading-relaxed">Crunchy on the outside and rich inside, available in a range of tempting flavors</p>
                </div>
              </div>
              
              <p className="text-primary-700 text-lg leading-relaxed mt-8">
                From tangy orange and zesty lemon to rich chocolate, caramel, and tropical fruit blends, our chocolate and candy collection is a treat for all ages. Whether you&apos;re shopping for a special gift, planning a party, or simply indulging your sweet tooth, Ooty Baker & Confectioner offers something for everyone.
              </p>
            </div>
          </div>

          {/* Our Promise Section */}
          <div 
            className="mb-12"
            style={{
              animation: "fadeInUp 0.6s ease-out 0.6s both",
            }}
          >
            <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/30">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl p-5 shadow-lg">
                  <BiHeart className="text-5xl text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-12 bg-gradient-to-b from-accent to-accent-dark rounded-full"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-800">
                      Our Promise
                    </h2>
                  </div>
                  <p className="text-primary-700 text-lg leading-relaxed mb-4">
                    Led by <strong className="text-accent">Venkat Ram</strong>, our dedicated team brings passion, innovation, and a commitment to customer satisfaction to everything we do. Every item that leaves our kitchen reflects our promise to deliver freshness, flavor, and a little bit of magic.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div 
            className="mb-12"
            style={{
              animation: "fadeInUp 0.6s ease-out 0.8s both",
            }}
          >
            <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/30">
              <div className="flex items-start gap-6 mb-6">
                <div className="bg-gradient-to-br from-primary-200/30 to-primary-200/20 rounded-2xl p-5 shadow-lg">
                  <BiMapPin className="text-5xl text-primary-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-12 bg-gradient-to-b from-accent to-accent-dark rounded-full"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-800">
                      Visit Us
                    </h2>
                  </div>
                  <p className="text-primary-700 text-lg leading-relaxed mb-4">
                    2nd Floor, No. 40, Muniswamappa Layout, 1st Cross, Hosur Road, Bommanahalli, Bengaluru – 560068, Karnataka, India.
                  </p>
                  <Link
                    href="https://maps.app.goo.gl/xD9Kz6y9CXBGqBQC9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-accent to-accent-dark text-white px-6 py-3 rounded-xl hover:from-accent-dark hover:to-accent transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span>View on Google Maps</span>
                    <BiRightArrowAlt className="text-xl" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & CTA */}
          <div 
            className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/30 text-center"
            style={{
              animation: "fadeInUp 0.6s ease-out 1s both",
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6">
              We&apos;re always delighted to welcome you!
            </h3>
            <p className="text-primary-600 text-lg mb-8">
              Follow us on social media to stay updated with our latest offerings and special treats.
            </p>
            <div className="flex items-center justify-center gap-6">
              <a 
                href="https://www.facebook.com/people/Ooty-Baker-Confectioner/100065324206767/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-primary-700 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-white/50"
              >
                <FaFacebookF className="text-2xl" />
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn"
                className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-primary-700 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-white/50"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a 
                href="https://www.instagram.com/ootybakerandconfectioner/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-primary-700 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-white/50"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
