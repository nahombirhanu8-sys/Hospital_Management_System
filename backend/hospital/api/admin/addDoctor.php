<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
include_once "../../config/database.php";
include_once "../../models/Admin.php";

if($_SERVER["REQUEST_METHOD"]==="POST"){
    $database = new Database();
    $db = $database->connect();
    $admin = new Admin($db);
    $data = json_decode(file_get_contents("php://input"));
    if($data === null) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
        exit();
    }else{
        $result = $admin->add_doctor($data);
        echo json_encode($result);
    }
    
}