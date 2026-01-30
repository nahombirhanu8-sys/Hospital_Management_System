<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
include_once "../../config/database.php";
include_once "../../models/Admin.php";


if($_SERVER["REQUEST_METHOD"]==="POST"){
    $data = json_decode(file_get_contents("php://input"));
    $database = new Database();
    $db = $database->connect();
    $admin = new Admin($db);
    $result = $admin->updateReception($data);
    echo  $result;
}