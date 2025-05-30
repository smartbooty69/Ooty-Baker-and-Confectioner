<?php
// =============================================
// START: Database Connection and Data Fetching
// =============================================
require_once 'connection.php';

$categories = ['Jelly', 'Candy', 'Coated Candy'];
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
<html lang="es">
  <!-- =============================================
       START: Head Section
       Meta tags, title, and resources
       ============================================= -->
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OOtys Website</title>
    
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

  </head>
  <!-- =============================================
       END: Head Section
       ============================================= -->

  <body>
    <!-- =============================================
         START: Header Section
         Navigation and branding
         ============================================= -->
         <header class="gimme-main-header">
             <div class="gimme-logo-container">
                 <div class="gimme-logo-images">
                     <img src="images/brand-logo.png" alt="Brand Logo" class="brand-logo">
                     <img src="images/gimmie-logo.jpg" alt="Gimmie Logo" class="gimmie-logo">
                 </div>
             </div>

              <nav class="gimme-nav-desktop">
                  <a href="product-page.php">Products</a>
                  <a href="about.html">About Us</a>
                  <a href="#footer">Contact Us</a>
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
                  <div class="gimme-sidebar-nav-item">
                      <a href="product-page.php">PRODUCTS</a>
                      <span class="icon">+</span>
                  </div>
                  <div class="gimme-sidebar-nav-item">
                      <a href="about.html">ABOUT US</a>
                      <span class="icon">&nearrow;</span>
                  </div>
                  <div class="gimme-sidebar-nav-item">
                      <a href="#footer">CONTACT US</a>
                      <span class="icon">&nearrow;</span>
                  </div>
              </nav>
              <!-- <button class="gimme-get-started-btn-mobile" onclick="window.location.href='auth.php'">
                  <span>Login</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 5L16 12L9 19"/>
                  </svg>
              </button> -->
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
   

         <section class="about-section-wrapper">
            <div class="about-content-box">
                <h1>ABOUT US</h1>
                <p>About Ooty Baker & Confectioner
Welcome to Ooty Baker & Confectioner, where tradition meets taste and every bite tells a story of quality, care, and creativity. Located in the bustling area of Bommanahalli, Bengaluru, we are a proud local bakery that has built a reputation for excellence in both baked goods and confections. Our journey began with a simple idea — to bring joy to people's lives through delightful treats made with love and the finest ingredients.</p>
                <div class="social-icons">
                    <a href="https://www.facebook.com/people/Ooty-Baker-Confectioner/100065324206767/" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Twitter"><i class="fab fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/ootybakerandconfectioner/" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                </div>
                <a href="about.html" class="btn">Know More</a>

            </div>
        </section>
  
    <!-- =============================================
         START: Products Section
         Category-wise product display
         ============================================= -->
    <?php foreach ($products_by_category as $category => $products): ?>
      <div class="product-section" data-aos="fade-up">
          <div class="section-header">
              <div class="section-title-wrapper">
                  <span class="section-icon">
                      <i class="fas fa-star"></i>
                  </span>
                  <h2 class="section-title"><?= strtoupper($category) ?></h2>
                  <span class="section-icon">
                      <i class="fas fa-star"></i>
                  </span>
              </div>
              <div class="section-divider"></div>
              <p class="section-description">Discover our premium collection of handcrafted <?= strtolower($category) ?> made with love and finest ingredients!</p>
          </div>

          <div class="wrapper">
              <i class="fa-solid fa-angle-left arrow-btn" data-direction="left" aria-label="Previous items"></i>
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
              <i class="fa-solid fa-angle-right arrow-btn" data-direction="right" aria-label="Next items"></i>
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
    <section class="about-section-wrapper">
         <section>
    <div class="container">
        <header class="contact-header">Contact Details</header>

        <form action="customer_submit.php" method="POST">
            <div class="form single">

                <!-- Business Details -->
                <div class="details personal">
                    <span class="title">Business Details</span>
                    <div class="fields">
                        <div class="input-field">
                            <label>Business Name</label>
                            <input type="text" name="business_name" placeholder="e.g. CandyCo Pvt. Ltd" required>
                        </div>
                        <div class="input-field">
                            <label>Contact Person</label>
                            <input type="text" name="contact_person_name" placeholder="Full name" required>
                        </div>
                        <div class="input-field">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="example@mail.com" required>
                        </div>
                        <div class="input-field">
                            <label>Phone</label>
                            <input type="text" name="phone" placeholder="Mobile number" required>
                        </div>
                        <div class="input-field">
                            <label>Estimated Quantity</label>
                            <input type="text" name="estimated_quantity" placeholder="e.g. 100kg / 500 units" required>
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
                    <div class="product-grid">
                        <?php
                        $conn = new mysqli("localhost", "root", "", "ooty_baker");
                        $res = $conn->query("SELECT id, name FROM products ORDER BY name ASC");
                        while($row = $res->fetch_assoc()):
                        ?>
                            <label class="checkbox-label">
                                <input type="checkbox" name="product_interest[]" value="<?= htmlspecialchars($row['id'], ENT_QUOTES) ?>"> 
                                <?= htmlspecialchars($row['name']) ?>
                            </label>
                        <?php endwhile; $conn->close(); ?>
                    </div>
                </div>

                <!-- Address and Notes -->
                <div class="details address">
                    <span class="title">Address & Notes</span>
                    <div class="fields">
                        <div class="input-field field-full-width">
                            <label>Full Address</label>
                            <input type="text" name="address" placeholder="Enter address" required>
                        </div>
                        <div class="input-field field-full-width">
                            <label>Additional Notes</label>
                            <input type="text" name="additional_notes" placeholder="Anything else to add?">
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
    <footer>
      <div class="main-content">
        <!-- About Us Section -->
        <div class="left box" id="footer">
          <h2>About us</h2>
          <div class="content">
            <p>Ooty Baker & Confectioner is a renowned bakery and confectionery establishment based in Bangalore, Karnataka. Known for its delectable range of baked goods and sweets, the company has been serving customers with quality products for several years. Their commitment to traditional recipes combined with modern baking techniques has made them a favorite among locals and tourists alike..</p>
            <!-- Social Media Links -->
            <div class="social">
              <a href="https://www.facebook.com/people/Ooty-Baker-Confectioner/100065324206767/"><span class="fab fa-facebook-f"></span></a>
              <a href="https://www.instagram.com/ootybakerandconfectioner/"><span class="fab fa-instagram"></span></a>
            </div>
          </div>
        </div>

        <!-- Contact Information Section -->
        <div class="center box">
          <h2>Address</h2>
          <div class="content">
            <div class="place">
              <span class="fas fa-map-marker-alt"></span>
              <span class="text">Ooty Baker & Confectioner #40,  Muniswammappa Layout,  Bengaluru, Hosur Road,  Hosur Road 1st Cross Road, Bommanahalli-560068</span>
            </div>
            <div class="phone">
              <span class="fas fa-phone-alt"></span>
              <span class="text">+07947120466</span>
            </div>
            <div class="email">
              <span class="fas fa-envelope"></span>
              <span class="text">abc@example.com</span>
            </div>
          </div>
        </div>

        <!-- Contact Form Section -->
        <div class="right box">
          <h2>Social Media</h2>
          <div class="content">
             <div class="social">
              <a href="https://www.facebook.com/people/Ooty-Baker-Confectioner/100065324206767/"><span class="fab fa-facebook-f"></span></a>
              <a href="https://www.instagram.com/ootybakerandconfectioner/"><span class="fab fa-instagram"></span></a>
            </div>
           
          </div>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="bottom">
        <center>
          <span class="far fa-copyright"></span><span> gimmie. All rights reserved.</span>
        </center>
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
    