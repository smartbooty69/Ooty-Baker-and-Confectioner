<?php
// =============================================
// START: Database Connection and Data Fetching
// =============================================
require_once 'connection.php';

// Fetch unique categories from products table
$cat_query = "SELECT DISTINCT variety FROM products ORDER BY variety";
$cat_result = $conn->query($cat_query);
$categories = [];
if ($cat_result) {
    while ($row = $cat_result->fetch_assoc()) {
        $categories[] = $row['variety'];
    }
}

$products_by_category = [];

foreach ($categories as $category) {
    $stmt = $conn->prepare("SELECT * FROM products WHERE variety = ?");
    $stmt->bind_param("s", $category);
    $stmt->execute();
    $result = $stmt->get_result();
    $products_by_category[$category] = $result->fetch_all(MYSQLI_ASSOC);
}
// =============================================
// END: Database Connection and Data Fetching
// =============================================
?>
<!DOCTYPE html>
<html lang="en">
  <!-- =============================================
       START: Head Section
       Meta tags, title, and resources
       ============================================= -->
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ooty Baker & Confectioner - Premium Bakery in Bengaluru</title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="Ooty Baker & Confectioner - Premium Bakery in Bengaluru">
    <meta name="description" content="Welcome to Ooty Baker & Confectioner, your premium bakery in Bommanahalli, Bengaluru. We offer handcrafted Jelly, Candy, and Coated Candy made with love and finest ingredients.">
    <meta name="keywords" content="Ooty Baker, Confectioner, Bakery, Bengaluru, Bommanahalli, Jelly, Candy, Coated Candy, Premium Bakery">
    <meta name="author" content="Ooty Baker & Confectioner">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ootybaker.com/">
    <meta property="og:title" content="Ooty Baker & Confectioner - Premium Bakery in Bengaluru">
    <meta property="og:description" content="Welcome to Ooty Baker & Confectioner, your premium bakery in Bommanahalli, Bengaluru. We offer handcrafted Jelly, Candy, and Coated Candy made with love and finest ingredients.">
    <meta property="og:image" content="images/brand-logo.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://ootybaker.com/">
    <meta property="twitter:title" content="Ooty Baker & Confectioner - Premium Bakery in Bengaluru">
    <meta property="twitter:description" content="Welcome to Ooty Baker & Confectioner, your premium bakery in Bommanahalli, Bengaluru. We offer handcrafted Jelly, Candy, and Coated Candy made with love and finest ingredients.">
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <link rel="stylesheet" href="button-57-styles.css" />
    <style>
        .custom-popup {
            display: none;
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .custom-popup.error {
            background-color: #f44336;
        }
    </style>
  </head>
  <!-- =============================================
       END: Head Section
       ============================================= -->

  <body>
    <!-- Custom Popup -->
    <div id="customPopup" class="custom-popup"></div>
    
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
                <a href="#products" class="nav-desktop-link" id="desktopProductsToggle" aria-haspopup="true" aria-expanded="false">Products +</a>
                <div class="dropdown-menu-desktop" id="desktopProductsDropdown" aria-labelledby="desktopProductsToggle">
                    <?php foreach ($categories as $category): ?>
                        <a href="product-page.php?category=<?= urlencode($category) ?>"><?= htmlspecialchars($category) ?></a>
                    <?php endforeach; ?>
                </div>
            </div>
            <a href="#about">About Us</a>
            <a href="#contact">Inquiry</a>
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
                <a href="#contact">INQUIRY</a>
                <span class="icon">&nearrow;</span>
            </div>
        </nav>
    </div>

    <div class="gimme-overlay" id="sidebarOverlay"></div>
    <!-- =============================================
         END: Header Section
         ============================================= -->

    <!-- =============================================
         START: Main Banner Section
         Image slider
         ============================================= -->
    <div class="slider">
      <div class="slides">
          <img src="images/Banne2.jpg" class="slide active" alt="Slider Image 1">
          <img src="images/banner3.jpg" class="slide" alt="Slider Image 2">
          <img src="images/Banne2.jpg" class="slide" alt="Slider Image 3">
      </div>
      <!-- Slider Navigation Buttons -->
      <div class="navigation">
          <button class="prev">&#10094;</button>
          <button class="next">&#10095;</button>
      </div>
    </div>
    <!-- =============================================
         END: Main Banner Section
         ============================================= -->
   

         <section class="about-section-wrapper" id="about">
            <div class="about-content-box">
                <h1>ABOUT US</h1>
                <p>About Ooty Baker & ConfectionerWelcome to Ooty Baker & Confectioner, where tradition meets taste and every bite tells a story of quality, care, and creativity. Located in the bustling area of Bommanahalli, Bengaluru, we are a proud local bakery that has built a reputation for excellence in both baked goods and confections. Our journey began with a simple idea — to bring joy to people's lives through delightful treats made with love and the finest ingredients.</p>
                <div class="social-icons">
                    <a href="https://www.facebook.com/people/Ooty-Baker-Confectioner/100065324206767/" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Twitter"><i class="fab fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/ootybakerandconfectioner/" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                </div>
                <a href="about.php" class="btn">Know More</a>

            </div>
        </section>
  
    <!-- =============================================
         START: Products Section
         Category-wise product display
         ============================================= -->
        <div class="section__data" id="products">
            <div class="section__titles">
                <h1 class="section__title">PRODUCTS</h1>
                <h1 class="section__title-border">collection</h1>
            </div>
        </div>
    <?php foreach ($products_by_category as $category => $products): ?>
      <div class="product-section" data-aos="fade-up">
          <div class="section-header two alt-two">
              <h1><?= strtoupper($category) ?>
                <span>Discover our premium collection of handcrafted <?= strtolower($category) ?> made with love and finest ingredients!</span>
              </h1>
          </div>
      </div>

          <div class="wrapper">
              <i class="fas fa-angle-left arrow-btn" data-direction="left" aria-label="Previous items"></i>
              <div class="carousel">
                  <?php foreach ($products as $product): ?>
                      <li class="card__article">
                          <div class="veg-badge <?= $product['veg_status'] == 'Veg' ? 'veg' : 'non-veg' ?>" title="<?= $product['veg_status'] ?>"></div>
                          <div class="card">
                              <img src="<?= htmlspecialchars($product['image_path']) ?>" class="card__image" alt="<?= htmlspecialchars($product['name']) ?>" />
                              <div class="card__overlay">
                                  <div class="card__header">
                                      <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                      <div class="card__header-text">
                                          <h3 class="card__title"><?= htmlspecialchars($product['name']) ?></h3>
                                          <p class="card__description"><?= htmlspecialchars($product['description']) ?></p>
                                      </div>
                                  </div>
                                  <?php if (!is_null($product['price_per_gram'])): ?>
                                    <div class="price-container">
                                      <span class="card__price">Price/g: ₹<?= number_format($product['price_per_gram'], 2) ?></span>
                                      <span class="card__price_pergram">Price: ₹<?= number_format($product['price'], 2) ?></span>
                                    </div>
                                  <?php else: ?>
                                    <div class="price-container">
                                      <span class="card__price_pergram">Price: ₹<?= number_format($product['price'], 2) ?></span>
                                    </div>
                                  <?php endif; ?>
                              </div>
                          </div>
                      </li>
                  <?php endforeach; ?>
              </div>
              <i class="fas fa-angle-right arrow-btn" data-direction="right" aria-label="Next items"></i>
          </div>

          <div class="view-more-container">
              <button class="button-57" role="button" onclick="window.location.href='product-page.php?category=<?= urlencode($category) ?>'">
                  <span class="text">View More</span>
                  <span><?= $category ?></span>
              </button>
          </div>
          
          <div class="section-divider-large"></div>
      </div>
    <?php endforeach; ?>
    <!-- =============================================
         END: Products Section
         ============================================= -->

    <!-- =============================================
         START: Business Inquiry Form Section
         ============================================= -->
    <section class="about-section-wrapper" id="contact">
         <section>
            <div class="container">
                <header class="contact-header">Inquiry Details</header>

                <form action="customer_submit.php" method="POST">
                    <div class="form single">

                        <!-- Business Details -->
                        <div class="details personal">
                            <span class="title">Business Details</span>
                            <div class="fields">
                                <div class="input-field">
                                    <label>Business Name</label>
                                    <input type="text" name="business_name" placeholder="e.g. CandyCo Pvt. Ltd" 
                                           pattern="[A-Za-z0-9\s\.&]+" 
                                           title="Please enter a valid business name (letters, numbers, spaces, dots, and & only)"
                                           minlength="2" maxlength="100" required>
                                </div>
                                <div class="input-field">
                                    <label>Contact Person</label>
                                    <input type="text" name="contact_person_name" placeholder="Full name" 
                                           pattern="[A-Za-z\s]+" 
                                           title="Please enter a valid name (letters and spaces only)"
                                           minlength="2" maxlength="50" required>
                                </div>
                                <div class="input-field">
                                    <label>Email</label>
                                    <input type="email" name="email" placeholder="example@mail.com" 
                                           pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                           title="Please enter a valid email address"
                                           maxlength="100" required>
                                </div>
                                <div class="input-field">
                                    <label>Phone</label>
                                    <input type="tel" name="phone" placeholder="Mobile number" 
                                           pattern="[0-9]{10}" 
                                           title="Please enter a valid 10-digit phone number"
                                           maxlength="10" required>
                                </div>
                                <div class="input-field">
                                    <label>Estimated Quantity</label>
                                    <input type="text" name="estimated_quantity" placeholder="e.g. 100kg / 500 units" 
                                           pattern="[0-9]+(kg|units|pieces|boxes|packs|dozens|g|ml|L)"
                                           title="Please enter quantity with unit (e.g. 100kg, 500 units)"
                                           maxlength="50" required>
                                </div>
                                <div class="input-field">
                                    <label>Delivery Frequency</label>
                                    <select name="delivery_frequency" required>
                                        <option disabled selected value="">Select</option>
                                        <option value="One-time">One-time</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Product Interest -->
                        <div class="details ID">
                            <span class="title">Product Interest</span>
                            <?php
                            $conn = new mysqli("localhost", "root", "", "ooty_baker");
                            
                            // Get all categories
                            $cat_query = "SELECT DISTINCT variety FROM products ORDER BY variety";
                            $cat_result = $conn->query($cat_query);
                            
                            while($category = $cat_result->fetch_assoc()):
                                $category_name = $category['variety'];
                            ?>
                                <div class="category-section">
                                    <h3 class="category-title" style="color: #555; font-size: 1.1rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.8rem; padding-bottom: 0; border-bottom: none;"><?= htmlspecialchars($category_name) ?></h3>
                                    <div class="product-grid">
                                        <?php
                                        $prod_query = "SELECT id, name FROM products WHERE variety = ?";
                                        $prod_stmt = $conn->prepare($prod_query);
                                        $prod_stmt->bind_param("s", $category_name);
                                        $prod_stmt->execute();
                                        $prod_result = $prod_stmt->get_result();
                                        
                                        while($row = $prod_result->fetch_assoc()):
                                        ?>
                                            <label class="checkbox-label">
                                                <input type="checkbox" name="product_interest[]" value="<?= htmlspecialchars($row['id'], ENT_QUOTES) ?>"> 
                                                <?= htmlspecialchars($row['name']) ?>
                                            </label>
                                        <?php 
                                        endwhile;
                                        $prod_stmt->close();
                                        ?>
                                    </div>
                                </div>
                            <?php 
                            endwhile;
                            $conn->close();
                            ?>
                        </div>

                        <!-- Address and Notes -->
                        <div class="details address">
                            <span class="title">Address & Notes</span>
                            <div class="fields">
                                <div class="input-field field-full-width">
                                    <label>Full Address</label>
                                    <input type="text" name="address" placeholder="Enter address" 
                                           minlength="10" maxlength="200" required>
                                </div>
                                <div class="input-field field-full-width">
                                    <label>Additional Notes</label>
                                    <input type="text" name="additional_notes" placeholder="Anything else to add?"
                                           maxlength="500">
                                </div>
                                <div class="input-field field-full-width">
                                    <label>Nature of Business</label>
                                    <select name="business_nature" required>
                                        <option disabled selected value="">Select</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Consumer">Consumer</option>
                                        <option value="Dealer">Dealer</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Submit -->
                        <div class="form-submit">
                            <button class="submit" type="submit">
                                <span class="btnText">Submit</span>
                                <i class="uil uil-navigator"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </section>
    <!-- =============================================
         END: Business Inquiry Form Section
         ============================================= -->

    <!-- =============================================
         START: Footer Section
         Contact info and social links
         ============================================= -->
    <footer class="gimme-site-footer">
        <div class="gimme-footer-top">
            <nav class="gimme-footer-nav">
                <ul class="gimme-nav-desktop">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="#contact">Inquiry</a></li>
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
      
      // Handle status messages
      document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        const message = urlParams.get('message');
        
        if (status && message) {
          const popup = document.getElementById('customPopup');
          popup.textContent = decodeURIComponent(message);
          if (status === 'error') {
            popup.classList.add('error');
          }
          popup.style.display = 'block';
          
          // Remove the status parameters from URL without refreshing
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
          
          // Hide popup after 3 seconds
          setTimeout(function() {
            popup.style.display = 'none';
          }, 3000);
        }
      });
    </script>
    <!-- =============================================
         END: JavaScript and Animation Libraries
         ============================================= -->

  </body>
</html>
    