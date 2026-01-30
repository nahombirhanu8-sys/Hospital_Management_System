<?php
header("Access-Control-Allow-Origin: *");
header("Accept: application/json");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type,Accept");
include_once("../../models/Admin.php");
include_once("../../config/database.php");

if($_SERVER["REQUEST_METHOD"] === "POST"){
    try{
        $database = new Database();
        $db = $database->connect();
        $admin = new Admin($db);
        $data = json_decode(file_get_contents("php://input"));
        $result = $admin->addReception($data);
        echo $result;
    }catch(PDOException $e){
        echo json_encode(["error"=> $e->getMessage()]);
    }
}