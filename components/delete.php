<?php
    $con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
    if (mysqli_connect_error()) {
        die("Connection failed: " . mysqli_connect_error());
    } 
    if(isset($_GET['id'])){
        $id=$_GET['id'];
        $query="DELETE FROM business_inquiries_details WHERE businessInquiriesId='$id'";
        $result=mysqli_query($con,$query);
        if(!$result){
            die("query failed".mysqli_query_error());
   
    }else{  
        header("location:../components/dashboard.php");
        exit; 
    }

    mysqli_close($con);
}
?>