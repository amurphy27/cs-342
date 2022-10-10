<?php

require 'model.php';

$action=$_REQUEST['action'];

if ($action == "products")
{
	$rows = getProducts();
	$rowData = $rows->fetchAll();
    echo json_encode($rowData);
}
else if ($action == "register")
{
	$firstname=$_REQUEST['firstname'];
	$lastname=$_REQUEST['lastname'];
	$phone=$_REQUEST['phone'];
	$email=$_REQUEST['email'];
	$username=$_REQUEST['username'];
	$password=$_REQUEST['password'];
	$password1 = password_hash($password, PASSWORD_DEFAULT);

	echo setRegistration($firstname, $lastname, $phone, $email, $username, $password1);
}
else if ($action == "login")
{
	$username=$_REQUEST['username'];
	$password=$_REQUEST['password'];

	echo login($username, $password);
}
else
{
	echo 'no data';
}

?>
