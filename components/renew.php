
<?php
    $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
    if (mysqli_connect_error()) {
        die("Connection failed: " . mysqli_connect_error());
    } 
    if(isset($_GET['id'])){
        $id=$_GET['id'];
 
        $query="SELECT `memberId`, `memberName` FROM `member_details` WHERE memberId='$id'";
        $result=mysqli_query($con,$query);
        if(!$result){
            die("query failed".mysqli_error());
        }
        else{
            $row=mysqli_fetch_assoc($result);
            $query1="SELECT `package_name` FROM `package_details`";
            $result1=mysqli_query($con,$query1);
            if(!$result1)
                die("query failed".mysqli_error());
    ?>
    <head>
        <style>
            /* Modal Container */
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
            var redirectDiv = document.getElementById("close");

            // Add a click event listener to the div
            redirectDiv.addEventListener("click", function() {
                // Call the function to redirect to dashboard.html
                redirectToDashboard();
            });
        });
    </script>
    </head>
<body>
<div class="modal" id="modal_div">
    <div class="modal-content">
        <a href="dashboard.php" style="text-decoration:none;"><b><span Id="close" class="close">&times;</span></b></a>
        <form method="POST" action="renew.php?id_new=<?php echo $row['memberId']; ?>">
            <table>
                <th colspan="2">
                    <h3>UPDATE MEMBERSHIP</h3>
                </th>
                <tr>
                    <td>MEMBER ID:</td>
                    <td><input type="text" name="memberId" value="<?php echo $row['memberId']; ?>" class="form-input"></td>
                </tr>
                <tr>
                    <td>MEMBER NAME:</td>
                    <td><input type="text" name="memberName" value="<?php echo $row['memberName']; ?>" class="form-input"></td>
                </tr>
                <tr>
                    <td>RENEWAL DATE:</td>
                    <td><input type="date" name="renewaldate" class="form-input"></td>
                </tr>
                <tr>
                    <td>MEMBERSHIP PACKAGE:</td>
                    <td>
                        <select id="membershipPackage" name="membershipPackage" class="form-select">
                            <?php while($row1=mysqli_fetch_assoc($result1)) { ?>
                                <option><?php echo $row1['package_name']; ?></option>
                            <?php } ?>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" name="update" value="Update" class="blue-button">
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>

        </body>

<?php
}
}   

 ?>
    <?php
            if(isset($_POST['update'])){
                echo "hello";
                if(isset($_POST['memberId'])){
                        echo $id_new=$_POST['memberId'];
                        echo $memberName=$_POST['memberName'];
                        echo $membershipPackage=$_POST['membershipPackage'];
                        $renewaldate=$_POST['renewaldate'];
                        $packageDurationQuery = "SELECT package_duration FROM package_details WHERE package_name = '$membershipPackage'";
                        $result = $con->query($packageDurationQuery);

                        if ($result && $result->num_rows > 0) {
                            $row = $result->fetch_assoc();
                            $packageDuration = $row['package_duration'];
                            $joinDateTime = new DateTime($renewaldate);
                            $expiryDate = clone $joinDateTime;
                            $expiryDate->modify("+" . $packageDuration); // Add package duration to join date

                            $packageExpiry = $expiryDate->format('Y-m-d');

                            $query="UPDATE `member_details` SET `memberId`='$id_new',`memberName`='$memberName',`membershipPackage`='$membershipPackage',`joinDate`='$renewaldate',`packageExpiry`='$packageExpiry' WHERE memberId='$id_new'";
                            $result=mysqli_query($con,$query);
                            if(!$result){
                                die("query failed".mysqli_error());
                            }
                            else{
                                header("location:../components/dashboard.php");
                                exit;
                        }
                        mysqli_close($con);
                    }
                }
            }
?> 

