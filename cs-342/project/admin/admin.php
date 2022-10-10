<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Lab 8</title>

</head>
<body>
<?php

$action=$_REQUEST['action'];
$database= "mysql:dbname=fussmvnf_andrewdb;host=localhost";
$user = "fussmvnf_andrew";
$password = "dbjR3Wr3";

$db = new PDO($database, $user, $password);
if ($action == "delete"){
	$id=$_REQUEST['id'];
	$sql = "DELETE FROM products WHERE id=?";
	$stmt = $db->prepare($sql);
	$status = $stmt->execute([$id]);
	if ($status == 1){
?>
		<h2>Deleted Product ID <?= $id; ?></h2>
<?php
	}
	else {
		echo "Error on delete";
	}
?>
	<br><hr>
	<form method="get" action="">
		<input type="submit" value="Reload">
	</form>
	<hr><br>
<?php
}
else if ($action == "insert"){
	$name=$_REQUEST['name'];
	$desc=$_REQUEST['desc'];
	$price=$_REQUEST['price'];
	$qoh=$_REQUEST['qoh'];
	$image=$_REQUEST['image'];

	if ((!is_numeric($qoh)) || ($qoh == "")){
		$qoh = 0;
	}

	$sql = "INSERT INTO products (id, name, description, price, qoh, image) VALUES (?, ?, ?, ?, ?, ?)";
	$stmt = $db->prepare($sql);
	$status = $stmt->execute([NULL, $name, $desc, $price, $qoh, $image]);
	$id = $db->lastInsertId("id");
	if ($status == 1){
?>
		<h2>Product Added:</h2>
		id: <?= $id; ?><br>
		name: <?= $name; ?><br>
		desc: <?= $desc; ?><br>
		price: <?= $price; ?><br>
		qoh: <?= $qoh; ?><br>
		image: <?= $image; ?><br>
<?php
	}
	else {
		echo "Error on insert";
	}
}
else if ($action == "update"){
	$id=$_REQUEST['id'];
	$name=$_REQUEST['name'];
	$desc=$_REQUEST['desc'];
	$price=$_REQUEST['price'];
	$qoh=$_REQUEST['qoh'];
	$image=$_REQUEST['image'];
?>
	<h2>Item Updated To: </h2>
	id: <?= $id; ?><br>
	name: <?= $name; ?><br>
	desc: <?= $desc; ?><br>
	price: <?= $price; ?><br>
	qoh: <?= $qoh; ?><br>
	image: <?= $image; ?><br>
	<br><hr>
	<form method="get" action="">
		<input type="submit" value="Reload">
	</form>
	<hr><br>
<?php
	$sql = "UPDATE products SET name=?, description=?, price=?, qoh=?, image=? WHERE id=?";
	$stmt = $db->prepare($sql);
	$status = $stmt->execute([$name, $desc, $price, $qoh, $image, $id]);
	echo "Status: " . $status;
}
else {
	$rows = $db->query("SELECT id, name, description, price, qoh, image FROM products");
	$rowsArray = $rows->fetchAll();
	$i = 0;
	foreach ($rowsArray as $row){
?>
		<form method="get" action="">
			id: <?= $row['id']; ?> <br>
			name: <input type="text" name="name" value="<?= $row['name']; ?>"><br>
			desc: <textarea name="desc"><?= $row['description']; ?></textarea><br>
			price: <input type="text" name="price" value="<?= $row['price']; ?>"><br>
			qoh: <input type="text" name="qoh" value="<?= $row['qoh']; ?>"><br>
			image: <input type="text" name="image" value="<?= $row['image']; ?>"><br>
			<input type="hidden" name="id" value="<?= $row['id']; ?>">
			<button type="submit" name="action" value="update">Update</button>
			<button type="submit" name="action" value="delete">Delete</button>
		</form>
		<hr><br>
<?php
	}
?>
	<form method="get" action="">
		name: <input type="text" name="name"><br>
		desc: <textarea name="desc"></textarea><br>
		price: <input type="text" name="price"><br>
		qoh: <input type="text" name="qoh"><br>
		image: <input type="text" name="image"><br>
		<input type="hidden" name="action" value="insert">
		<input type="submit" value="insert">
	</form>
	<hr><br>
<?php
}
?>
</body>
</html>