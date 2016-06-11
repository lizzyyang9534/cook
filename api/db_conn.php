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

function getCategory(){
	$dbh = connectDB();
	$sql = "select * from category;";
	$statement = $dbh -> prepare($sql);
	$statement -> execute();
	return $statement;
}

function getRecipe($member_id){
	$dbh = connectDB();
	$sql = "select * from recipe where member_id = :member_id;";
	$statement = $dbh -> prepare($sql);
	$statement -> bindParam(':member_id', $member_id, PDO::PARAM_INT);
	$statement -> execute();
	return $statement;
}
?>
