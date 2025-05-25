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
                <span><a href="../index.html">HORIZON GYM</a></span>
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
                        <a href="#product">
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
                                    <button class="btn btn-outline" id="deleteAllBtn">Delete All</button>
                                    <button class="btn btn-outline" id="exportBtn">Export</button>
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
                                        <tr>
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
                                                        <a href="delete_inquiry.php?id=<?= $row['id'] ?>"><i class='bx bxs-trash'></i></a>
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
            <form class="product-form" action="insert_product.php" method="POST" enctype="multipart/form-data">
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

    <!--======= END OF product =======-->
   
    
   

    
  


    <!-- SCRIPT -->
    <!-- BOOTSTARP JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <!-- APP JS -->
    <script src="../assets/js/dashboard/app.js"></script>
    <!-- TEXT EDITOR -->
    <script src="./assets/js/dashboard/app.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            // Make AJAX request to fetch business-inquiries count
            $.ajax({
                type: "GET",
                url: "total_count.php",
                success: function(response) {
                    // Update the HTML content with the retrieved business-inquiries count
                    $('.counter-count').text(response);
                },
                error: function() {
                    // Handle AJAX error (optional)
                    console.log('Error fetching business-inquiries count.');
                }
            });
        });
    </script>
    <script>
       document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.querySelector('.send');

    sendButton.addEventListener('click', function() {
        // Perform AJAX request to send email
        const messageContent = document.getElementById('text-input').innerHTML;

        // Example AJAX request using Fetch API
        fetch('email_index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'message=' + encodeURIComponent(messageContent)
        })
        .then(response => {
            if (response.ok) {
                // Show success modal
                const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
            } else {
                console.error('Failed to send message.');
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sendReminderButton = document.querySelector('.send_remainder');

    sendReminderButton.addEventListener('click', function() {
        // Retrieve message content from the mail editor section
        const messageContent = document.getElementById('text-input').innerHTML;

        // Perform AJAX request to send reminder emails
        fetch('rem_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'message=' + encodeURIComponent(messageContent)
        })
        .then(response => {
            if (response.ok) {
                // Show success modal
                showSuccessModal();
            } else {
                console.error('Failed to send reminder emails.');
            }
        })
        .catch(error => {
            console.error('Error sending reminder emails:', error);
        });
    });

    // Function to show success modal
    function showSuccessModal() {
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
    }
});

    </script>
    <script>
        document.getElementById('deleteAllBtn').addEventListener('click', function() {
            if (confirm('Are you sure you want to delete all inquiries? This action cannot be undone.')) {
                window.location.href = 'delete_all_inquiries.php';
            }
        });
    </script>
    

</body>

</html>

