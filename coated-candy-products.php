                  <div class="price-row">
                      <span class="label">Price:</span>
                      <span class="value">₹<?php echo number_format($row['price'], 2); ?></span>
                  </div>

                  <?php if (!is_null($row['price_per_gram'])): ?>
                      <div class="price-row">
                          <span class="label">Price per gram:</span>
                          <span class="value">₹<?php echo number_format($row['price_per_gram'], 2); ?>/g</span>
                      </div>
                  <?php endif; ?> 