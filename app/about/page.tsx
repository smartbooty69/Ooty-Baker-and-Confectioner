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
    <main className="min-h-screen" style={{ 
      background: "#F9F7F2" // Warm Cream
    }}>
      <Header categories={categories} />
      
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: "#F9F7F2" // Warm Cream
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
                <div className="absolute inset-0 bg-heading/10 blur-2xl rounded-full group-hover:bg-heading/15 transition-all duration-300"></div>
                <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-lg border-2 border-heading/20 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
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
                <div className="absolute inset-0 bg-heading/10 blur-2xl rounded-full group-hover:bg-heading/15 transition-all duration-300"></div>
                <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-lg border-2 border-heading/20 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading mb-4 uppercase tracking-tight">
              About Us
            </h1>
            <div className="w-32 h-1.5 bg-heading/60 mx-auto rounded-full mb-6"></div>
            <p className="text-xl md:text-2xl text-body/80 max-w-3xl mx-auto">
              Where tradition meets taste and every bite tells a story
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{
          background: "#F9F7F2" // Warm Cream
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Introduction Card */}
          <div 
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12 border-2 border-heading/10 hover:border-heading/30 transition-all duration-300 hover:shadow-xl"
            style={{
              animation: "fadeInUp 0.6s ease-out 0.2s both",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1.5 h-16 bg-gradient-to-b from-primary to-heading rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-heading">
                Ooty Baker & Confectioner
              </h2>
            </div>
            <div className="space-y-6 text-body text-lg leading-relaxed">
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
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-3 inline-block">
                What We Offer
              </h2>
              <div className="w-24 h-1.5 bg-heading/60 mx-auto rounded-full"></div>
            </div>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-heading/10">
              <p className="text-body text-lg leading-relaxed mb-6">
                Our bakery is known for a wide range of delectable offerings — from fresh breads, buns, and classic pastries to custom-designed cakes for every celebration. Each product is prepared with utmost attention to detail, ensuring that our customers receive nothing but the best.
              </p>
              <p className="text-body text-lg leading-relaxed mb-8">
                But that&apos;s not all — we&apos;re also home to an irresistible variety of chocolates and confections that have won the hearts of sweet lovers across the city. We specialize in a colorful and exciting selection of:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 border-2 border-heading/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group hover:scale-105">
                  <div className="bg-primary/10 rounded-xl p-4 w-fit mb-4 group-hover:bg-primary/20 transition-all duration-300 shadow-md">
                    <BiCookie className="text-4xl text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-2">Jellies</h3>
                  <p className="text-body/80 leading-relaxed">Soft, chewy, and bursting with fruity flavors</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 border-2 border-heading/10 hover:border-secondary/30 hover:shadow-lg transition-all duration-300 group hover:scale-105">
                  <div className="bg-secondary/10 rounded-xl p-4 w-fit mb-4 group-hover:bg-secondary/20 transition-all duration-300 shadow-md">
                    <BiCookie className="text-4xl text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-2">Candies</h3>
                  <p className="text-body/80 leading-relaxed">Vibrant, classic favorites that bring a touch of nostalgia</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 border-2 border-heading/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group hover:scale-105">
                  <div className="bg-primary/10 rounded-xl p-4 w-fit mb-4 group-hover:bg-primary/20 transition-all duration-300 shadow-md">
                    <BiCake className="text-4xl text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-2">Coated Candies</h3>
                  <p className="text-body/80 leading-relaxed">Crunchy on the outside and rich inside, available in a range of tempting flavors</p>
                </div>
              </div>
              
              <p className="text-body text-lg leading-relaxed mt-8">
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
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-heading/10">
              <div className="flex items-start gap-6">
                <div className="bg-primary/10 rounded-2xl p-5 shadow-md">
                  <BiHeart className="text-5xl text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-12 bg-gradient-to-b from-primary to-heading rounded-full"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-heading">
                      Our Promise
                    </h2>
                  </div>
                  <p className="text-body text-lg leading-relaxed mb-4">
                    Led by <strong className="text-primary">Venkat Ram</strong>, our dedicated team brings passion, innovation, and a commitment to customer satisfaction to everything we do. Every item that leaves our kitchen reflects our promise to deliver freshness, flavor, and a little bit of magic.
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
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-heading/10">
              <div className="flex items-start gap-6 mb-6">
                <div className="bg-secondary/10 rounded-2xl p-5 shadow-md">
                  <BiMapPin className="text-5xl text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-12 bg-gradient-to-b from-primary to-heading rounded-full"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-heading">
                      Visit Us
                    </h2>
                  </div>
                  <p className="text-body text-lg leading-relaxed mb-4">
                    2nd Floor, No. 40, Muniswamappa Layout, 1st Cross, Hosur Road, Bommanahalli, Bengaluru – 560068, Karnataka, India.
                  </p>
                  <Link
                    href="https://maps.app.goo.gl/xD9Kz6y9CXBGqBQC9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 bg-primary text-white px-6 py-3 rounded-xl hover:bg-[#007f4d] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
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
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-heading/10 text-center"
            style={{
              animation: "fadeInUp 0.6s ease-out 1s both",
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-heading mb-6">
              We&apos;re always delighted to welcome you!
            </h3>
            <p className="text-body/80 text-lg mb-8">
              Follow us on social media to stay updated with our latest offerings and special treats.
            </p>
            <div className="flex items-center justify-center gap-6">
              <a 
                href="https://www.facebook.com/people/Ooty-Baker-Confectioner/100065324206767/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-body hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border-2 border-heading/20"
              >
                <FaFacebookF className="text-2xl" />
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn"
                className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-body hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border-2 border-heading/20"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a 
                href="https://www.instagram.com/ootybakerandconfectioner/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-body hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border-2 border-heading/20"
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
