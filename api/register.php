<?php
include("db_conn.php");

$data = json_decode(file_get_contents("php://input"));
$email = mysql_real_escape_string($data->email);
$password = mysql_real_escape_string($data->password);

try{
	$result2 = checkEmail($email);
	$rowResult2 = $result2 -> fetch();

	if(empty($rowResult2["email"]) == false){
		echo "email_exist";
	}
	else{
		$sql = "insert into member (email,password) values(:email,:password)";
		$statement = $dbh -> prepare($sql);
		$statement -> bindParam(':email', $email, PDO::PARAM_STR);
		$statement -> bindParam(':password', $passwd, PDO::PARAM_STR);
		$statement -> execute();

		$result = getMember($email);
		$rowResult = $result -> fetch();
		echo "register_successfully";

		//echo $account.",".$passwd.",".$name.",".$cel.",".$email;
	}
}
catch(PDOException $e) {
	echo $e->getMessage();
}

?>
