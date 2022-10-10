<?php
$action=$_POST['action'];
$uname = $_POST['username'];
$passwd = $_POST['password'];
if ($action == "data"){
	$db = new PDO("mysql:dbname=fussmvnf_andrewdb;host=localhost","fussmvnf_andrew", "dbjR3Wr3");
	$uname = $db->quote($uname);
	// Prepare our SQL, preparing the SQL statement will prevent SQL injection.
	if ($rows = $db->query("SELECT id, username, password FROM accounts WHERE username = $uname;")){
		if ($rows->rowCount() == 1){
			$result = $rows->fetch(PDO::FETCH_ASSOC);
			if (password_verify($passwd, $result['password'])){
				session_regenerate_id();
				$_SESSION['loggedin'] = TRUE;
				$_SESSION['name'] = $_POST['username'];
				$_SESSION['id'] = $id;
				echo 'true';
			}
			else {
				// Incorrect password
				echo 'false';
			}
		}
		else {
			//Incorrect username
			echo 'false';
		}
	}
}
else {
	echo 'false';
}
?>