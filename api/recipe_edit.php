<?php
include("db_conn.php");

$data = json_decode(file_get_contents("php://input"));
$member_id = mysql_real_escape_string($data->member_id);
$recipe_id = mysql_real_escape_string($data->recipe_id);
$recipe_title = mysql_real_escape_string($data->recipe_title);
$recipe_category= mysql_real_escape_string($data->recipe_category);
$recipe_content = mysql_real_escape_string($data->recipe_content);
//$recipe_image = mysql_real_escape_string($data->recipe_image);
$recipe_ingredients = json_decode(json_encode($data->recipe_ingredients), true);

try{
  /*
	$sql = "update recipe set recipe_title = :recipe_title, recipe_category = :recipe_category, recipe_content = :recipe_content where recipe_id = :recipe_id";
	$statement = $dbh -> prepare($sql);
  $statement -> bindParam(':recipe_id', $recipe_title, PDO::PARAM_INT);
	$statement -> bindParam(':recipe_title', $recipe_title, PDO::PARAM_STR);
	$statement -> bindParam(':recipe_category', $recipe_category, PDO::PARAM_INT);
	$statement -> bindParam(':recipe_content', $recipe_content, PDO::PARAM_STR);
	//$statement -> bindParam(':recipe_image', $recipe_image, PDO::PARAM_STR);
	$statement -> execute();*/

  $result = getIngredient($recipe_id);
  $rowResult = $result -> fetchAll();

  if(count($recipe_ingredients) > count($rowResult)){
    echo count($recipe_ingredients).">".count($rowResult);
  } else if (count($recipe_ingredients) < count($rowResult)) {
    echo count($recipe_ingredients)."<".count($rowResult);
  } else{
    for ($i=0; $i < count($recipe_ingredients); $i++) {
      $sql = "update ingredient set ingredient_name = :ingredient_name, ingredient_amount = :ingredient_amount where ingredient_id = :ingredient_id";
    	$statement = $dbh -> prepare($sql);
      $statement -> bindParam(':ingredient_id', $recipe_ingredients[$i][0], PDO::PARAM_INT);
      $statement -> bindParam(':ingredient_name', $recipe_ingredients[$i][1], PDO::PARAM_STR);
      $statement -> bindParam(':ingredient_amount', $recipe_ingredients[$i][2], PDO::PARAM_STR);
    	$statement -> execute();
      echo $recipe_ingredients[$i][0].",".$recipe_ingredients[$i][1].",".$recipe_ingredients[$i][2]."/";
    }
  }

	//echo "edit data successfully";
}
catch(PDOException $e) {
	echo $e->getMessage();
}
?>
