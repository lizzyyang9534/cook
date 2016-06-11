<?php
include("db_conn.php");

try{
	$category = array();
	$result = getCategory();
  while ($rowResult = $result -> fetch()) {
  	array_push($category, $rowResult["category_name"]);
  }

	echo json_encode($category);
}
catch(PDOException $e) {
	echo $e->getMessage();
}
?>
