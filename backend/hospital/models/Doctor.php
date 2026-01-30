<?php
class Doctor{
    private $id;
    private $name;
    private $address;
    private $email;
    private $phone;
    private $specialization;
    private $salary;
    private $password;
    private $newPassword;
    private $oldPassword;
    private $conn;

    public function __construct($db){
        $this->conn = $db;
    }
    public function myDetails($data){
        try{
            $this->name = $data->name;
            $this->password = $data->password;
            $query = "SELECT * FROM doctor WHERE name=:name and password =:password";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":name", $this->name, PDO::PARAM_STR);
            $stmt->bindParam(":password", $this->password, PDO::PARAM_STR);
            if($stmt->execute()){
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode([
                    "name"=>$row["name"],
                    "address"   =>$row["address"],
                    "email"=>$row["email"],
                    "phone"=>$row["phone"],
                    "specialization"=> $row["specialization"],
                    "salary"=> $row["salary"],
                ]);
                
            }
        }catch(PDOException $e){
            json_encode([
                'error' => $e->getMessage()
            ]);
        }
    }
    public function changePassword($data){
        try{
            $this->oldPassword = $data->oldPassword;
            $this->newPassword = $data->newPassword;
            $this->name = $data->name;
            $query = "UPDATE doctor SET password=:newPassword WHERE name = :username and password = :oldPassword";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":oldPassword", $this->oldPassword, PDO::PARAM_STR);
            $stmt->bindParam(":newPassword", $this->newPassword, PDO::PARAM_STR);
            $stmt->bindParam(":username", $this->name, PDO::PARAM_STR);
            if($stmt->execute()){
                return json_encode([
                    'message'=> 'password changed successfully'
                ]);
                
            }
        }catch(PDOException $e){
            return json_encode([
                'error' => $e->getMessage()
            ]);
        }
    }
    public function assignedPatient($data) {
        try {
            $this->name = $data->name;
            $query = "SELECT doctorId FROM doctor WHERE name = :name";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":name", $this->name, PDO::PARAM_STR);
    
            if ($stmt->execute()) {
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$result) {
                    return json_encode(['error' => 'Doctor not found']);
                }
                $doctorId = $result["doctorId"];
                $query = "SELECT * FROM patient WHERE doctorId = :id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(":id", $doctorId, PDO::PARAM_INT);
                $stmt->execute();
                $patients = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return json_encode($patients);
            } else {
                return json_encode(['error' => 'Query execution failed']);
            }
    
        } catch (PDOException $e) {
            return json_encode([
                'error' => $e->getMessage()
            ]);
        }
    }
    
}