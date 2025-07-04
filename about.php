<?php
// =============================================
// START: Database Connection and Data Fetching
// =============================================
require_once 'connection.php';

// Fetch unique categories from products table
$sql = "SELECT DISTINCT variety FROM products ORDER BY variety";
$result = $conn->query($sql);
$categories = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row['variety'];
    }
}
// =============================================
// END: Database Connection and Data Fetching
// =============================================
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Us - Ooty Baker & Confectioner | Premium Bakery in Bengaluru</title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="About Us - Ooty Baker & Confectioner | Premium Bakery in Bengaluru">
    <meta name="description" content="Discover the story of Ooty Baker & Confectioner, a premium bakery in Bommanahalli, Bengaluru. Learn about our journey, our commitment to quality, and our wide range of delectable offerings including fresh breads, pastries, jellies, candies, and more.">
    <meta name="keywords" content="Ooty Baker, Confectioner, Bakery Bengaluru, About Us, Bommanahalli, Fresh Bread, Pastries, Jellies, Candies, Coated Candies">
    <meta name="author" content="Ooty Baker & Confectioner">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ootybaker.com/about.php">
    <meta property="og:title" content="About Us - Ooty Baker & Confectioner | Premium Bakery in Bengaluru">
    <meta property="og:description" content="Discover the story of Ooty Baker & Confectioner, a premium bakery in Bommanahalli, Bengaluru. Learn about our journey, our commitment to quality, and our wide range of delectable offerings.">
    <meta property="og:image" content="images/brand-logo.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://ootybaker.com/about.php">
    <meta property="twitter:title" content="About Us - Ooty Baker & Confectioner | Premium Bakery in Bengaluru">
    <meta property="twitter:description" content="Discover the story of Ooty Baker & Confectioner, a premium bakery in Bommanahalli, Bengaluru. Learn about our journey, our commitment to quality, and our wide range of delectable offerings.">
    <meta property="twitter:image" content="images/brand-logo.png">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="images/brand-logo.png">
    <link rel="apple-touch-icon" href="images/brand-logo.png">
    
    <!-- External CSS Files -->
    <link rel="stylesheet" href="styles.css" />
    <!-- Box Icons Library -->
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"/>
    <!-- Remix Icons Library -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet"/>
    <!-- Google Fonts: Roboto -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
    <!-- AOS Animation Library -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    
    <!-- Custom styles for about page logos and heading -->
    <style>
      .about-page-logos {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
      }
      
      .about-page-logo-wrapper {
        display: flex;
        align-items: center;
        gap: 40px;
      }
      
      .about-page-logo {
        width: 240px !important;
        height: 240px !important;
        max-width: 240px !important;
        max-height: 240px !important;
        object-fit: contain;
      }

      .about-content-box2 h1 {
        font-size: 3.5em !important;
        font-weight: 700 !important;
        letter-spacing: 0.1em !important;
        margin-bottom: 30px !important;
        color: #333 !important;
        text-transform: uppercase !important;
      }
      
      @media (max-width: 600px) {
        .about-page-logo-wrapper {
          gap: 30px;
        }
        
        .about-page-logo {
          width: 120px !important;
          height: 120px !important;
          max-width: 120px !important;
          max-height: 120px !important;
        }

        .about-content-box2 h1 {
          font-size: 2.5em !important;
          margin-bottom: 20px !important;
        }
      }
    </style>
  </head>
  <body>
    <!-- =============================================
         START: Header Section
         Navigation and branding
         ============================================= -->
    <header class="gimme-main-header">
        <a href="index.php" class="gimme-logo-link">
            <div class="gimme-logo-container">
                <div class="gimme-logo-images">
                    <img src="images/brand-logo.png" alt="Brand Logo" class="brand-logo">
                    <img src="images/gimmie-logo.jpg" alt="Gimmie Logo" class="gimmie-logo">
                </div>
            </div>
        </a>

        <nav class="gimme-nav-desktop">
            <div class="nav-item-dropdown-container">
                <a href="index.php#products" class="nav-desktop-link" id="desktopProductsToggle" aria-haspopup="true" aria-expanded="false">Products +</a>
                <div class="dropdown-menu-desktop" id="desktopProductsDropdown" aria-labelledby="desktopProductsToggle">
                    <?php foreach ($categories as $category): ?>
                        <a href="product-page.php?category=<?= urlencode($category) ?>"><?= htmlspecialchars($category) ?></a>
                    <?php endforeach; ?>
                </div>
            </div>
            <a href="about.php">About Us</a>
            <a href="index.php#contact">Inquiry</a>
            <button class="gimme-get-started-btn-desktop" onclick="window.location.href='auth.php'">
                <span>Login</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 5L16 12L9 19"/>
                </svg>
            </button>
        </nav>

        <button class="gimme-menu-toggle" id="menuToggle">MENU</button>
    </header>

    <div class="gimme-mobile-sidebar" id="mobileSidebar">
        <div class="gimme-sidebar-header">
            <button class="gimme-sidebar-close-btn" id="sidebarClose">CLOSE</button>
        </div>
        <nav class="gimme-sidebar-nav">
            <div class="sidebar-nav-item-dropdown">
                <div class="sidebar-nav-toggle" id="mobileProductsToggle">
                    <span>PRODUCTS</span>
                    <span class="icon" id="mobileProductsIcon">+</span>
                </div>
                <ul class="mobile-submenu" id="mobileProductsSubmenu">
                    <?php foreach ($categories as $category): ?>
                        <li><a href="product-page.php?category=<?= urlencode($category) ?>"><?= htmlspecialchars($category) ?> <span class="submenu-arrow">&nearrow;</span></a></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <div class="gimme-sidebar-nav-item">
                <a href="about.php">ABOUT US</a>
                <span class="icon">&nearrow;</span>
            </div>
            <div class="gimme-sidebar-nav-item">
                <a href="index.php#contact">INQUIRY</a>
                <span class="icon">&nearrow;</span>
            </div>
        </nav>
    </div>

    <div class="gimme-overlay" id="sidebarOverlay"></div>
    <!-- =============================================
         END: Header Section
         ============================================= -->

    <section class="about-section-wrapper2">
      <div class="about-content-box2">
        <!-- Centered Logo Container -->
        <div class="about-page-logos">
          <div class="about-page-logo-wrapper">
            <img src="images/gimmie2logo.png" alt="Brand Logo" class="about-page-logo">
          </div>
        </div>

        <h1>ABOUT US</h1>
        <b><p> Ooty Baker & Confectioner.</p></b>
        <p>Welcome to Ooty Baker & Confectioner, where tradition meets taste and every bite tells a story of quality, care, and creativity. Located in the bustling area of Bommanahalli, Bengaluru, we are a proud local bakery that has built a reputation for excellence in both baked goods and confections. Our journey began with a simple idea — to bring joy to people's lives through delightful treats made with love and the finest ingredients.
        At Ooty Baker & Confectioner, we don't just bake; we craft experiences. </p> 
        <p> bakery is known for a wide range of delectable offerings — from fresh breads, buns, and classic pastries to custom-designed cakes for every celebration. Each product is prepared with utmost attention to detail, ensuring that our customers receive nothing but the best.
        But that's not all — we're also home to an irresistible variety of chocolates and confections that have won the hearts of sweet lovers across the city. We specialize in a colorful and exciting selection of:
        </p>
        <p>Jellies – soft, chewy, and bursting with fruity flavors</p>
        <p>Candies – vibrant, classic favorites that bring a touch of nostalgia</p>
        <p>Coated Candies – crunchy on the outside and rich inside, available in a range of tempting flavors</p>
        <p>From tangy orange and zesty lemon to rich chocolate, caramel, and tropical fruit blends, our chocolate and candy collection is a treat for all ages. Whether you're shopping for a special gift, planning a party, or simply indulging your sweet tooth, Ooty Baker & Confectioner offers something for everyone.
        Led by Venkat Ram, our dedicated team brings passion, innovation, and a commitment to customer satisfaction to everything we do. Every item that leaves our kitchen reflects our promise to deliver freshness, flavor, and a little bit of magic.
        Come visit us at:</p>

        <p>2nd Floor, No. 40, Muniswamappa Layout, 1st Cross, Hosur Road, Bommanahalli, Bengaluru – 560068, Karnataka, India.</p>
        <h3><p><center>We're always delighted to welcome you!</center></p></h3>

        <div class="social-icons">
          <a href="https://www.facebook.com/people/Ooty-Baker-Confectioner/100065324206767/" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
          <a href="https://www.instagram.com/ootybakerandconfectioner/" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </section>
  
    <!-- =============================================
         START: Footer Section
         Contact info and social links
         ============================================= -->
    <footer class="gimme-site-footer">
        <div class="gimme-footer-top">
            <nav class="gimme-footer-nav">
                <ul class="gimme-nav-desktop">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="about.php">About</a></li>
                    <li><a href="index.php#products">Products</a></li>
                    <li><a href="index.php#inquiry">Inquiry</a></li>
                </ul>
            </nav>
        </div>

        <div class="gimme-footer-middle">
            <div class="gimme-contact-info-section">
                <h3 class="gimme-section-title">Contact Us</h3>
                <div class="gimme-contact-details">
                    <a href="https://maps.app.goo.gl/xD9Kz6y9CXBGqBQC9" target="_blank" style="color: inherit; text-decoration: none;">
                        <div class="gimme-contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <p>Bommanahalli, Bengaluru<br>Karnataka, India</p>
                        </div>
                    </a>
                    <div class="gimme-contact-item">
                        <i class="fas fa-envelope"></i>
                        <p>info@ootybaker.com</p>
                    </div>
                    <div class="gimme-contact-item">
                        <i class="fas fa-phone"></i>
                        <p>08025731234</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="gimme-footer-bottom">
            <div class="gimme-social-media-section">
                <h3 class="gimme-section-title">Follow Us</h3>
                <div class="gimme-social-icons">
                    <a href="https://www.facebook.com/people/Ooty-Baker-Confectioner/100065324206767/" class="gimme-social-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="gimme-social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/ootybakerandconfectioner/" class="gimme-social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
            <p class="gimme-copyright">&copy; <?= date('Y') ?> Ooty Baker & Confectioner. All Rights Reserved.</p>
        </div>
    </footer>
    <!-- =============================================
         END: Footer Section
         ============================================= -->

    <!-- =============================================
         START: JavaScript and Animation Libraries
         ============================================= -->
    <script src="index.js"></script>
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
      AOS.init({
        offset: 1,
      });
    </script>
    <!-- =============================================
         END: JavaScript and Animation Libraries
         ============================================= -->
  </body>
</html> 