<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OOtys Website</title>
    <link rel="stylesheet" href="styles.css" />
    <!-- box icons link -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"
    />
    <!-- remix icons link -->
    <link
      href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
      rel="stylesheet"
    />

    <!-- google fonts link -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />

    <!-- aos animation -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    <style>
        .product-view {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 2rem;
            margin: 0 auto;
            max-width: 1400px;
        }

        @media screen and (max-width: 1200px) {
            .product-view {
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.25rem;
                padding: 0.875rem;
            }
        }

        @media screen and (max-width: 768px) {
            .product-view {
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 1rem;
                padding: 0.75rem;
            }
        }

        @media screen and (max-width: 480px) {
            .product-view {
                grid-template-columns: 1fr;
                gap: 1rem;
                padding: 0.5rem;
            }
        }
      .card__article {
        flex: 0 0 calc((100% / 3) - 12px);
        min-width: calc((100% / 3) - 12px);
        scroll-snap-align: start;
        list-style: none;
        border-radius: 40px;
        overflow: hidden;
        display: block;
        background: var(--surface-color);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        
        }

        /* Card styles */
        .card {
        position: relative;
        display: block;
        height: 100%;
        border-radius: calc(var(--curve) * 1px);
        overflow: hidden;
        text-decoration: none;
        }

        /* Card image */
        .card__image {
        width: 100%;
        height: auto;
        display: block;
        position: relative;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        overflow: hidden;
        }

        /* Card overlay */
        .card__overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        border-radius: 0 0 20px 20px;
        background-color: var(--surface-color);
        transform: translateY(100%);
        transition: .2s ease-in-out;
        }

        .card:hover .card__overlay {
        transform: translateY(0);
        border-radius: calc(var(--curve) * 1px) 0 0 0;
        }

        /* Card header */
        .card__header {
        position: relative;
        display: flex;
        align-items: center;
        gap: 2em;
        padding: 2em;
        border-radius: calc(var(--curve) * 1px) 0 0 0;
        background-color: var(--surface-color);
        transform: translateY(-100%);
        transition: .2s ease-in-out;
        height: 140px;
        }

        .card:hover .card__header {
        transform: translateY(0);
        }

        /* Card arc */
        .card__arc {
        width: 80px;
        height: 80px;
        position: absolute;
        bottom: 99%;
        right: 0;
        z-index: 1;
        }

        .card__arc path {
        fill: var(--surface-color);
        background-color: var(--surface-color);
        d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
        }

        /* Card thumb */
        .card__thumb {
        flex-shrink: 0;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        }

        /* Card header text */
        .card__header-text {
        flex-grow: 1;
        }

        /* Card title */
        .card__title {
        font-size: 2em;
        margin: 0 0 .3em;
        color: #6A515E;
        
        }

        /* Card tagline */
        .card__description{
        display: block;
        margin: 1em 0;
        font-size: 1rem;
        color: #D7BDCA;
        }

        /* Card description */
        .price-container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 0.7rem;
        font-weight: 500;
        margin-bottom: 5px;
        margin-top: 0;
        }

        .card__price_pergram, .card__price{
        padding: 1em;
        margin-bottom: 1em;
        margin-left: 1em;
        margin-right: 1em;
        color: #000000;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        background-color: #aaa;
        border-radius: 5%;
        }

        /* Dragging state */
        .carousel.dragging {
        scroll-snap-type: none;
        scroll-behavior: auto;
        }

        .carousel.dragging .card {
        cursor: grab;
        user-select: none;
        }

        /* Responsive design */
        @media screen and (max-width: 900px) {
        .carousel .card__article {
            flex: 0 0 calc((100% / 2) - 9px);
            min-width: calc((100% / 2) - 9px);
        }
        }

        @media screen and (max-width: 600px) {
        .carousel .card__article {
            flex: 0 0 100%;
            min-width: 100%;
        }
        }
    </style>
  </head>
  <body>
    <!-- header -->
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
                  <a href="index.php">Home</a>
                  <a href="about.html">About Us</a>
                  <a href="#footer">Contact Us</a>
                  <button class="gimme-get-started-btn-desktop">
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
                      <a href="index.php">Home</a>
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
              <button class="gimme-get-started-btn-mobile">
                  <span>Login</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 5L16 12L9 19"/>
                  </svg>
              </button>
          </div>

          <div class="gimme-overlay" id="sidebarOverlay"></div>
          
    <!-- =============================================
         END: Header Section
         ============================================= -->

    <?php
        require_once 'connection.php';

        // Get the category from the URL parameter
        $category = isset($_GET['category']) ? $_GET['category'] : '';
        
        if (empty($category)) {
            die("No category specified");
        }
    ?>

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

    <div class="product-view">
        <?php
        // Fetch products for the specified category
        $sql = "SELECT * FROM products WHERE variety = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $category);
        $stmt->execute();
        $result = $stmt->get_result();

        if (!$result) {
            die("Query failed: " . $conn->error);
        }

        if ($result->num_rows === 0) {
            echo "<p>No products found in this category.</p>";
        }
        ?>

        <?php while($row = $result->fetch_assoc()): ?>
          <li class="card__article">
              <div class="veg-badge <?= $row['veg_status'] == 'Veg' ? 'veg' : 'non-veg' ?>" title="<?= $row['veg_status'] ?>"></div>
              <div class="card">
                  <img src="<?php echo htmlspecialchars($row['image_path']); ?>" class="card__image" alt="<?php echo htmlspecialchars($row['name']); ?>" />
                  <div class="card__overlay">
                      <div class="card__header">
                          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                          <div class="card__header-text">
                              <h3 class="card__title"><?php echo htmlspecialchars($row['name']); ?></h3>
                              <?php if (!empty($row['description'])): ?>
                                  <p class="card__description"><?php echo htmlspecialchars($row['description']); ?></p>
                              <?php endif; ?>
                          </div>
                      </div>
                      <?php if (!is_null($row['price_per_gram'])): ?>
                          <div class="price-container">
                              <span class="card__price">Price/g: ₹<?php echo number_format($row['price_per_gram'], 2); ?></span>
                              <span class="card__price_pergram">Price: ₹<?php echo number_format($row['price'], 2); ?></span>
                          </div>
                      <?php else: ?>
                          <div class="price-container">
                              <span class="card__price_pergram">Price: ₹<?php echo number_format($row['price'], 2); ?></span>
                          </div>
                      <?php endif; ?>
                  </div>
              </div>
          </li>
        <?php endwhile; ?>
    </div>

   <!-- footer  -->
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
          <h2>Contact us</h2>
          <div class="content">
            <form action="#">
              <div class="email">
                <div class="text">Email *</div>
                <input type="email" required>
              </div>
              <div class="msg">
                <div class="text">Message *</div>
                <textarea rows="2" cols="25" required></textarea>
              </div>
              <div class="btn">
                <button type="submit">Send</button>
              </div>
            </form>
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
    <!-- js script -->
    <script src="index.js"></script>
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
      AOS.init({
        offset: 1,
      });
    </script>

 </body>
</html> 