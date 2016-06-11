<?php
include("db_conn.php");

$data = json_decode(file_get_contents("php://input"));
$member_id = mysql_real_escape_string($data->member_id);

try{
	$result =  getRecipe($member_id);

  $allRecipe = array();
	while ($rowResult = $result -> fetch()) {
		$recipe_id = $rowResult["recipe_id"];
		$member_id = $rowResult["member_id"];
		$recipe_title = $rowResult["recipe_title"];
		$recipe_category = $rowResult["recipe_category"];
		$recipe_content = $rowResult["recipe_content"];
		$recipe_image = $rowResult["recipe_image"];
	  $recipe = array("recipe_id" => $recipe_id, "member_id" => $member_id, "recipe_title" => $recipe_title,
     "recipe_category" => $recipe_category, "recipe_content" => $recipe_content, "recipe_image" => $recipe_image);
		$allRecipe[$recipe_id] = $recipe;
	}
  echo json_encode($allRecipe);
}
catch(PDOException $e) {
	echo $e->getMessage();
}
?>
