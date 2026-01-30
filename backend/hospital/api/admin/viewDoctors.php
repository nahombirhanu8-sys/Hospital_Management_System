<?php
header("Access-Control-Allow-Origin: *");
header("Accept: application/json");
header("Content-Type: application/json;charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type,Accept");
include_once("../../config/database.php");
include_once("../../models/Admin.php");

$database = new Database();
$db = $database->connect();
$admin = new Admin($db);
$admin->viewDoctors();