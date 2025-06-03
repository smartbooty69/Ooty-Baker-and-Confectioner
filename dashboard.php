<?php
require_once 'auth-check.php';
?>
<!DOCTYPE html>
<html lang="en" xml:lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google" content="notranslate">
    
    <!-- Primary Meta Tags -->
    <title>Ooty Baker & Confectioner - Admin Dashboard</title>
    <meta name="title" content="Ooty Baker & Confectioner - Admin Dashboard">
    <meta name="description" content="Manage your bakery business with our comprehensive admin dashboard. Track inquiries, manage products, and monitor business performance.">
    <meta name="keywords" content="Ooty Baker, Confectioner, Admin Dashboard, Business Management, Product Management, Business Inquiries">
    <meta name="author" content="Ooty Baker & Confectioner">
    <meta name="robots" content="noindex, nofollow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ootybaker.com/dashboard">
    <meta property="og:title" content="Ooty Baker & Confectioner - Admin Dashboard">
    <meta property="og:description" content="Manage your bakery business with our comprehensive admin dashboard. Track inquiries, manage products, and monitor business performance.">
    <meta property="og:image" content="images/brand-logo.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://ootybaker.com/dashboard">
    <meta property="twitter:title" content="Ooty Baker & Confectioner - Admin Dashboard">
    <meta property="twitter:description" content="Manage your bakery business with our comprehensive admin dashboard. Track inquiries, manage products, and monitor business performance.">
    <meta property="twitter:image" content="images/brand-logo.png">

    <!-- Favicon -->
    <link rel="shortcut icon" href="images/brand-logo.png" type="image/png">
    <link rel="apple-touch-icon" href="images/brand-logo.png">
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
            min-height: 100vh;
        }

        /* Status badge styles */
        .status-badge {
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.85em;
            font-weight: 500;
            text-transform: capitalize;
            display: inline-block;
        }

        .status-new {
            background-color: #e3f2fd;
            color: #1976d2;
        }

        .status-in-progress {
            background-color: #fff3e0;
            color: #f57c00;
        }

        .status-completed {
            background-color: #e8f5e9;
            color: #2e7d32;
        }

        .status-cancelled {
            background-color: #ffebee;
            color: #c62828;
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
       .counter-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;
    }

    .counter-info:hover {
        transform: translateY(-3px);
    }

    .counter-details {
        flex: 1;
    }

    .counter-count {
        font-size: 1.8rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 0.3rem;
        transition: all 0.3s ease;
    }

    .counter-subtitle {
        font-size: 0.8rem;
        color: #6c757d;
        margin-bottom: 0.3rem;
    }

    .counter-trend {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.75rem;
    }

    .counter-icon {
        font-size: 1.8rem;
        color: #40aad1;
        opacity: 0.8;
    }

    .text-success {
        color: #28a745;
    }

    .text-danger {
        color: #dc3545;
    }

    @keyframes countUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .counter-count.animate {
        animation: countUp 0.5s ease-out;
    }

    .table-button {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%; /* Ensure the container takes full height */
        gap: 5px; /* Adds a small gap between buttons */
    }

    .box-body table td {
        vertical-align: middle;
        padding: 20px 0;
    }

    /* Product card styles */
    .card__article {
        position: relative;
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: 0.75rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        margin: 0.75rem;
        min-width: 280px;
        max-width: 320px;
    }

    .card__img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 0.75rem 0.75rem 0 0;
    }

    .card__data {
        padding: 1rem;
    }

    .card-header {
        margin-bottom: 0.75rem;
    }

    .card__title {
        font-size: 1.1rem;
        margin: 0;
    }

    .card-description {
        font-size: 0.8rem;
        margin: 0.5rem 0;
    }

    .price-row {
        margin-bottom: 0.25rem;
    }

    .label {
        font-size: 0.8rem;
    }

    .value {
        font-size: 0.9rem;
    }

    .veg-badge {
        width: 28px;
        height: 28px;
        top: 15px;
        right: 15px;
    }

    .veg-badge.veg::after,
    .veg-badge.non-veg::after {
        width: 14px;
        height: 14px;
    }

    .delete-btn {
        position: absolute;
        width: 32px;
        height: 32px;
        font-size: 20px;
        top: 10px;
        right: 10px;
        background-color: rgba(220, 53, 69, 0.6);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .delete-btn:hover {
        background-color: rgba(200, 35, 51, 0.8);
        color: white;
        transform: scale(1.1);
    }

    .edit-btn {
        position: absolute;
        width: 32px;
        height: 32px;
        font-size: 20px;
        top: 50px;
        right: 10px;
        background-color: rgba(64, 170, 209, 0.6);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .edit-btn:hover {
        background-color: rgba(41, 128, 185, 0.8);
        color: white;
        transform: scale(1.1);
    }

    /* Product view grid */
    .product-view {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
        padding: 1rem;
    }

    @media screen and (max-width: 768px) {
        .product-view {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }

    @media screen and (max-width: 480px) {
        .product-view {
            grid-template-columns: 1fr;
        }
        
        .card__article {
            min-width: 100%;
            max-width: 100%;
        }
    }

    .cancelled-inquiry {
        transition: opacity 0.3s ease;
    }

    .cancelled-inquiry:hover {
        opacity: 0.8 !important;
    }

    .status-cancelled small {
        display: block;
        font-size: 0.75em;
        margin-top: 2px;
        color: #666;
    }
    </style>
    


</head>

<body>

    <!--======= SIDEBAR SECTION =======-->
    <div class="sidebar">
        <div class="sidebar-container">
            <div class="sidebar-logo">
                <a href="./index.php" class="logo-wrapper">
                    <div class="logo-image">
                        <img src="images/gimmie-logo.jpg" alt="Gimmie Logo">
                    </div>
                    <div class="logo-text">
                        <h1>Gimmie</h1>
                        <span>Ooty Bakery & Confectionery</span>
                    </div>
                </a>
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
                        <a href="#product-edit">
                            <i class='bx bx-category'></i>
                            <span>Edit Products</span>
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
                        <!-- <a href="#" class="darkmode-toggle" id="darkmode-toggle">
                            Darkmode
                            <span class="darkmode-switch"></span>
                        </a> -->
                        <form action="logout.php" method="POST" style="display: inline; width: 90%;background-color: var(--box-bg)">
                            <button type="submit" id="logout">
                                <i class='bx bx-log-out bx-flip-horizontal'></i><span>Logout</span>
                            </button>
                        </form>
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
                                    <div class="counter-details">
                                        <div class="counter-count" id="inquiryCounter">
                                            <?php
                                                $con = new mysqli("localhost", "root", "", "ooty_baker");
                                                $result = $con->query("SELECT COUNT(*) as total FROM business_inquiries");
                                                $count = $result->fetch_assoc();
                                                echo $count['total'];
                                            ?>
                                        </div>
                                        <div class="counter-subtitle">Total Business Inquiries</div>
                                        <div class="counter-trend">
                                            <?php
                                                // Get count from previous month
                                                $result = $con->query("SELECT COUNT(*) as prev_total FROM business_inquiries WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 MONTH)");
                                                $prev_count = $result->fetch_assoc();
                                                $trend = $count['total'] - $prev_count['prev_total'];
                                                $trend_icon = $trend >= 0 ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt';
                                                $trend_color = $trend >= 0 ? 'text-success' : 'text-danger';
                                            ?>
                                            <i class='bx <?php echo $trend_icon; ?> <?php echo $trend_color; ?>'></i>
                                            <span class="<?php echo $trend_color; ?>">
                                                <?php echo $prev_count['prev_total']; ?> last month
                                            </span>
                                        </div>
                                    </div>
                                    <div class="counter-icon">
                                        <i class='bx bxs-business'></i>
                                    </div>
                                </div>
                            </div>
                            <!-- END COUNTER -->
                        </div>
                    </div>

                    <div class="col-3 col-md-6 col-sm-12">
                        <div class="box box-hover">
                            <!-- New Inquiries This Week -->
                            <div class="counter">
                                <div class="counter-title">
                                    New Inquiries This Week
                                </div>
                                <div class="counter-info">
                                    <div class="counter-details">
                                        <div class="counter-count">
                                            <?php
                                                $result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND status = 'new'");
                                                $count = $result->fetch_assoc();
                                                echo $count['total'];
                                            ?>
                                        </div>
                                        <div class="counter-subtitle">New Inquiries</div>
                                        <div class="counter-trend">
                                            <?php
                                                $result = $con->query("SELECT COUNT(*) as prev_total FROM business_inquiries WHERE created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY) AND status = 'new'");
                                                $prev_count = $result->fetch_assoc();
                                                $trend = $count['total'] - $prev_count['prev_total'];
                                                $trend_icon = $trend >= 0 ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt';
                                                $trend_color = $trend >= 0 ? 'text-success' : 'text-danger';
                                            ?>
                                            <i class='bx <?php echo $trend_icon; ?> <?php echo $trend_color; ?>'></i>
                                            <span class="<?php echo $trend_color; ?>">
                                                <?php echo $prev_count['prev_total']; ?> last week
                                            </span>
                                        </div>
                                    </div>
                                    <div class="counter-icon">
                                        <i class='bx bx-plus-circle'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-3 col-md-6 col-sm-12">
                        <div class="box box-hover">
                            <!-- In Progress Inquiries -->
                            <div class="counter">
                                <div class="counter-title">
                                    In Progress Inquiries
                                </div>
                                <div class="counter-info">
                                    <div class="counter-details">
                                        <div class="counter-count">
                                            <?php
                                                $result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE status = 'in-progress'");
                                                $count = $result->fetch_assoc();
                                                echo $count['total'];
                                            ?>
                                        </div>
                                        <div class="counter-subtitle">Active Inquiries</div>
                                        <div class="counter-trend">
                                            <?php
                                                $result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE status = 'in-progress' AND updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
                                                $recent = $result->fetch_assoc();
                                                $trend = $recent['total'];
                                                $trend_icon = 'bx-time';
                                                $trend_color = 'text-warning';
                                            ?>
                                            <i class='bx <?php echo $trend_icon; ?> <?php echo $trend_color; ?>'></i>
                                            <span class="<?php echo $trend_color; ?>">
                                                <?php echo $trend; ?> updated this week
                                            </span>
                                        </div>
                                    </div>
                                    <div class="counter-icon">
                                        <i class='bx bx-loader-alt'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-3 col-md-6 col-sm-12">
                        <div class="box box-hover">
                            <!-- Completed Inquiries This Week -->
                            <div class="counter">
                                <div class="counter-title">
                                    Completed This Week
                                </div>
                                <div class="counter-info">
                                    <div class="counter-details">
                                        <div class="counter-count">
                                            <?php
                                                $result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE status = 'completed' AND updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
                                                $count = $result->fetch_assoc();
                                                echo $count['total'];
                                            ?>
                                        </div>
                                        <div class="counter-subtitle">Completed Inquiries</div>
                                        <div class="counter-trend">
                                            <?php
                                                $result = $con->query("SELECT COUNT(*) as prev_total FROM business_inquiries WHERE status = 'completed' AND updated_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND updated_at < DATE_SUB(NOW(), INTERVAL 7 DAY)");
                                                $prev_count = $result->fetch_assoc();
                                                $trend = $count['total'] - $prev_count['prev_total'];
                                                $trend_icon = $trend >= 0 ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt';
                                                $trend_color = $trend >= 0 ? 'text-success' : 'text-danger';
                                            ?>
                                            <i class='bx <?php echo $trend_icon; ?> <?php echo $trend_color; ?>'></i>
                                            <span class="<?php echo $trend_color; ?>">
                                                <?php echo abs($trend); ?> vs last week
                                            </span>
                                        </div>
                                    </div>
                                    <div class="counter-icon">
                                        <i class='bx bx-check-circle'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-3 col-md-6 col-sm-12">
                        <div class="box box-hover">
                            <!-- Cancelled Inquiries This Week -->
                            <div class="counter">
                                <div class="counter-title">
                                    Cancelled This Week
                                </div>
                                <div class="counter-info">
                                    <div class="counter-details">
                                        <div class="counter-count">
                                            <?php
                                                $result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE status = 'cancelled' AND updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
                                                $count = $result->fetch_assoc();
                                                echo $count['total'];
                                            ?>
                                        </div>
                                        <div class="counter-subtitle">Cancelled Inquiries</div>
                                        <div class="counter-trend">
                                            <?php
                                                $result = $con->query("SELECT COUNT(*) as prev_total FROM business_inquiries WHERE status = 'cancelled' AND updated_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND updated_at < DATE_SUB(NOW(), INTERVAL 7 DAY)");
                                                $prev_count = $result->fetch_assoc();
                                                $trend = $count['total'] - $prev_count['prev_total'];
                                                $trend_icon = $trend >= 0 ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt';
                                                $trend_color = $trend >= 0 ? 'text-danger' : 'text-success';
                                            ?>
                                            <i class='bx <?php echo $trend_icon; ?> <?php echo $trend_color; ?>'></i>
                                            <span class="<?php echo $trend_color; ?>">
                                                <?php echo abs($trend); ?> vs last week
                                            </span>
                                        </div>
                                    </div>
                                    <div class="counter-icon">
                                        <i class='bx bx-x-circle'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                

                
                    <div class="col-3 col-md-6 col-sm-12">
                        <div class="box box-hover">
                            <!-- Average Response Time -->
                            <div class="counter">
                                <div class="counter-title">
                                    Average Response Time
                                </div>
                                <div class="counter-info">
                                    <div class="counter-details">
                                        <div class="counter-count">
                                            <?php
                                                $result = $con->query("SELECT AVG(TIMESTAMPDIFF(HOUR, created_at, updated_at)) as avg_time FROM business_inquiries WHERE status != 'new'");
                                                $avg = $result->fetch_assoc();
                                                echo round($avg['avg_time'], 1) . 'h';
                                            ?>
                                        </div>
                                        <div class="counter-subtitle">Hours to First Response</div>
                                        <div class="counter-trend">
                                            <?php
                                                $result = $con->query("SELECT AVG(TIMESTAMPDIFF(HOUR, created_at, updated_at)) as avg_time FROM business_inquiries WHERE status != 'new' AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
                                                $recent = $result->fetch_assoc();
                                                $trend = round($recent['avg_time'], 1);
                                                $trend_icon = 'bx-time';
                                                $trend_color = 'text-info';
                                            ?>
                                            <i class='bx <?php echo $trend_icon; ?> <?php echo $trend_color; ?>'></i>
                                            <span class="<?php echo $trend_color; ?>">
                                                <?php echo $trend; ?>h this week
                                            </span>
                                        </div>
                                    </div>
                                    <div class="counter-icon">
                                        <i class='bx bx-timer'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-3 col-md-6 col-sm-12">
                        <div class="box box-hover">
                            <!-- Conversion Rate -->
                            <div class="counter">
                                <div class="counter-title">
                                    Conversion Rate
                                </div>
                                <div class="counter-info">
                                    <div class="counter-details">
                                        <div class="counter-count">
                                            <?php
                                                $result = $con->query("SELECT 
                                                    (COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 / COUNT(*)) as conversion_rate 
                                                    FROM business_inquiries 
                                                    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
                                                $rate = $result->fetch_assoc();
                                                echo round($rate['conversion_rate'], 1) . '%';
                                            ?>
                                        </div>
                                        <div class="counter-subtitle">Last 30 Days</div>
                                        <div class="counter-trend">
                                            <?php
                                                $result = $con->query("SELECT 
                                                    (COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 / COUNT(*)) as conversion_rate 
                                                    FROM business_inquiries 
                                                    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
                                                $recent = $result->fetch_assoc();
                                                $trend = round($recent['conversion_rate'], 1);
                                                $trend_icon = 'bx-trending-up';
                                                $trend_color = 'text-success';
                                            ?>
                                            <i class='bx <?php echo $trend_icon; ?> <?php echo $trend_color; ?>'></i>
                                            <span class="<?php echo $trend_color; ?>">
                                                <?php echo $trend; ?>% this week
                                            </span>
                                        </div>
                                    </div>
                                    <div class="counter-icon">
                                        <i class='bx bx-line-chart'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-3 col-md-6 col-sm-12">
                        <div class="box box-hover">
                            <!-- Estimated Total Value -->
                            <div class="counter">
                                <div class="counter-title">
                                    Estimated Value
                                </div>
                                <div class="counter-info">
                                    <div class="counter-details">
                                        <div class="counter-count">
                                            <?php
                                                $result = $con->query("
                                                    SELECT SUM(p.price) as total_value 
                                                    FROM business_inquiries bi
                                                    JOIN business_inquiry_products bip ON bi.id = bip.inquiry_id
                                                    JOIN products p ON bip.product_id = p.id
                                                    WHERE bi.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                                                ");
                                                $value = $result->fetch_assoc();
                                                echo '₹' . number_format($value['total_value'], 0);
                                            ?>
                                        </div>
                                        <div class="counter-subtitle">This Week's Potential</div>
                                        <div class="counter-trend">
                                            <?php
                                                $result = $con->query("
                                                    SELECT SUM(p.price) as total_value 
                                                    FROM business_inquiries bi
                                                    JOIN business_inquiry_products bip ON bi.id = bip.inquiry_id
                                                    JOIN products p ON bip.product_id = p.id
                                                    WHERE bi.created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) 
                                                    AND bi.created_at < DATE_SUB(NOW(), INTERVAL 7 DAY)
                                                ");
                                                $prev_value = $result->fetch_assoc();
                                                $trend = $value['total_value'] - $prev_value['total_value'];
                                                $trend_icon = $trend >= 0 ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt';
                                                $trend_color = $trend >= 0 ? 'text-success' : 'text-danger';
                                            ?>
                                            <i class='bx <?php echo $trend_icon; ?> <?php echo $trend_color; ?>'></i>
                                            <span class="<?php echo $trend_color; ?>">
                                                ₹<?php echo number_format(abs($trend), 0); ?> vs last week
                                            </span>
                                        </div>
                                    </div>
                                    <div class="counter-icon">
                                        <i class='bx bx-rupee'></i>
                                    </div>
                                </div>
                            </div>
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
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>    
                                    </thead>
                                    <tbody>
                                    <?php
                                        $con = new mysqli("localhost", "root", "", "ooty_baker");
                                        // First get non-cancelled inquiries
                                        $query = "SELECT * FROM business_inquiries WHERE status != 'cancelled' ORDER BY created_at DESC";
                                        $result = $con->query($query);
                                        while ($row = $result->fetch_assoc()) {
                                    ?>
                                        <tr data-inquiry-id="<?= $row['id'] ?>">
                                            <td><?= htmlspecialchars($row['business_name']) ?></td>
                                            <td><?= htmlspecialchars($row['contact_person_name']) ?></td>
                                            <td><?= $row['phone'] ?></td>
                                            <td><?= $row['estimated_quantity'] ?></td>
                                            <td><?= $row['delivery_frequency'] ?></td>
                                            <td>
                                                <span class="status-badge status-<?= strtolower(htmlspecialchars($row['status'])) ?>">
                                                    <?= ucfirst(htmlspecialchars($row['status'])) ?>
                                                </span>
                                            </td>
                                            <td>
                                                <div class="table-button">
                                                    <button class="blue-button btn btn-outline">
                                                        <a href="view_inquiry.php?id=<?= $row['id'] ?>"><i class='bx bx-show'></i></a>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    <?php } 
                                    
                                    // Then get cancelled inquiries
                                    $query = "SELECT * FROM business_inquiries WHERE status = 'cancelled' ORDER BY updated_at DESC";
                                    $result = $con->query($query);
                                    while ($row = $result->fetch_assoc()) {
                                        $updated_date = new DateTime($row['updated_at']);
                                        $current_date = new DateTime();
                                        $days_diff = $current_date->diff($updated_date)->days;
                                        $days_remaining = 15 - $days_diff;
                                    ?>
                                        <tr data-inquiry-id="<?= $row['id'] ?>" class="cancelled-inquiry" style="opacity: 0.6;">
                                            <td><?= htmlspecialchars($row['business_name']) ?></td>
                                            <td><?= htmlspecialchars($row['contact_person_name']) ?></td>
                                            <td><?= $row['phone'] ?></td>
                                            <td><?= $row['estimated_quantity'] ?></td>
                                            <td><?= $row['delivery_frequency'] ?></td>
                                            <td>
                                                <span class="status-badge status-cancelled">
                                                    <?= ucfirst(htmlspecialchars($row['status'])) ?>
                                                    <?php if ($days_remaining > 0): ?>
                                                        <small>(<?= $days_remaining ?> days left)</small>
                                                    <?php endif; ?>
                                                </span>
                                            </td>
                                            <td>
                                                <div class="table-button">
                                                    <button class="blue-button btn btn-outline">
                                                        <a href="view_inquiry.php?id=<?= $row['id'] ?>"><i class='bx bx-show'></i></a>
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
            <form class="product-form" id="productForm" enctype="multipart/form-data" onsubmit="return validateForm()">
                <div class="form-group">
                    <label for="name">Product Name:</label>
                    <input type="text" id="name" name="name" required minlength="2" maxlength="100" pattern="[A-Za-z0-9\s\-]+" title="Only letters, numbers, spaces and hyphens allowed">
                </div>

                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" rows="4" maxlength="50"></textarea>
                </div>

                <div class="form-group">
                    <label for="variety">Variety:</label>
                    <select id="variety" name="variety" required>
                        <option value="">Select a variety</option>
                        <option value="Candy">Candy</option>
                        <option value="Coated Candy">Coated Candy</option>
                        <option value="Jelly">Jelly</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="price">Price:</label>
                    <input type="number" id="price" name="price" step="0.01" min="0.01" required>
                </div>

                <div class="form-group">
                    <label for="price_per_gram">Price per Gram:</label>
                    <input type="number" id="price_per_gram" name="price_per_gram" step="0.01" min="0.01" required>
                </div>

                <div class="form-group">
                    <label for="veg_status">Vegetarian Status:</label>
                    <select id="veg_status" name="veg_status" required>
                        <option value="">Select status</option>
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>
                </div>

                <div class="form-group" style="grid-column: 1 / -1; margin-top: 20px;">
                    <label for="imageUpload" style="display: block; margin-bottom: 10px; font-weight: 500;">Product Image:</label>
                    <div style="border: 2px dashed #ccc; padding: 20px; border-radius: 8px; text-align: center;">
                        <input type="file" id="imageUpload" name="imageUpload" accept="image/jpeg,image/png,image/jpg" required style="width: 100%;">
                    </div>
                </div>

                <button type="submit" class="submit-btn" style="grid-column: 1 / -1; margin-top: 20px;">Insert Product</button>
            </form>
        </div>

    </Section>




    <section id="product-edit" class="hidden">
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
        <article class="card__article" data-product-id="<?php echo $row['id']; ?>">
            <!-- Delete button -->
            <a href="javascript:void(0)" class="delete-btn" onclick="deleteProduct(<?php echo $row['id']; ?>)">×</a>
            <!-- Edit button -->
            <a href="javascript:void(0)" class="edit-btn" onclick="editProduct(<?php echo $row['id']; ?>)">
                <i class='bx bx-edit'></i>
            </a>
            
            <img src="<?php echo htmlspecialchars($row['image_path']); ?>" alt="image" class="card__img">
            
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
                    <span class="value">₹<?php echo number_format($row['price'], 2); ?></span>
                </div>

                <?php if (!is_null($row['price_per_gram'])): ?>
                    <div class="price-row">
                        <span class="label">Price per gram:</span>
                        <span class="value">₹<?php echo number_format($row['price_per_gram'], 2); ?>/g</span>
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
            const exportBtn = document.querySelector('.box-actions button:last-child');
            const originalText = exportBtn.innerHTML;
            exportBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Exporting...';
            exportBtn.disabled = true;

            fetch('export_inquiries.php') // ← GET by default, no JSON header
            .then(response => {
                if (!response.ok) throw new Error('Export failed');
                return response.blob();
            })
            .then(blob => {
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
                        // Remove the entire product card
                        const productCard = document.querySelector(`.card__article[data-product-id="${id}"]`);
                        if (productCard) {
                            productCard.remove();
                        } else {
                            // If the card isn't found, refresh the product list
                            fetch('get_products.php')
                                .then(response => response.text())
                                .then(html => {
                                    document.querySelector('.product-view').innerHTML = html;
                                })
                                .catch(error => {
                                    console.error('Error fetching products:', error);
                                });
                        }
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

        function editProduct(id) {
            // Redirect to edit product page with the product ID
            window.location.href = 'edit_product.php?id=' + id;
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

    <script>
        // Function to update all counters
        function updateAllCounters() {
            fetch('get_dashboard_stats.php')
                .then(response => response.json())
                .then(data => {
                    // Update Total Inquiries
                    document.querySelector('#inquiryCounter').textContent = data.total_inquiries;
                    document.querySelector('#inquiryCounter').closest('.counter-trend').querySelector('span').textContent = data.last_month_inquiries + ' last month';
                    
                    // Update New Inquiries
                    const newInquiriesCounter = document.querySelector('.counter-title:contains("New Inquiries This Week")').closest('.counter').querySelector('.counter-count');
                    newInquiriesCounter.textContent = data.new_inquiries;
                    newInquiriesCounter.closest('.counter-trend').querySelector('span').textContent = data.last_week_new_inquiries + ' last week';
                    
                    // Update In Progress
                    const inProgressCounter = document.querySelector('.counter-title:contains("In Progress Inquiries")').closest('.counter').querySelector('.counter-count');
                    inProgressCounter.textContent = data.in_progress;
                    inProgressCounter.closest('.counter-trend').querySelector('span').textContent = data.updated_this_week + ' updated this week';
                    
                    // Update Completed
                    const completedCounter = document.querySelector('.counter-title:contains("Completed This Week")').closest('.counter').querySelector('.counter-count');
                    completedCounter.textContent = data.completed;
                    completedCounter.closest('.counter-trend').querySelector('span').textContent = data.completed_vs_last_week + ' vs last week';
                    
                    // Update Cancelled
                    const cancelledCounter = document.querySelector('.counter-title:contains("Cancelled This Week")').closest('.counter').querySelector('.counter-count');
                    cancelledCounter.textContent = data.cancelled;
                    cancelledCounter.closest('.counter-trend').querySelector('span').textContent = data.cancelled_vs_last_week + ' vs last week';
                    
                    // Update Response Time
                    const responseTimeCounter = document.querySelector('.counter-title:contains("Average Response Time")').closest('.counter').querySelector('.counter-count');
                    responseTimeCounter.textContent = data.avg_response_time + 'h';
                    responseTimeCounter.closest('.counter-trend').querySelector('span').textContent = data.this_week_response_time + 'h this week';
                    
                    // Update Conversion Rate
                    const conversionCounter = document.querySelector('.counter-title:contains("Conversion Rate")').closest('.counter').querySelector('.counter-count');
                    conversionCounter.textContent = data.conversion_rate + '%';
                    conversionCounter.closest('.counter-trend').querySelector('span').textContent = data.this_week_conversion + '% this week';
                    
                    // Update Estimated Value
                    const valueCounter = document.querySelector('.counter-title:contains("Estimated Value")').closest('.counter').querySelector('.counter-count');
                    valueCounter.textContent = '₹' + data.estimated_value;
                    valueCounter.closest('.counter-trend').querySelector('span').textContent = '₹' + data.value_vs_last_week + ' vs last week';
                    
                    // Update trend icons and colors
                    updateTrendIndicators();
                })
                .catch(error => console.error('Error fetching dashboard stats:', error));
        }

        // Function to update trend indicators
        function updateTrendIndicators() {
            document.querySelectorAll('.counter-trend').forEach(trend => {
                const count = parseInt(trend.querySelector('.counter-count').textContent);
                const lastPeriod = parseInt(trend.querySelector('span').textContent);
                const trend = count - lastPeriod;
                
                const icon = trend.querySelector('i');
                const span = trend.querySelector('span');
                
                if (trend >= 0) {
                    icon.className = 'bx bx-up-arrow-alt text-success';
                    span.className = 'text-success';
                } else {
                    icon.className = 'bx bx-down-arrow-alt text-danger';
                    span.className = 'text-danger';
                }
            });
        }

        // Set up Server-Sent Events for real-time updates
        function setupSSE() {
            const evtSource = new EventSource('dashboard_events.php');
            
            evtSource.onmessage = function(event) {
                updateAllCounters();
            };
            
            evtSource.onerror = function(err) {
                console.error("EventSource failed:", err);
                // Attempt to reconnect after 5 seconds
                setTimeout(setupSSE, 5000);
            };
        }

        // Initial update and setup SSE
        document.addEventListener('DOMContentLoaded', function() {
            updateAllCounters();
            setupSSE();
        });
    </script>

    <script>
    function validateForm() {
        // Get form elements
        const name = document.getElementById('name').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const pricePerGram = parseFloat(document.getElementById('price_per_gram').value);
        const imageFile = document.getElementById('imageUpload').files[0];
        
        // Validate name
        if (name.length < 2 || name.length > 100) {
            showMessage('Name must be between 2 and 100 characters', false);
            return false;
        }
        
        // Validate prices
        if (price <= 0 || pricePerGram <= 0) {
            showMessage('Prices must be greater than 0', false);
            return false;
        }
        
        // Validate image
        if (imageFile) {
            // Check file size (max 5MB)
            if (imageFile.size > 5 * 1024 * 1024) {
                showMessage('Image size must be less than 5MB', false);
                return false;
            }
            
            // Check file type
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(imageFile.type)) {
                showMessage('Only JPG, JPEG and PNG images are allowed', false);
                return false;
            }
        }
        
        return true;
    }
    </script>

</body>

</html>

