<?php
include("db_conn.php");

$data = json_decode(file_get_contents("php://input"));
$member_id = mysql_real_escape_string($data->member_id);

try{
	$result =  getRecipe($member_id);

  $allRecipe = array();

	while ($rowResult = $result -> fetch()) {
		$ingredients = array();

		$recipe_id = $rowResult["recipe_id"];
		$member_id = $rowResult["member_id"];
		$recipe_title = $rowResult["recipe_title"];
		$recipe_category = $rowResult["category_name"];
		$recipe_content = $rowResult["recipe_content"];
		$recipe_image = $rowResult["recipe_image"];

		$result1 = getIngredient($recipe_id);
		while ($rowResult1 = $result1 -> fetch()) {
			$ingredient = array();
			array_push($ingredient, $rowResult1["ingredient_id"], $rowResult1["ingredient_name"], $rowResult1["ingredient_amount"]);
			array_push($ingredients, $ingredient);
		}

	  $recipe = array("recipe_id" => $recipe_id, "member_id" => $member_id, "recipe_title" => $recipe_title,
     "recipe_category" => $recipe_category, "recipe_content" => $recipe_content, "recipe_image" => $recipe_image, "recipe_ingredients" => $ingredients);
		$allRecipe[$recipe_id] = $recipe;
	}
  echo json_encode($allRecipe);
}
catch(PDOException $e) {
	echo $e->getMessage();
}
?>
