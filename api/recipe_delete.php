<?php
include("db_conn.php");

$data = json_decode(file_get_contents("php://input"));
$recipe_id = mysql_real_escape_string($data->recipe_id);

try{
	$sql = "delete from recipe where recipe_id = :recipe_id";
	$statement = $dbh -> prepare($sql);
  $statement -> bindParam(':recipe_id', $recipe_id, PDO::PARAM_INT);
	$statement -> execute();

  $sql = "delete from ingredient where recipe_id = :recipe_id";
	$statement = $dbh -> prepare($sql);
  $statement -> bindParam(':recipe_id', $recipe_id, PDO::PARAM_INT);
	$statement -> execute();

  echo "delete data successfully";
}
catch(PDOException $e) {
	echo $e->getMessage();
}
?>
