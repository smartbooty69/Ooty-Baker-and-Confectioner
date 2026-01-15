import Link from "next/link";
import { 
  BiPackage, 
  BiCalendarCheck, 
  BiGroup, 
  BiCheckCircle, 
  BiStore, 
  BiHeart,
  BiRightArrowAlt 
} from "react-icons/bi";
import { FaFacebookF, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(to right, #1b6e49, #34C759)"
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div 
          className="text-center mb-16"
          style={{
            animation: "fadeInUp 0.6s ease-out both",
          }}
        >
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/30">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  About Us
                </h2>
              </div>
            </div>
          </div>
          <div className="w-32 h-1.5 bg-white/90 mx-auto rounded-full mb-4"></div>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Where tradition meets taste and every bite tells a story
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div 
            className="space-y-6"
            style={{
              animation: "fadeInUp 0.6s ease-out 0.2s both",
            }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-white/30 hover:border-white/50 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-accent to-accent-dark rounded-full"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary-800">
                  Ooty Baker & Confectioner
                </h3>
              </div>
              <p className="text-primary-700 text-lg leading-relaxed mb-6">
                Welcome to Ooty Baker & Confectioner, where tradition meets taste and every bite tells a story of quality, care, and creativity. Located in the bustling area of Bommanahalli, Bengaluru, we are a proud local bakery that has built a reputation for excellence in both baked goods and confections.
              </p>
              <p className="text-primary-600 leading-relaxed">
                Our journey began with a simple idea — to bring joy to people&apos;s lives through delightful treats made with love and the finest ingredients. At Ooty Baker & Confectioner, we don&apos;t just bake; we craft experiences.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/30 hover:border-accent/50 hover:scale-105 group">
                <div className="bg-accent/10 rounded-full p-3 w-fit mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                  <BiPackage className="text-3xl text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">100+</div>
                <div className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Products</div>
              </div>
              <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/30 hover:border-accent/50 hover:scale-105 group">
                <div className="bg-accent/10 rounded-full p-3 w-fit mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                  <BiCalendarCheck className="text-3xl text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">15+</div>
                <div className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Years</div>
              </div>
              <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/30 hover:border-accent/50 hover:scale-105 group">
                <div className="bg-accent/10 rounded-full p-3 w-fit mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                  <BiGroup className="text-3xl text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">1000+</div>
                <div className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Customers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Features */}
          <div 
            className="space-y-4"
            style={{
              animation: "fadeInUp 0.6s ease-out 0.4s both",
            }}
          >
            <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/30 hover:border-accent/50 hover:scale-[1.02] group">
              <div className="flex items-start gap-5">
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-4 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 shadow-md">
                  <BiCheckCircle className="text-3xl text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-primary-800 mb-2">Fresh & Quality</h4>
                  <p className="text-primary-600 leading-relaxed">Every product is prepared with utmost attention to detail, ensuring freshness and quality.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/30 hover:border-accent/50 hover:scale-[1.02] group">
              <div className="flex items-start gap-5">
                <div className="bg-gradient-to-br from-primary-200/30 to-primary-200/20 rounded-xl p-4 group-hover:from-primary-200/40 group-hover:to-primary-200/30 transition-all duration-300 shadow-md">
                  <BiStore className="text-3xl text-primary-700" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-primary-800 mb-2">Wide Variety</h4>
                  <p className="text-primary-600 leading-relaxed">From fresh breads to custom cakes, jellies, candies, and confections.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/30 hover:border-accent/50 hover:scale-[1.02] group">
              <div className="flex items-start gap-5">
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-4 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 shadow-md">
                  <BiHeart className="text-3xl text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-primary-800 mb-2">Made with Love</h4>
                  <p className="text-primary-600 leading-relaxed">Every item reflects our promise to deliver freshness, flavor, and a little bit of magic.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & CTA */}
        <div 
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-white/30"
          style={{
            animation: "fadeInUp 0.6s ease-out 0.6s both",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="text-primary-700 font-bold text-lg">Follow Us:</span>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/people/Ooty-Baker-Confectioner/100065324206767/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-700 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-white/50"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="#"
                className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-700 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-white/50"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://www.instagram.com/ootybakerandconfectioner/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-700 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-white/50"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-dark text-white px-8 py-4 rounded-xl hover:from-accent-dark hover:to-accent transition-all duration-300 font-bold hover:scale-105 shadow-lg hover:shadow-xl border-2 border-white/30"
          >
            <span>Know More</span>
            <BiRightArrowAlt className="text-xl" />
          </Link>
        </div>
      </div>
    </section>
  );
}
