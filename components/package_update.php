<?php
            if(isset($_POST['submit1'])){
                $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
                if (mysqli_connect_error()) {
                    die("Connection failed: " . mysqli_connect_error());
                } 
                $packageName=$_POST['packageName'];
                $packagePrice=$_POST['packagePrice'];
                $packageDuration=$_POST['packageDuration'];
                $query="UPDATE `package_details` SET `package_name`='$packageName',`package_price`='$packagePrice',`package_duration`='$packageDuration' WHERE packageid=1";
                $result=mysqli_query($con,$query);
                if(!$result)
                    die("query failed".mysqli_error());
                else{
                    header("location:../components/dashboard.php");
                    exit; 
                }
                mysqli_close($con);
            }
            elseif(isset($_POST['submit2'])){
                $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
                if (mysqli_connect_error()) {
                    die("Connection failed: " . mysqli_connect_error());
                } 
                $packageName=$_POST['packageName'];
                $packagePrice=$_POST['packagePrice'];
                $packageDuration=$_POST['packageDuration'];
                $query="UPDATE `package_details` SET `package_name`='$packageName',`package_price`='$packagePrice',`package_duration`='$packageDuration' WHERE packageid=2";
                $result=mysqli_query($con,$query);
                if(!$result)
                    die("query failed".mysqli_error());
                else{
                    header("location:../components/dashboard.php");
                    exit; 
                }
                mysqli_close($con);
            }
            elseif(isset($_POST['submit3'])){
                $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
                if (mysqli_connect_error()) {
                    die("Connection failed: " . mysqli_connect_error());
                } 
                $packageName=$_POST['packageName'];
                $packagePrice=$_POST['packagePrice'];
                $packageDuration=$_POST['packageDuration'];
                $query="UPDATE `package_details` SET `package_name`='$packageName',`package_price`='$packagePrice',`package_duration`='$packageDuration' WHERE packageid=3";
                $result=mysqli_query($con,$query);
                if(!$result)
                    die("query failed".mysqli_error());
                else{
                    header("location:../components/dashboard.php");
                    exit; 
                }
                mysqli_close($con);
            }
            elseif(isset($_POST['submit4'])){
                $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
                if (mysqli_connect_error()) {
                    die("Connection failed: " . mysqli_connect_error());
                } 
                $packageName=$_POST['packageName'];
                $packagePrice=$_POST['packagePrice'];
                $packageDuration=$_POST['packageDuration'];
                $query="UPDATE `package_details` SET `package_name`='$packageName',`package_price`='$packagePrice',`package_duration`='$packageDuration' WHERE packageid=4";
                $result=mysqli_query($con,$query);
                if(!$result)
                    die("query failed".mysqli_error());
                else{
                    header("location:../components/dashboard.php");
                    exit; 
                }
                mysqli_close($con);
            }
            elseif(isset($_POST['submit5'])){
                $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
                if (mysqli_connect_error()) {
                    die("Connection failed: " . mysqli_connect_error());
                } 
                $packageName=$_POST['packageName'];
                $packagePrice=$_POST['packagePrice'];
                $packageDuration=$_POST['packageDuration'];
                $query="UPDATE `package_details` SET `package_name`='$packageName',`package_price`='$packagePrice',`package_duration`='$packageDuration' WHERE packageid=5";
                $result=mysqli_query($con,$query);
                if(!$result)
                    die("query failed".mysqli_error());
                else{
                    header("location:../components/dashboard.php");
                    exit; 
                }
                mysqli_close($con);
            }
            elseif(isset($_POST['submit6'])){
                $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
                if (mysqli_connect_error()) {
                    die("Connection failed: " . mysqli_connect_error());
                } 
                $packageName=$_POST['packageName'];
                $packagePrice=$_POST['packagePrice'];
                $packageDuration=$_POST['packageDuration'];
                $query="UPDATE `package_details` SET `package_name`='$packageName',`package_price`='$packagePrice',`package_duration`='$packageDuration' WHERE packageid=6";
                $result=mysqli_query($con,$query);
                if(!$result)
                    die("query failed".mysqli_error());
                else{
                    header("location:../components/dashboard.php");
                    exit; 
                }
                mysqli_close($con);
            }
            elseif(isset($_POST['submit7'])){
                $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
                if (mysqli_connect_error()) {
                    die("Connection failed: " . mysqli_connect_error());
                } 
                $packageName=$_POST['packageName'];
                $packagePrice=$_POST['packagePrice'];
                $packageDuration=$_POST['packageDuration'];
                $query="UPDATE `package_details` SET `package_name`='$packageName',`package_price`='$packagePrice',`package_duration`='$packageDuration' WHERE packageid=7";
                $result=mysqli_query($con,$query);
                if(!$result)
                    die("query failed".mysqli_error());
                else{
                    header("location:../components/dashboard.php");
                    exit; 
                }
                mysqli_close($con);
            }
            elseif(isset($_POST['submit8'])){
                $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
                if (mysqli_connect_error()) {
                    die("Connection failed: " . mysqli_connect_error());
                } 
                $packageName=$_POST['packageName'];
                $packagePrice=$_POST['packagePrice'];
                $packageDuration=$_POST['packageDuration'];
                $query="UPDATE `package_details` SET `package_name`='$packageName',`package_price`='$packagePrice',`package_duration`='$packageDuration' WHERE packageid=8";
                $result=mysqli_query($con,$query);
                if(!$result)
                    die("query failed".mysqli_error());
                else{
                    header("location:../components/dashboard.php");
                    exit; 
                }
                mysqli_close($con);
            }
          


?>  