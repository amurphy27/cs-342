<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Lab 4</title>
<style>
div {
	width: 40%;
	background-color: Lavender;
	border-width: 1px;
	border-style: solid;
	border-color: Violet;
}
</style>
</head>
<body>
<h1>Murphy's Roast Generator!</h1>
<h2>Complain about someone</h2>
<div>
<form id="form1" action="action.php" method="post">
	<ul>
		<li>What's the full name of the person you want to complain about?</li>
		First name: 
		<input type="text" name="first">
		 Last name: 
		<input type="text" name="last">
		<li>Please pick the appropriate pronouns for this person 
		<select name="pronoun">
			<option value="he, him, his">He, him, his</option>
			<option value="he, they, _FNAME_'s">He, they, firstname('s)</option>
			<option value="she, her, hers">She, her, hers</option>
			<option value="she, they, _FNAME_'s">She, they, firstname('s)</option>
			<option value="they, them, theirs">They, them, theirs</option>
			<option value="ze, hir, hirs">Ze, hir, hirs</option>
			<option value="ze, zir, zirs">Ze, zir, zirs</option>
		</select>
		</li>
		<li>How many sentences do you want to generate? 
		<select name="sents">
			<option value="3">3</option>
			<option value="5">5</option>
			<option value="10">10</option>
		</select>
		</li>
	</ul>
	<input type="submit" value="Submit">
</form>
</div>
<?php

?>
</body>
</html>