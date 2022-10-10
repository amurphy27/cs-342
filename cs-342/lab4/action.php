<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>The Roast</title>
<style>
div {
	text-align: center;
}
</style>
</head>
<body>
<div>
<?php
	//pronouns format Nominative, Objective, Possessive
	$pronouns = explode(", ", $_POST["pronoun"]);
	$db = new PDO("mysql:dbname=fussmvnf_roasts;host=localhost", "fussmvnf_user", "VMF5YVrp");
	$dbOpeners = $db->query("SELECT * FROM openers;");
	$dbSents = $db->query("SELECT * FROM sentences;");
	$dbClosers = $db->query("SELECT * FROM closers;");
	$openers = [];
	$sentences = [];
	$closers = [];
	foreach ($dbOpeners as $dbOpener){
		$openers[$dbOpener["id"] - 1] = $dbOpener["text"];
	}
	foreach ($dbSents as $dbSent){
		$sentences[$dbSent["id"] - 1] = $dbSent["text"];
	}
	foreach ($dbClosers as $dbCloser){
		$closers[$dbCloser["id"] - 1] = $dbCloser["text"];
	}
	function madLibsSent($sent, $pronouns){
		$sent = str_replace("_FNAME_", $_POST["first"], $sent);
		$sent = str_replace("_LNAME_", $_POST["last"], $sent);
		$sent = str_replace("_NPRONOUN_", $pronouns[0], $sent);
		$sent = str_replace("_PPRONOUN_", $pronouns[2], $sent);
		$sent = str_replace("_OPRONOUN_", $pronouns[1], $sent);
		return $sent;
	}
?>
	<h1>The Roast of <?php echo $_POST["first"] . " " . $_POST["last"]?></h1>
<?php
	echo madLibsSent($openers[rand(0, count($openers) - 1)], $pronouns) . ". ";
	$sentPicked = [];
	for ($i = 0; $i < $_POST["sents"] - 2; $i++){
		$num = rand(0, count($sentences) - 1);
		while (in_array($num, $sentPicked)){
			$num = rand(0, count($sentences) - 1);
		}
		$sentPicked[$i] = $num;
		echo madLibsSent($sentences[$sentPicked[$i]], $pronouns) . ". ";
	}
	echo madLibsSent($closers[rand(0, count($closers) - 1)], $pronouns) . ".";
?>
<hr>
<form action="lab4.php">
	<input type="submit" value="Try Another" />
</form>
</div>
</body>
</html>