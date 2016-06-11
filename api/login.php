<?php
include("db_conn.php");

$data = json_decode(file_get_contents("php://input"));
$email = mysql_real_escape_string($data->email);
$password = mysql_real_escape_string($data->password);


try{
	$result =  getMember($email);
	$rowResult = $result -> fetch();

	if($password == $rowResult["password"]){
		echo json_encode(array("member_id" => $rowResult["member_id"], "email" => $rowResult["email"]));
	}
	else{
		echo "error";
	}

}
catch(PDOException $e) {
	echo $e->getMessage();
}

?>
