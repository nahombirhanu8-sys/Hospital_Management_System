<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
include_once "../../config/database.php";
include_once "../../models/Admin.php";
$data = json_decode(file_get_contents("php://input"));
$database = new Database();
$db = $database->connect();
$admin = new Admin($db);
$result = $admin->getDoctor($data);
echo $result;