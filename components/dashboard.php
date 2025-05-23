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
    <link rel="stylesheet" href="../assets/css/dashboard/grid.css">
    <link rel="stylesheet" href="../assets/css/dashboard/app.css">
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
                <a href="#member" class="active">
                    <i class='bx bx-home'></i>
                    <span>Members</span>
                </a>
            </li>
            <li>
                <a href="#analytic">
                    <i class='bx bx-chart'></i>
                    <span>analytics</span>
                </a>
            </li>
            <li>
                <a href="#package">
                    <i class='bx bx-category'></i>
                    <span>package</span>
                </a>
            </li>
            <li>
                <a href="#maileditor">
                    <i class='bx bx-mail-send'></i>
                    <span>mail</span>
                </a>
            </li>
            <li>
                <a href="#reminder">
                    <i class='bx bx-alarm'></i>
                    <span>reminder</span>
                </a>
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
        <Section id= "member"> 
            <div class="main-content">
                <div class="row">
                    <div class="col-3 col-md-6 col-sm-12">
                        <div class="box box-hover">
                            <!-- COUNTER -->
                            <div class="counter">
                                <div class="counter-title">
                                    Total Members
                                </div>
                                <div class="counter-info">
                                    <div class="counter-count">
                                        <!-- Member count will be dynamically updated here -->
                                    </div>
                                    <i class='bx bxs-group'></i>
                                </div>
                            </div>
                            <!-- END COUNTER -->
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 col-md-6 col-sm-12">
                    </div>
                    <div class="col-12">
                        <!-- ORDERS TABLE -->
                        <div class="box">
                            <!-- BOX HEADER -->
                            <div class="box-header">
                                Members 
                                <div class="box-header-right">
                                    <!-- Search input field -->
                                    <!-- <div class="box-header-search">
                                        <input type="text" id="searchInput" placeholder="Search members..." class="search-input"> 
                                    </div> -->
                                    <!-- <div class="box-header-filter"> -->
                                        <!-- Add member button -->
                                        <!-- <button class="btn btn-outline" id="exp-btn">Expiring</button>
                                    </div>
                                    <div class="box-header-filter"> -->
                                        <!-- Add member button -->
                                        <!-- <button class="btn btn-outline" id="all-btn">All</button>
                                    </div> -->
                                <!-- Add member button -->
                                    <div class="box-header-button">
                                        <button class="btn btn-outline" id="myBtn">Add Member</button>
                                    </div>
                                </div>
                            </div>

                            <!--PHP CODE TO DISPLAY PACKAGE IN SELECT BUTTON-->
                            <?php
                                        $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
                                        if (mysqli_connect_error()) {
                                            die("Connection failed: " . mysqli_connect_error());
                                        } 
                                        $query="SELECT `package_name` FROM `package_details`";
                                        $result=mysqli_query($con,$query);
                                        if(!$result)
                                            die("query failed".mysqli_error());

                            ?>  

                            <!-- The Modal ADD -->
                            <div id="add-members" class="modal">
                                <!-- Modal content -->
                                <div class="modal-content">
                                    <span class="close">&times;</span>
                                    <div class="modal-form">
                                        <form id="addMemberForm" enctype="multipart/form-data"  method="POST" action="add_member.php">
                                            <table>
                                                <tr>
                                                    <td>Image</td>
                                                    <td><input type="file" id="memberImage" name="memberImage"></td>
                                                </tr>
                                                <tr>
                                                    <td>Member Name</td>
                                                    <td><input type="text" id="memberName" name="memberName" placeholder="Member Name"></td>
                                                </tr>
                                                <tr>
                                                    <td>Join Date</td>
                                                    <td><input type="date" id="joinDate" name="joinDate" placeholder="demo"></td>
                                                </tr>
                                                <tr>
                                                    <td>Membership Package</td>
                                                    <td><select id="membershipPackage" name="membershipPackage">
                                                    <?php
                                                         while($row=mysqli_fetch_assoc($result))
                                                        {
                                                    ?>
                                                            <option><?php echo $row['package_name']; ?></option>
                                                        <?php
                                                        }
                                                        ?>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Phone Number</td>
                                                    <td><input type="text" id="memberPhone" name="memberPhone" placeholder="Phone"></td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td><input type="email" id="memberEmail" name="memberEmail" placeholder="Email"></td>
                                                </tr>
                                                <tr>
                                                    <td>Date of Birth</td>
                                                    <td><input type="date" id="memberAge" name="dateOfBirth" placeholder="Age"></td>
                                                </tr>
                                                <tr>
                                                    <td>Address</td>
                                                    <td><input type="text" id="memberAddress" name="memberAddress" placeholder="Address"></td>
                                                </tr>
                                                <tr>
                                                    <td>Gender</td>
                                                    <td><select id="memberGender" name="memberGender">
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </select></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td><button class="btn btn-outline" type="submit" name="submit">Submit</button></td>
                                                </tr>
                                            </table>
                                        </form>
                                    </div>
                                </div>
                            </div>
                                       

                           <div class="box-body">
                                <table id="display-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Join Date</th>
                                            <th>Membership</th>
                                        </tr>    
                                    </thead>

                                     <!--DATABASE CONNECTION AND QUERY FOR DISPLAYING MEMBER DATA-->
                                    <?php
                                        $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
                                        if (mysqli_connect_error()) {
                                            die("Connection failed: " . mysqli_connect_error());
                                        } 
                                        $query="SELECT `memberId`, `memberImage`, `memberName`, `membershipPackage`, `joinDate` FROM `member_details`";
                                        $result=mysqli_query($con,$query);
                                        if(!$result)
                                            die("query failed".mysqli_error());
                                        else{
                                            while($row=mysqli_fetch_assoc($result))
                                            {

                                     ?>  
                                    <tbody>
                                        <tr>
                                            <td><?php echo $row['memberId']; ?></td>
                                            <!-- <td> -->
                                              
                                                <td><img src="uploads/<?= $row['memberImage']; ?>" height="25" width="25"></td> <!-- Update the image path accordingly -->
                                               
                                            <!-- </td> -->
                                            <td><?php echo $row['memberName']; ?></td>
                                            <td><?php echo $row['joinDate']; ?></td>
                                            <td><?php echo $row['membershipPackage']; ?></td>
                                            <td>
                                                <div class="table-button">
                                                   <button class="green-button btn btn-outline" id="renew-package-button"><a href="renew.php?id=<?php echo $row['memberId']; ?>">Renew</a></button>
                                                    <button class="red-button btn btn-outline"><a href="delete.php?id=<?php echo $row['memberId']; ?>"><i class='bx bxs-user-minus'></i></a></button>
                                                    <button class="blue-button btn btn-outline" id="show-data-button"><a href="display.php?id=<?php echo $row['memberId']; ?>"><i class='bx bx-id-card'></i></a></button> <!-- Added a class for easier selection -->
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <?php
                                            }
                                        }
                                        ?>
                                </table>
                            </div>                            
                        </div>
                        <!-- END OF MEMBERS TABLE -->
                    </div>
                </div>
            </div>
            
        </Section>
        
        <!--======= END OF DASHBOARD =======-->



    <!--======= PACKAGE SECTION =======-->
           
    <Section id="package" class="hidden">
   
    </Section>

    <!--======= END OF PACKAGE =======-->
   
    
   

    
  


    <!-- SCRIPT -->
    <!-- BOOTSTARP JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <!-- APP JS -->
    <script src="../assets/js/dashboard/app.js"></script>
    <!-- TEXT EDITOR -->
    <script src="../assets/js/texteditor/script.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            // Make AJAX request to fetch member count
            $.ajax({
                type: "GET",
                url: "total_count.php",
                success: function(response) {
                    // Update the HTML content with the retrieved member count
                    $('.counter-count').text(response);
                },
                error: function() {
                    // Handle AJAX error (optional)
                    console.log('Error fetching member count.');
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
    

</body>

</html>

