<?php
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
?>
<!DOCTYPE html>
<html lang="es">
  <!-- Head Section: Contains meta tags, title, and external resource links -->
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OOtys Website</title>
    
    <!-- External CSS Files -->
    <link rel="stylesheet" href="styles.css" />
    <!-- Box Icons Library -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"
    />
    <!-- Remix Icons Library -->
    <link
      href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
      rel="stylesheet"
    />

    <!-- Google Fonts: Roboto -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />

    <!-- AOS Animation Library -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
  </head>

  <body>
    <!-- Header Section: Contains logo, navigation menu, and sign-in button -->
    <header>
      <!-- Logo -->
      <a href="#" class="logo">
        <img src="images/gimmie-logo.jpg" alt="logo coffe" />
      </a>

      <!-- Main Navigation Menu -->
      <ul class="navlist">
        <li><a href="#">About us</a></li>
        <li><a href="#">products</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <!-- Right Side Header Content -->
      <div class="reght-content">
        <a href="#" class="nav-btn">Sign In</a>
        <div class="bx bx-menu" id="menu-icon"></div>
      </div>
    </header>

    <!-- Main Banner Slider Section -->
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
    
    <?php foreach ($products_by_category as $category => $products): ?>
    <div class="section-header">
        <h2 class="section-title"><?= strtoupper($category) ?></h2>
        <p class="section-description">Explore our latest range of delicious <?= strtolower($category) ?>!</p>
    </div>

    <div class="wrapper">
        <i class="fa-solid fa-angle-left arrow-btn" data-direction="left" aria-label="Previous items"></i>
        <div class="carousel">
            <?php foreach ($products as $product): ?>
                <article class="card__article">
                    <img src="<?= $product['image_path'] ?>" alt="<?= htmlspecialchars($product['name']) ?>" class="card__img">
                    <div class="card__data">
                        <div class="card-header">
                            <h2 class="card__title"><?= htmlspecialchars($product['name']) ?></h2>
                            <div class="<?= $product['veg_status'] == 'Veg' ? 'veg-icon' : 'non-veg-icon' ?>" title="<?= $product['veg_status'] ?>"></div>
                        </div>
                        <p class="card-description"><?= htmlspecialchars($product['description']) ?></p>
                        <div class="price-row">
                            <span class="label">Price:</span>
                            <span class="value">$<?= number_format($product['price'], 2) ?></span>
                        </div>
                        <?php if (!is_null($product['price_per_gram'])): ?>
                            <div class="price-row">
                                <span class="label">Price per gram:</span>
                                <span class="value">$<?= number_format($product['price_per_gram'], 2) ?>/g</span>
                            </div>
                        <?php endif; ?>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
        <i class="fa-solid fa-angle-right arrow-btn" data-direction="right" aria-label="Next items"></i>
    </div>

    <div class="view-more-container">
        <a href="<?= strtolower($category) ?>-products.html" class="view-more-btn">View More <?= $category ?> Products</a>
    </div>
<?php endforeach; ?>

    <!-- Footer Section -->
    <footer>
      <div class="main-content">
        <!-- About Us Section -->
        <div class="left box">
          <h2>About us</h2>
          <div class="content">
            <p>Ooty Baker & Confectioner is a renowned bakery and confectionery establishment based in Bangalore, Karnataka. Known for its delectable range of baked goods and sweets, the company has been serving customers with quality products for several years. Their commitment to traditional recipes combined with modern baking techniques has made them a favorite among locals and tourists alike..</p>
            <!-- Social Media Links -->
            <div class="social">
              <a href="https://facebook.com/coding.np"><span class="fab fa-facebook-f"></span></a>
              <a href="#"><span class="fab fa-twitter"></span></a>
              <a href="https://instagram.com/coding.np"><span class="fab fa-instagram"></span></a>
              <a href="https://youtube.com/c/codingnepal"><span class="fab fa-youtube"></span></a>
            </div>
          </div>
        </div>

        <!-- Contact Information Section -->
        <div class="center box">
          <h2>Address</h2>
          <div class="content">
            <div class="place">
              <span class="fas fa-map-marker-alt"></span>
              <span class="text">Birendranagar, Surkhet</span>
            </div>
            <div class="phone">
              <span class="fas fa-phone-alt"></span>
              <span class="text">+089-765432100</span>
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

    <!-- JavaScript Files -->
    <script src="index.js"></script>
    <!-- AOS Animation Initialization -->
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
      AOS.init({
        offset: 1,
      });
    </script>

  </body>
</html>
    