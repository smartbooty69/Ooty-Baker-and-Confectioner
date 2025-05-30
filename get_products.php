<?php
require_once 'connection.php';

// Fetch products
$sql = "SELECT * FROM products";
$result = $conn->query($sql);

if (!$result) {
    die("Query failed: " . $conn->error);
}

if ($result->num_rows === 0) {
    echo "<p>No products found.</p>";
    exit;
}

while($row = $result->fetch_assoc()): ?>
    <article class="card__article">
        <!-- Delete button -->
        <a href="javascript:void(0)" class="delete-btn" onclick="deleteProduct(<?php echo $row['id']; ?>)">×</a>
        
        <img src="<?php echo str_replace('\\', '/', htmlspecialchars($row['image_path'])); ?>" alt="image" class="card__img">
        
        <div class="card__data">
            <div class="card-header">
                <h2 class="card__title"><?php echo htmlspecialchars($row['name']); ?></h2>
                <?php if ($row['veg_status'] === 'Veg'): ?>
                    <div class="veg-badge veg" title="Vegetarian"></div>
                <?php else: ?>
                    <div class="veg-badge non-veg" title="Non-Vegetarian"></div>
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
<?php endwhile;

$conn->close();
?> 