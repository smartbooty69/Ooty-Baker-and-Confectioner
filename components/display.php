       <!-- The Modal DISPAY -->
       <html>
    <head>
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"> -->

        <style>
            body
{ 
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
            #displayMemberImage{
                border-radius: 120px;
            }
            table{
                font-weight: 900;
                font-size: 15px;
            }
            .modal {
                /* Hidden by default */
                position: fixed;
                z-index: 1000; /* Sit on top */
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                background-color: rgba(0, 0, 0, 0.6); /* Black with opacity */
            }

            /* Modal Content */
            .modal-content {
                background-color: #fefefe;
                margin: 10% auto; /* Center vertically and horizontally */
                padding: 30px;
                border-radius: 8px;
                width: 80%;
                max-width: 600px; /* Adjusted for larger screens */
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add some shadow */
                margin-top: 15px;
            }

            /* Close Button */
            .close {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
            }

            .close:hover,
            .close:focus {
                color: #333;
                text-decoration: none;
                cursor: pointer;
            }

            /* Form Styles */
            form {
                margin-top: 20px;
            }

            form input[type="text"],
            form input[type="email"],
            form input[type="password"] {
                width: 100%;
                padding: 12px;
                margin-bottom: 15px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-radius: 5px;
                transition: border-color 0.3s ease;
            }

            form input[type="text"]:focus,
            form input[type="email"]:focus,
            form input[type="password"]:focus {
                border-color: #66afe9;
                outline: none;
            }

            form input[type="submit"],
            form button {
                background-color: #4CAF50;
                color: white;
                padding: 14px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                width: 100%;
                transition: background-color 0.3s ease;
            }

            form input[type="submit"]:hover,
            form button:hover {
                background-color: #45a049;
            }

            form label {
                font-weight: bold;
            }

            form table {
                width: 100%;
            }

            form table tr td {
                padding: 10px;
            }

            form table tr td button {
                padding: 10px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            form table tr td button:hover {
                background-color: #45a049;
            }

            form table tr td button a {
                text-decoration: none;
                color: white;
            }

            /* Button Styles */
            .blue-button,
            .btn {
                background-color: #4CAF50;
                color: white;
                padding: 14px 20px;
                margin: 8px 0;
                border: none;
                cursor: pointer;
                width: 100%;
                transition: background-color 0.3s ease;
                
            }

            .blue-button:hover,
            .btn:hover {
                background-color: #45a049;
            }

            /* Responsive Layout */
            @media (max-width: 600px) {
                .modal-content {
                    width: 90%; /* Adjusted for smaller screens */
                }
            }

        
        </style>    
        <script>
        // Function to redirect to dashboard.html
        function redirectToDashboard() {
            window.location.href = "dashboard.php";
        }
        
        // Wait for the document to be fully loaded
        document.addEventListener("DOMContentLoaded", function() {
            // Find the div element by its ID
            var redirectDiv = document.getElementById("full-member-detail");

            // Add a click event listener to the div
            redirectDiv.addEventListener("click", function() {
                // Call the function to redirect to dashboard.html
                redirectToDashboard();
            });
        });
    </script>
    </head>
    
        <body>
            <?php
            if(isset($_GET['id'])){
                $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
                if (mysqli_connect_error()) {
                    die("Connection failed: " . mysqli_connect_error());
                } 
                $id=$_GET['id'];
                $query="SELECT * FROM `member_details` where memberId='$id'";
                $result=mysqli_query($con,$query);
                if(!$result)
                    die("query failed".mysqli_error());
                else{
                    while($row=mysqli_fetch_assoc($result))
                    {

            ?>  
                    <div id="full-member-detail" class="modal">
                                <!-- Modal content -->
                                <div class="modal-content">
                                    
                                    <div class="modal-form" style="margin-bottom:10px">
                                        <form id="displayMemberForm" enctype="multipart/form-data">
                                            <table>
                                            <tr>
                                                    
                                                    <td colspan="2" align="center"><img src="uploads/<?php echo $row['memberImage']; ?>" id="displayMemberImage" alt="Member Image" height="125" width="125"></td>
                                                </tr>
                                            <tr>
                                                    <td style="padding-left:110px">
                                                        Member ID
                                                    </td>
                                                    <td><span id="displayMemberImage"><?php echo $row['memberId']; ?></span></td>
                                                </tr> 
                                                 
                                                <tr>
                                                    <td style="padding-left:110px">
                                                        Member Name
                                                    </td>
                                                    <td><span id="displayMemberName"><?php echo $row['memberName']; ?></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-left:110px">
                                                        Join Date
                                                    </td>
                                                    <td><span id="displayJoinDate"><?php echo $row['joinDate']; ?></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-left:110px">
                                                        Membership Package
                                                    </td>
                                                    <td><span id="displayMembershipPackage"><?php echo $row['membershipPackage']; ?></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-left:110px">
                                                        Expiry Date
                                                    </td>
                                                    <td><span id="displayMembershipPackage"><?php echo $row['packageExpiry']; ?></span></td>
                                                </tr>  
                                                <tr>
                                                    <td style="padding-left:110px">
                                                        Phone Number
                                                    </td>
                                                    <td><span id="displayMemberPhone"><?php echo $row['memberPhone']; ?></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-left:110px">
                                                        Email
                                                    </td>
                                                    <td><span id="displayMemberEmail"><?php echo $row['memberEmail']; ?></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-left:110px">
                                                        Age
                                                    </td>
                                                    <td><span id="displayMemberAge"><?php echo $row['memberAge']; ?></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-left:110px">
                                                        Address
                                                    </td>
                                                    <td><span id="displayMemberAddress"><?php echo $row['memberAddress']; ?></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-left:110px">
                                                        Gender
                                                    </td>
                                                    <td><span id="displayMemberGender"><?php echo $row['memberGender']; ?></span></td>
                                                </tr> 
                                                <tr>
                                                    
                                                <td colspan="2" align="center"><a href="dashboard.php" class="blue-button btn btn-outline" style="text-decoration:none;">GO BACK</a></td>
                                                
                                                </tr> 
                                            </table>
                                        </form>
                                    </div>
                                </div>
                            </div>   
                            <?php
                                            }
                                        }
                                    }
                            ?>
    </body>
    </html>