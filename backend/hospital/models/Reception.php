<?php
class Reception{
    private $name;
    private $address;
    private $email;
    private $phone;
    private $case;
    private $date;
    private $time;
    private $doctorId;
    private $oldPassword;
    private $newPassword;
    public function __construct($db){
        $this->conn = $db;
    }
    public function addPatient($data){
        try{
            $this->name = $data->name;
            $this->address = $data->address;
            // $this->email = $data->email;
            $this->phone = $data->phone;
            $this->case = $data->case;
            $this->date = $data->date;
            $this->time = $data->time;
            $this->doctorId = $data->assignedTo;
            $query = "INSERT INTO patient(name,address,phone,disease,date,time,doctorId)
            VALUES(:name,:address,:phone,:disease,:date,:time,:doctorId)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":name", $this->name, PDO::PARAM_STR);
            $stmt->bindParam(":address", $this->address, PDO::PARAM_STR);
            // $stmt->bindParam(":email",$this->email,PDO::PARAM_STR);
            $stmt->bindParam(":phone",$this->phone,PDO::PARAM_STR);
            $stmt->bindParam(":disease",$this->case,PDO::PARAM_STR);
            $stmt->bindParam(":date",$this->date,PDO::PARAM_STR);
            $stmt->bindParam(":time",$this->time,PDO::PARAM_STR);
            $stmt->bindParam(":doctorId",$this->doctorId,PDO::PARAM_INT);
            if($stmt->execute()){
                return json_encode([
                'message'=>'user added successfully'
               ]);   
            }
        }catch(PDOException $e){
           return json_encode([
                'error' => $e->getMessage()
            ]);
        }
    }
    public function viewPatient(){
        try{
            $query = "SELECT * FROM patient";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $array = array();
            foreach($rows as $row){
                array_push($array,[
                    "id"=> $row["doctorId"],
                    "address"=>$row["address"],
                    "phone"=>$row["phone"],
                    "disease"=> $row["disease"],
                    "date"=> $row["date"],
                    "time"=> $row["time"],
                    "doctorId"=>$row["doctorId"]
                ]);
            }
            return json_encode($array);
        }catch(PDOException $e) {
            return $e->getMessage();
        }
    }
    public function changePassword($data){
        try{
            $this->oldPassword = $data->oldPassword;
            $this->newPassword = $data->newPassword;
            $this->name = $data->name;
            $query = "UPDATE reception SET password=:newPassword WHERE name = :name and password = :oldPassword";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":oldPassword", $this->oldPassword, PDO::PARAM_STR);
            $stmt->bindParam(":newPassword", $this->newPassword, PDO::PARAM_STR);
            $stmt->bindParam(":name", $this->name, PDO::PARAM_STR);
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
}