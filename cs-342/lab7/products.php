<?php
$action = $_REQUEST['action'];
if ($action == "products"){
	$db = new PDO("mysql:dbname=fussmvnf_andrew; host=localhost", "fussmvnf_andrew", "dbjR3Wr3");
	$rows = $db->query("SELECT id, name, description, price, qoh, image FROM prodcuts");
}
else {
	echo 'no data';
}

foreach($rows as $row){
?>
	<?= $row['id']; ?> :-: <?= $row['name']; ?> :-: <?= $row['description']; ?> :-: <?= $row['price']; ?>
	:-: <?= $row['qoh'];?> :-: <?= $row['image']; ?> ::: <br>
<?php
}
?>