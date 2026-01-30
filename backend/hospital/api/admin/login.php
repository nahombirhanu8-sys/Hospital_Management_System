<?php
header("Access-Control-Allow-Origin: *");
header("Accept: application/json");
header("Content-Type: application/json;charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type,Accept");
include_once("../../config/database.php");
    $database = new Database();
    $db = $database->connect();
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $data = json_decode(file_get_contents("php://input"));
    $username = $data->user;
    $password = $data->password;
    if($data->role ==="Admin"){
        try{
            $stmt = $db->prepare("SELECT * FROM role WHERE username = ?");
            $stmt->bindParam(1, $username);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if($user["password"] == $password){
                echo json_encode([
                    "result" => "success",
                ]);
            }else{
                echo json_encode([
                    "result" => "failed"
                ]);
            }
        }catch(PDOException $e){
            echo json_encode([
                "status"=>$e->getMessage()
            ]);
        }
    }else if($data->role === "Doctor"){
        try{
            $stmt = $db->prepare("SELECT * FROM doctor WHERE name = ?");
            $stmt->bindParam(1, $username);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if($user["password"] == $password){
                echo json_encode([
                    "result" => "success",
                ]);
            }else{
                echo json_encode([
                    "result" => "failed"
                ]);
            }
        }catch(PDOException $e){
            echo json_encode([
                "status"=>$e->getMessage()
            ]);
        }
    }else if($data->role === "Reception"){
        try{
            $stmt = $db->prepare("SELECT * FROM reception WHERE name = ?");
            $stmt->bindParam(1, $username);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if($user["password"] == $password){
                echo json_encode([
                    "result" => "success",
                ]);
            }else{
                echo json_encode([
                    "result" => "failed"
                ]);
            }
        }catch(PDOException $e){
            echo json_encode([
                "status"=>$e->getMessage()
            ]);
        }
    }
}        

