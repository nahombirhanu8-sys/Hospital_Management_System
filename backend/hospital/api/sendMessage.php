<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET,POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
include_once "../config/database.php";
$data = json_decode(file_get_contents("php://input"));
$database = new Database();
$db = $database->connect();
$name = $data->name;
$email = $data->email;
$message = $data->message;
try{
    $query = "INSERT INTO messages (name,email,message)
           VALUES(:name,:email,:message)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":name", $name, PDO::PARAM_STR);
    $stmt->bindParam(":email",$email,PDO::PARAM_STR);
    $stmt->bindParam(":message",$message,PDO::PARAM_STR);
    if($stmt->execute()){
        echo json_encode(array("status" => "ok","message"=>"message sent successfully"));
    }
}catch(PDOException $e){
    echo json_encode(array("error"=>$e->getMessage()));
}
