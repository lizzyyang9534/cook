<?php
function connectDB()
{
	$dbname = 'cook';
	$host = 'localhost';
	$username = 'root';
	$password = '135793';

	$dbh = new PDO("mysql:dbname=$dbname;host=$host", $username, $password );
	return $dbh;
}

$dbh = connectDB();

function getMember($email){
	$dbh = connectDB();
	$sql = "select * from member where email = :email";
	$statement = $dbh -> prepare($sql);
	$statement -> bindParam(':email', $email, PDO::PARAM_STR);
	$statement -> execute();
	return $statement;
}

function checkEmail($email){
	$dbh = connectDB();
	$sql = "select email from member where email = :email";
	$statement = $dbh -> prepare($sql);
	$statement -> bindParam(':email', $email, PDO::PARAM_STR);
	$statement -> execute();
	return $statement;
}

function getCategory(){
	$dbh = connectDB();
	$sql = "select * from category;";
	$statement = $dbh -> prepare($sql);
	$statement -> execute();
	return $statement;
}

function getRecipe($member_id){
	$dbh = connectDB();
	$sql = "select * from recipe r,category c where r.member_id = :member_id and r.recipe_category = c.category_id;";
	$statement = $dbh -> prepare($sql);
	$statement -> bindParam(':member_id', $member_id, PDO::PARAM_INT);
	$statement -> execute();
	return $statement;
}

function getIngredient($recipe_id){
	$dbh = connectDB();
	$sql = "select * from ingredient where recipe_id = :recipe_id;";
	$statement = $dbh -> prepare($sql);
	$statement -> bindParam(':recipe_id', $recipe_id, PDO::PARAM_INT);
	$statement -> execute();
	return $statement;
}

function getLastRecipe($member_id){
	$dbh = connectDB();
	$sql = "select recipe_id from recipe where member_id = :member_id order by recipe_id DESC limit 1";
	$statement = $dbh -> prepare($sql);
	$statement -> bindParam(':member_id', $member_id, PDO::PARAM_INT);
	$statement -> execute();
	return $statement;
}
?>
