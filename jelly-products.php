
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
  </head>
  <body>
    <!-- header -->
    <header>
      <a href="#" class="logo">
        <img src="gimmie logo (1).jpg" alt="logo coffe" />
      </a>

      <ul class="navlist">
        <li><a href="#">About</a></li>
        <li><a href="#">Membership</a></li>
        <li><a href="#">Events</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <div class="reght-content">
        <a href="#" class="nav-btn">Sign In</a>
        <div class="bx bx-menu" id="menu-icon"></div>
      </div>
    </header>

    <div class="product-view">
      <?php
        require_once 'connection.php';

        // Fetch only Jelly
        $sql = "SELECT * FROM products WHERE 	variety = 'Jelly'";
        $result = $conn->query($sql);

        if (!$result) {
            die("Query failed: " . $conn->error);
        }

        if ($result->num_rows === 0) {
            echo "<p>No product named Jelly found.</p>";
        }
        ?>

        <?php while($row = $result->fetch_assoc()): ?>
          <article class="card__article">
              <img src="<?php echo htmlspecialchars($row['image_path']); ?>" alt="image" class="card__img">
              
              <div class="card__data">
                  <div class="card-header">
                      <h2 class="card__title"><?php echo htmlspecialchars($row['name']); ?></h2>
                      <?php if ($row['veg_status'] === 'Veg'): ?>
                          <div class="veg-icon" title="Vegetarian"></div>
                      <?php else: ?>
                          <div class="non-veg-icon" title="Non-Vegetarian"></div>
                      <?php endif; ?>
                  </div>

                  <?php if (!empty($row['description'])): ?>
                      <p class="card-description">
                          <?php echo htmlspecialchars($row['description']); ?>
                      </p>
                  <?php endif; ?>

                  <div class="price-row">
                      <span class="label">Price:</span>
                      <span class="value">$<?php echo number_format($row['price'], 2); ?></span>
                  </div>

                  <?php if (!is_null($row['price_per_gram'])): ?>
                      <div class="price-row">
                          <span class="label">Price per gram:</span>
                          <span class="value">$<?php echo number_format($row['price_per_gram'], 2); ?>/g</span>
                      </div>
                  <?php endif; ?>
              </div>
          </article>
        <?php endwhile; ?>


    </div>

   <!-- footer  -->
  <footer>
      <div class="main-content">
        <div class="left box">
          <h2>About us</h2>
          <div class="content">
            <p>CodinNepal is a YouTube channel where you can learn web designing, web development, ui/ux designing, html css tutorial, hover animation and effects, javascript and jquery tutorial and related so on.</p>
            <div class="social">
              <a href="https://facebook.com/coding.np"><span class="fab fa-facebook-f"></span></a>
              <a href="#"><span class="fab fa-twitter"></span></a>
              <a href="https://instagram.com/coding.np"><span class="fab fa-instagram"></span></a>
              <a href="https://youtube.com/c/codingnepal"><span class="fab fa-youtube"></span></a>
            </div>
          </div>
        </div>
        <div>
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
      <div class="bottom">
        <center>
          <span class="credit">Created By <a href="https://www.codingnepalweb.com">CodingNepal</a> | </span>
          <span class="far fa-copyright"></span><span> 2020 All rights reserved.</span>
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
    