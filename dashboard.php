<!DOCTYPE html>
<html lang="en" xml:lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google" content="notranslate">
    <title>
        Horizon
    </title>
    <link rel="shortcut icon" href="../img/login/logo-mb.png" type="image/png">
    <!-- GOOGLE FONT -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
      rel="stylesheet"
    />
    <!-- BOOTSTARP -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- ICONS -->
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>
    <!-- APP CSS -->
    <link rel="stylesheet" href="assets/css/dashboard/grid.css">
    <link rel="stylesheet" href="assets/css/dashboard/app.css">
    <style>
        /* Center the success modal */
        #successModal .modal-dialog {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh; /* Ensure modal takes up full viewport height */
        }

        /* Ensure modal content is centered */
        #successModal .modal-content {
            text-align: center;
        }

        /* Adjust modal body padding for better appearance */
        #successModal .modal-body {
            padding: 20px;
        }

        /* Adjust modal and backdrop z-index */
        #successModal {
            z-index: 1050; /* Ensure higher z-index than other elements */
        }

        .modal-backdrop.show {
            z-index: 1040; /* Ensure backdrop is behind modal */
        }
       .send_remainder
       {
        border-radius: 10px;
        padding: 5px;
        background-color:#40aad1;
        border: 0;
        color: #3a3c3d;
       }
       .send_remainder:hover{
        cursor: pointer;
        background-color: skyblue;
        color:#28292a;
       }
       .box101{
        margin-left:300px;
       }
    </style>
    


</head>

<body>

    <!--======= SIDEBAR SECTION =======-->
    <div class="sidebar">
        <div class="sidebar-container">
            <div class="sidebar-logo">
                <a href="../index.html"><img src="../assets/img/landingpage/logo-nav-inverted.png"></a>
                <span><a href="../index.html">Ooty Baker</a></span>
            </div>
            <div class="sidebar-close" id="sidebar-close">
                <i class='bx bx-left-arrow-alt'></i>
            </div>
        </div>
        
        <!-- SIDEBAR MENU -->
        <ul class="sidebar-menu">
            <li>
                <a href="#business-inquiries" class="active">
                    <i class='bx bx-home'></i>
                    <span>business-inquiries</span>
                </a>
            </li>
            <li class="sidebar-submenu">
                <a href="#" class="sidebar-menu-dropdown">
                    <i class='bx bx-category'></i>
                    <span>Products</span>
                    <div class="dropdown-icon"></div>
                </a>
                <ul class="sidebar-menu sidebar-menu-dropdown-content">
                    <li>
                        <a href="#product">
                            <i class='bx bx-category'></i>
                            <span>Add Products</span>
                        </a>
                        <a href="#product-delete">
                            <i class='bx bx-category'></i>
                            <span>Delete Products</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="sidebar-submenu">
                <a href="#" class="sidebar-menu-dropdown">
                    <i class='bx bx-cog'></i>
                    <span>settings</span>
                    <div class="dropdown-icon"></div>
                </a>
                <ul class="sidebar-menu sidebar-menu-dropdown-content">
                    <li>
                        <a href="#" class="darkmode-toggle" id="darkmode-toggle">
                            darkmode
                            <span class="darkmode-switch"></span>
                        </a>
                        <a href="../index.html" id="logout">
                            Logout
                            <i class='bx bx-log-out bx-flip-horizontal'></i>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- END SIDEBAR MENU -->
    </div>
    <!--======= END SIDEBAR =======-->

    <!--======= NAVBAR SECTION =======-->
    
    <div class="main">
        <div class="main-header">
            <div class="mobile-toggle" id="mobile-toggle">
                <i class='bx bx-menu-alt-right'></i>
            </div>
            <div class="main-title">
                Dashboard
            </div>
        </div>
    

        <!--======= DASHBOARD SECTION =======-->
        <Section id= "business-inquiries"> 
            
            <div class="main-content">
                <div class="row">
                    <div class="col-3 col-md-6 col-sm-12">
                        <div class="box box-hover">
                            <!-- COUNTER -->
                            <div class="counter">
                                <div class="counter-title">
                                    Total Inquiries
                                </div>
                                <div class="counter-info">
                                    <div class="counter-count">
                                        <?php
                                            $con = new mysqli("localhost", "root", "", "ooty_baker");
                                            $result = $con->query("SELECT COUNT(*) as total FROM business_inquiries");
                                            $count = $result->fetch_assoc();
                                            echo $count['total'];
                                        ?>
                                    </div>
                                    <i class='bx bxs-business'></i>
                                </div>
                            </div>
                            <!-- END COUNTER -->
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <!-- INQUIRIES TABLE -->
                        <div class="box">
                            <div class="box-header">
                                <h2 class="box-title">Business Inquiries</h2>
                                <div class="box-actions">
                                    <button class="btn btn-outline" onclick="deleteAllInquiries()">Delete All</button>
                                    <button class="btn btn-outline" onclick="exportInquiries()">Export</button>
                                </div>
                            </div>

                            <div class="box-body">
                                <table id="display-table">
                                    <thead>
                                        <tr>
                                            <th>Business</th>
                                            <th>Contact</th>
                                            <th>Phone</th>
                                            <th>Quantity</th>
                                            <th>Frequency</th>
                                            <th>Nature</th>
                                            <th>Actions</th>
                                        </tr>    
                                    </thead>
                                    <tbody>
                                    <?php
                                        $con = new mysqli("localhost", "root", "", "ooty_baker");
                                        $query = "SELECT * FROM business_inquiries ORDER BY created_at DESC";
                                        $result = $con->query($query);
                                        while ($row = $result->fetch_assoc()) {
                                    ?>
                                        <tr data-inquiry-id="<?= $row['id'] ?>">
                                            <td><?= htmlspecialchars($row['business_name']) ?></td>
                                            <td><?= htmlspecialchars($row['contact_person_name']) ?></td>
                                            <td><?= $row['phone'] ?></td>
                                            <td><?= $row['estimated_quantity'] ?></td>
                                            <td><?= $row['delivery_frequency'] ?></td>
                                            <td><?= $row['business_nature'] ?></td>
                                            <td>
                                                <div class="table-button">
                                                    <button class="blue-button btn btn-outline">
                                                        <a href="view_inquiry.php?id=<?= $row['id'] ?>"><i class='bx bx-show'></i></a>
                                                    </button>
                                                    <button class="red-button btn btn-outline">
                                                        <a href="javascript:void(0)" onclick="deleteInquiry(<?= $row['id'] ?>)"><i class='bx bxs-trash'></i></a>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    <?php } ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- END INQUIRIES TABLE -->
                    </div>
                </div>
            </div>
        </Section>

            
        
        <!--======= END OF DASHBOARD =======-->



    <!--======= product SECTION =======-->
           
    <Section id="product" class="hidden">
       <div class="insert-product">
            <h2>Insert New Product</h2>
            <form class="product-form" id="productForm" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>

                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" rows="4"></textarea>
                </div>

                <div class="form-group">
                    <label for="variety">Variety:</label>
                    <select id="variety" name="variety" required>
                        <option value="Candy">Candy</option>
                        <option value="Coated Candy">Coated Candy</option>
                        <option value="Jelly">Jelly</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="price">Price:</label>
                    <input type="number" id="price" name="price" step="0.01" required>
                </div>

                <div class="form-group">
                    <label for="price_per_gram">Price per Gram:</label>
                    <input type="number" id="price_per_gram" name="price_per_gram" step="0.01" required>
                </div>

                <div class="form-group">
                    <label for="veg_status">Vegetarian Status:</label>
                    <select id="veg_status" name="veg_status" required>
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>
                </div>

                <div class="form-group full-width image-upload-group">
                    <input type="file" id="imageUpload" name="imageUpload" accept="image/*" required>
                    <div class="image-preview"></div>
                </div>

                <button type="submit" class="submit-btn">Insert Product</button>
            </form>
        </div>

    </Section>




    <section id="product-delete" class="hidden">
    <div class="product-view">
        <?php
        require_once 'connection.php';

        // Handle delete action
        if (isset($_GET['delete_id'])) {
            $delete_id = $_GET['delete_id'];
            $delete_sql = "DELETE FROM products WHERE id = ?";
            $stmt = $conn->prepare($delete_sql);
            $stmt->bind_param("i", $delete_id);
            $stmt->execute();
            $stmt->close();
        }

        // Fetch products
        $sql = "SELECT * FROM products";
        $result = $conn->query($sql);

        if (!$result) {
            die("Query failed: " . $conn->error);
        }

        if ($result->num_rows === 0) {
            echo "<p>No products found.</p>";
        }
        ?>

        <?php while($row = $result->fetch_assoc()): ?>
        <article class="card__article">
            <!-- Delete button -->
            <a href="javascript:void(0)" class="delete-btn" onclick="deleteProduct(<?php echo $row['id']; ?>)">×</a>
            
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
</section>

    <!--======= END OF product =======-->
   
    
   

    
  


    <!-- SCRIPT -->
    <!-- BOOTSTRAP JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <!-- APP JS -->
    <script src="assets/js/dashboard/app.js"></script>
    <script src="assets/js/dashboard/sidebar.js"></script>

    <!-- Export button functionality -->
    <script>
        function deleteAllInquiries() {
            if (confirm('Are you sure you want to delete all inquiries? This action cannot be undone.')) {
                fetch('delete_all_inquiries.php', {
                    method: 'GET'
                })
                .then(response => response.text())
                .then(data => {
                    if (data.includes('success')) {
                        showMessage('All inquiries deleted successfully');
                        // Clear the table body
                        document.querySelector('#display-table tbody').innerHTML = '';
                        // Update the total count to 0
                        const countElement = document.querySelector('.counter-count');
                        if (countElement) {
                            countElement.textContent = '0';
                        }
                    } else {
                        showMessage('Error deleting inquiries: ' + data, false);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showMessage('Error deleting inquiries', false);
                });
            }
        }

        function exportInquiries() {
            // Show loading state
            const exportBtn = document.querySelector('.box-actions button:last-child');
            const originalText = exportBtn.innerHTML;
            exportBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Exporting...';
            exportBtn.disabled = true;

            fetch('export_inquiries.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Export failed');
                }
                return response.blob();
            })
            .then(blob => {
                // Create download link
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `business_inquiries_${new Date().toISOString().slice(0,10)}.xlsx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                showMessage('Inquiries exported successfully');
            })
            .catch(error => {
                console.error('Export error:', error);
                showMessage('Error exporting inquiries: ' + error.message, false);
            })
            .finally(() => {
                // Reset button state
                exportBtn.innerHTML = originalText;
                exportBtn.disabled = false;
            });
        }
    </script>
    <script>
        document.getElementById('deleteAllBtn').addEventListener('click', function() {
            if (confirm('Are you sure you want to delete all inquiries? This action cannot be undone.')) {
                window.location.href = 'delete_all_inquiries.php';
            }
        });
    </script>
    
    <script>
        function showMessage(message, isSuccess = true) {
            const messageDiv = document.createElement('div');
            messageDiv.style.position = 'fixed';
            messageDiv.style.top = '20px';
            messageDiv.style.right = '20px';
            messageDiv.style.padding = '15px 25px';
            messageDiv.style.borderRadius = '5px';
            messageDiv.style.color = '#fff';
            messageDiv.style.zIndex = '1000';
            messageDiv.style.transition = 'opacity 0.5s ease-in-out';
            messageDiv.style.backgroundColor = isSuccess ? '#28a745' : '#dc3545';
            messageDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            messageDiv.style.fontWeight = '500';
            messageDiv.style.fontSize = '14px';
            messageDiv.style.minWidth = '300px';
            messageDiv.style.textAlign = 'center';
            messageDiv.textContent = message;

            document.body.appendChild(messageDiv);

            // Remove the message after 3 seconds
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(messageDiv);
                }, 500);
            }, 3000);
        }

        function deleteProduct(id) {
            if (confirm('Are you sure you want to delete this product?')) {
                fetch('delete_product.php?id=' + id, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showMessage('Product deleted successfully');
                        // Fetch updated product list
                        fetch('get_products.php')
                            .then(response => response.text())
                            .then(html => {
                                document.querySelector('.product-view').innerHTML = html;
                            })
                            .catch(error => {
                                console.error('Error fetching products:', error);
                            });
                    } else {
                        showMessage('Error deleting product: ' + data.message, false);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showMessage('Error deleting product', false);
                });
            }
        }
    </script>

    <script>
        // Add this to your existing JavaScript
        document.getElementById('productForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            fetch('insert_product.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                if (data.includes('success')) {
                    showMessage('Product uploaded successfully');
                    // Clear the form
                    this.reset();
                    // Clear the image preview
                    document.querySelector('.image-preview').innerHTML = '';
                } else {
                    showMessage('Error uploading product: ' + data, false);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Error uploading product', false);
            });
        });
    </script>

    <script>
        function deleteInquiry(id) {
            if (confirm('Are you sure you want to delete this inquiry?')) {
                fetch('delete_inquiry.php?id=' + id, {
                    method: 'GET'
                })
                .then(response => response.text())
                .then(data => {
                    if (data.includes('success')) {
                        showMessage('Inquiry deleted successfully');
                        // Remove the row from the table
                        const row = document.querySelector(`tr[data-inquiry-id="${id}"]`);
                        if (row) {
                            row.remove();
                        }
                        // Update the total count
                        const countElement = document.querySelector('.counter-count');
                        if (countElement) {
                            const currentCount = parseInt(countElement.textContent);
                            countElement.textContent = currentCount - 1;
                        }
                    } else {
                        showMessage('Error deleting inquiry: ' + data, false);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showMessage('Error deleting inquiry', false);
                });
            }
        }
    </script>

</body>

</html>

