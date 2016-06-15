<?php
include("db_conn.php");

$data = json_decode(file_get_contents("php://input"));
$member_id = mysql_real_escape_string($data->member_id);
$recipe_title = mysql_real_escape_string($data->recipe_title);
$recipe_category= mysql_real_escape_string($data->recipe_category);
$recipe_content = mysql_real_escape_string($data->recipe_content);
//$recipe_image = mysql_real_escape_string($data->recipe_image);
$recipe_ingredients = json_decode(json_encode($data->recipe_ingredients), true);

try{
	$sql = "insert into recipe (member_id,recipe_title,recipe_category,recipe_content)
            values(:member_id,:recipe_title,:recipe_category,:recipe_content)";
	$statement = $dbh -> prepare($sql);
	$statement -> bindParam(':member_id', $member_id, PDO::PARAM_INT);
	$statement -> bindParam(':recipe_title', $recipe_title, PDO::PARAM_STR);
	$statement -> bindParam(':recipe_category', $recipe_category, PDO::PARAM_INT);
	$statement -> bindParam(':recipe_content', $recipe_content, PDO::PARAM_STR);
	//$statement -> bindParam(':recipe_image', $recipe_image, PDO::PARAM_STR);
	$statement -> execute();

  $result = getLastRecipe($member_id);
  $rowResult = $result -> fetch();
  $recipe_id = $rowResult["recipe_id"];

  for ($i=0; $i < count($recipe_ingredients); $i++) {
    $sql = "insert into ingredient (member_id,recipe_id,ingredient_name,ingredient_amount)
              values(:member_id,:recipe_id,:ingredient_name,:ingredient_amount)";
  	$statement = $dbh -> prepare($sql);
    $statement -> bindParam(':member_id', $member_id, PDO::PARAM_INT);
    $statement -> bindParam(':recipe_id', $recipe_id, PDO::PARAM_INT);
    $statement -> bindParam(':ingredient_name', $recipe_ingredients[$i]["name"], PDO::PARAM_STR);
    $statement -> bindParam(':ingredient_amount', $recipe_ingredients[$i]["amount"], PDO::PARAM_STR);
  	$statement -> execute();
  }

	echo "insert data successfully";
}
catch(PDOException $e) {
	echo $e->getMessage();
}
?>
