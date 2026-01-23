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
import ScrollAnimation from "./ScrollAnimation";

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: "#F9F7F2" // Warm Cream
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <ScrollAnimation direction="up" delay={0}>
          <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full"></div>
              <div className="relative bg-white backdrop-blur-sm rounded-full px-8 py-4 border-2 border-heading/20 shadow-lg">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-2">
                  About Us
                </h2>
              </div>
            </div>
          </div>
          <div className="w-32 h-1.5 bg-heading/60 mx-auto rounded-full mb-4"></div>
          <p className="text-xl md:text-2xl text-body/80 max-w-2xl mx-auto">
            Where tradition meets taste and every bite tells a story
          </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <ScrollAnimation direction="up" delay={0.1}>
            <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-heading/10 hover:border-heading/30 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-primary to-heading rounded-full"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-heading">
                  Ooty Baker & Confectioner
                </h3>
              </div>
              <p className="text-body text-lg leading-relaxed mb-6">
                Welcome to Ooty Baker & Confectioner, where tradition meets taste and every bite tells a story of quality, care, and creativity. Located in the bustling area of Bommanahalli, Bengaluru, we are a proud local bakery that has built a reputation for excellence in both baked goods and confections.
              </p>
              <p className="text-body/80 leading-relaxed">
                Our journey began with a simple idea — to bring joy to people&apos;s lives through delightful treats made with love and the finest ingredients. At Ooty Baker & Confectioner, we don&apos;t just bake; we craft experiences.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <ScrollAnimation direction="up" delay={0.1}>
                <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border-2 border-heading/10 hover:border-primary/30 hover:scale-105 group">
                  <div className="bg-primary/10 rounded-full p-3 w-fit mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <BiPackage className="text-3xl text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-heading mb-1">100+</div>
                  <div className="text-sm font-semibold text-body/70 uppercase tracking-wider">Products</div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={0.15}>
                <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border-2 border-heading/10 hover:border-primary/30 hover:scale-105 group">
                  <div className="bg-primary/10 rounded-full p-3 w-fit mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <BiCalendarCheck className="text-3xl text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-heading mb-1">15+</div>
                  <div className="text-sm font-semibold text-body/70 uppercase tracking-wider">Years</div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={0.2}>
                <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border-2 border-heading/10 hover:border-primary/30 hover:scale-105 group">
                  <div className="bg-primary/10 rounded-full p-3 w-fit mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <BiGroup className="text-3xl text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-heading mb-1">1000+</div>
                  <div className="text-sm font-semibold text-body/70 uppercase tracking-wider">Customers</div>
                </div>
              </ScrollAnimation>
            </div>
            </div>
          </ScrollAnimation>

          {/* Right Content - Features */}
          <div className="space-y-4">
            <ScrollAnimation direction="left" delay={0.2}>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-heading/10 hover:border-primary/30 hover:scale-[1.02] group">
                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 rounded-xl p-4 group-hover:bg-primary/20 transition-all duration-300 shadow-md">
                    <BiCheckCircle className="text-3xl text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-heading mb-2">Fresh & Quality</h4>
                    <p className="text-body/80 leading-relaxed">Every product is prepared with utmost attention to detail, ensuring freshness and quality.</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="left" delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-heading/10 hover:border-primary/30 hover:scale-[1.02] group">
                <div className="flex items-start gap-5">
                  <div className="bg-secondary/10 rounded-xl p-4 group-hover:bg-secondary/20 transition-all duration-300 shadow-md">
                    <BiStore className="text-3xl text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-heading mb-2">Wide Variety</h4>
                    <p className="text-body/80 leading-relaxed">From fresh breads to custom cakes, jellies, candies, and confections.</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="left" delay={0.4}>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-heading/10 hover:border-primary/30 hover:scale-[1.02] group">
                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 rounded-xl p-4 group-hover:bg-primary/20 transition-all duration-300 shadow-md">
                    <BiHeart className="text-3xl text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-heading mb-2">Made with Love</h4>
                    <p className="text-body/80 leading-relaxed">Every item reflects our promise to deliver freshness, flavor, and a little bit of magic.</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>

        {/* Social Media & CTA */}
        <ScrollAnimation direction="up" delay={0.3}>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white rounded-3xl p-8 md:p-10 shadow-lg border-2 border-heading/10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="text-body font-bold text-lg">Follow Us:</span>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/people/Ooty-Baker-Confectioner/100065324206767/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-body hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border-2 border-heading/20"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="#"
                className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-body hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border-2 border-heading/20"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://www.instagram.com/ootybakerandconfectioner/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-body hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border-2 border-heading/20"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl hover:bg-[#007f4d] transition-all duration-300 font-bold hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Know More</span>
            <BiRightArrowAlt className="text-xl" />
          </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
