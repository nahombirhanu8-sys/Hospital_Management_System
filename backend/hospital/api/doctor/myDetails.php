<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET,POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
include_once "../../config/database.php";
include_once "../../models/Doctor.php";
$data = json_decode(file_get_contents("php://input"));
$database = new Database();
$db = $database->connect();
$doctor = new Doctor($db);
$result = $doctor->myDetails($data);
echo $result;
