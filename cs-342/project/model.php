<?php

function getProducts()
{
	$db = new PDO("mysql:dbname=fussmvnf_andrewdb;host=localhost",
									"fussmvnf_andrew", "dbjR3Wr3");
	$rows = $db->query("SELECT id, name, description, price, qoh, image FROM products;");

	return $rows;
}

function setRegistration($firstname, $lastname, $phone, $email, $username, $password)
{
	$db = new PDO("mysql:dbname=fussmvnf_andrewdb;host=localhost",
									"fussmvnf_andrew", "dbjR3Wr3");

									
	$sql1 = "INSERT INTO accounts (id, username, password, email) VALUES (?, ?, ?, ?);";

	$stmt1 = $db->prepare($sql1);
	$status1 = $stmt1->execute([NULL, $username, $password, $email]);

	if ($status1 != 1)
	{
		return $status;
	}
	
	$id = $db->lastInsertId("id"); //grab the last id inserted

	$sql2 = "INSERT INTO users (id, firstname, lastname, phone) VALUES (?, ?, ?, ?);";

	$stmt2 = $db->prepare($sql2);
	$status2 = $stmt2->execute([$id, $firstname, $lastname, $phone]);

	return $status2;
}

function login($username, $password)
{
	$db = new PDO("mysql:dbname=fussmvnf_andrewdb;host=localhost",
									"fussmvnf_andrew", "dbjR3Wr3");
	$rows = $db->query("SELECT id, username, password FROM accounts WHERE username = '{$username}';");
	if ($rows->rowCount() > 0)
	{
		$result = $rows->fetch(PDO::FETCH_ASSOC);
		if (password_verify($password, $result['password']))
		{
			//valid login
			$_SESSION['loggedin'] = TRUE;
			$_SESSION['id'] = $result['id'];
			return 1;
		}
		else
		{
			// Incorrect password
			return "Incorrect password";
		}
	}
	else
	{
		//Incorrect username
		return "Invalid username";
	}
}
?>
