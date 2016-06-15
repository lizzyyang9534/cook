<?php
include("db_conn.php");

try{
	$categories = array();
	$result = getCategory();

  while ($rowResult = $result -> fetch()) {
		$category = array("category_id" => $rowResult["category_id"], "category_name" => $rowResult["category_name"]);
		array_push($categories,$category);
  }

	echo json_encode($categories);
}
catch(PDOException $e) {
	echo $e->getMessage();
}
?>
