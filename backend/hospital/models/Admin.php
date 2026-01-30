<?php
class Admin{
    private $id;
    private $name;
    private $address;
    private $email;
    private $phone;
    private $specialization;
    private $salary;
    private $password;
    private $conn;

    public function __construct($db){
        $this->conn = $db;
    }
    public function add_doctor($data){
        $this->id = $data->id;
        $this->name = $data->name;
        $this->address = $data->address;
        $this->email = $data->email;
        $this->phone = $data->phone;
        $this->specialization = $data->specialization;
        $this->salary = $data->salary;
        $this->password = $data->password;
        try{
            $query = "INSERT INTO doctor(doctorId, name, address, email, phone, specialization, salary, password)
                     VALUES(:doctorId, :name, :address, :email, :phone, :specialization, :salary, :password)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":doctorId", $this->id, PDO::PARAM_INT);
            $stmt->bindParam(":name", $this->name, PDO::PARAM_STR);
            $stmt->bindParam(":address", $this->address, PDO::PARAM_STR);
            $stmt->bindParam(":email", $this->email, PDO::PARAM_STR);
            $stmt->bindParam(":phone", $this->phone, PDO::PARAM_STR);
            $stmt->bindParam(":specialization", $this->specialization, PDO::PARAM_STR);
            $stmt->bindParam(":salary", $this->salary, PDO::PARAM_STR);
            $stmt->bindParam(":password", $this->password, PDO::PARAM_STR);
            
            if($stmt->execute()) {
                return [
                    "status" => "success",
                    "message" => "Doctor added successfully"
                ];
            } else {
                return [
                    "status" => "error",
                    "message" => "Failed to add doctor"
                ];
            }
        
        } catch(PDOException $e) {
            return [
                "status" => "error",
                "message" => $e->getMessage()
            ];
        }
    }
    public function viewDoctors(){
        try{
            $query = "SELECT * FROM doctor";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $array = array();
            foreach($rows as $row){
                array_push($array,[
                    "id"=> $row["doctorId"],
                    "name"=>$row["name"],
                    "email"=> $row["email"],
                    "phone"=> $row["phone"],
                    "specialization"=> $row["specialization"],
                    "salary"=> $row["salary"],
                    "password"=>$row["password"]
                ]);
            }
            echo json_encode($array);
        }catch(PDOException $e) {
            echo $e->getMessage();
        }
    }
    public function addUser($data){
        $this->id = $data->id;
        $this->name = $data->name;
        $this->address = $data->address;
        $this->email = $data->email;
        $this->phone = $data->phone;
        $this->password = $data->password;
        try{
            $query = "INSERT INTO user (userName,address,email,phone,password)
                   VALUES(:userName,:address,:email,:phone,:password)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":userName",$this->name);
            $stmt->bindParam(":address",$this->address);
            $stmt->bindParam(":email",$this->email);
            $stmt->bindParam(":phone",$this->phone);
            $stmt->bindParam(":password",$this->password);
            if($stmt->execute()){
                return  json_encode(array("status" => "ok","message"=>"user added successfully"));
            }
        }catch(PDOException $e){
            return json_encode(array("error"=>$e->getMessage()));
        }
    }
    public function addReception($data){
        $this->name = $data->name;
        $this->address = $data->address;
        $this->email = $data->email;
        $this->phone = $data->phone;
        $this->salary = $data->salary;
        $this->password = $data->password;
        try{
            $query = "INSERT INTO reception (name,address,email,salary,phone,password)
                    VALUES(:name,:address,:email,:salary,:phone,:password)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name",$this->name);
        $stmt->bindParam(":address",$this->address);
        $stmt->bindParam(":email",$this->email);
        $stmt->bindParam(":salary",$this->salary);
        $stmt->bindParam(":phone",$this->phone);
        $stmt->bindParam(":password",$this->password);
        if($stmt->execute()){
            return json_encode(["status" => "ok","message"=>"reception added successfully"]);
        }
        }catch(PDOException $e){
            return json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
        }
    }
    public function getDoctor($data){
        $this->name = $data->name;
        $query = "SELECT * FROM doctor where name = :name";
        try{
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":name",$this->name);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $arr = array();
            foreach($rows as $row){
            array_push($arr,[
                "id" => $this->id = $row["doctorId"],
                "name" => $this->name = $row["name"],
                "address"=>$this->address = $row["address"],
                "email"=>$this->email = $row["email"],
                "phone"=>$this->phone= $row["phone"],
                "specialization"=>$this->specialization=$row["specialization"],
                "salary"=>$this->salary=$row["salary"],
                "password"=>$this->password = $row["password"]
            ]);
            }
            return json_encode($arr);
            }catch(PDOException $e){
                return json_encode([
                    "error" => $e->getMessage()
                ]);
            }
    }
    public function updateDoctor($data){
        $this->id = $data->id;
        $this->name = $data->name;
        $this->address = $data->address;
        $this->email = $data->email;
        $this->phone = $data->phone;
        $this->specialization = $data->specialization;
        $this->salary = $data->salary;
        $this->password = $data->password;
        $query = "UPDATE doctor SET name = :name, address=:address,email=:email,phone=:phone,specialization = :specialization,salary=:salary,password=:password
                WHERE doctorId=:id ";
        try{
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);
            $stmt->bindParam(":name", $this->name, PDO::PARAM_STR);
            $stmt->bindParam(":address", $this->address, PDO::PARAM_STR);
            $stmt->bindParam(":email", $this->email, PDO::PARAM_STR);
            $stmt->bindParam(":phone", $this->phone, PDO::PARAM_STR);
            $stmt->bindParam(":specialization", $this->specialization, PDO::PARAM_STR);
            $stmt->bindParam(":salary", $this->salary, PDO::PARAM_STR);
            $stmt->bindParam(":password", $this->password, PDO::PARAM_STR);
            if($stmt->execute()){
                return json_encode([
                    "status" => "success",
                    "message" => "table updated successfully"
                ]);
            }
        

        }catch(PDOException $e){
            echo json_encode(["error"=>$e->getMessage()]);
        }
    }
    public function getUser($data){
        $this->name = $data->name;
        $query = "SELECT * FROM user where userName = :name";
        try{
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":name",$this->name);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $arr = array();
            foreach($rows as $row){
            array_push($arr,[
                "id" => $this->id = $row["userId"],
                "name" => $this->name = $row["userName"],
                "address"=>$this->address = $row["address"],
                "email"=>$this->email = $row["email"],
                "password"=>$this->password = $row["password"]
            ]);
            }
            return json_encode($arr);
            }catch(PDOException $e){
                return json_encode([
                    "error" => $e->getMessage()
                ]);
            }
    }
    public function updateUser($data){
        $this->id = $data->id;
        $this->name = $data->name;
        $this->address = $data->address;
        $this->email = $data->email;
        $this->phone = $data->phone;
        $this->specialization = $data->specialization;
        $this->salary = $data->salary;
        $this->password = $data->password;
        $query = "UPDATE user SET userName = :name, address=:address,email=:email,phone=:phone,password=:password
                WHERE userId=:id ";
        try{
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);
            $stmt->bindParam(":name", $this->name, PDO::PARAM_STR);
            $stmt->bindParam(":address", $this->address, PDO::PARAM_STR);
            $stmt->bindParam(":email", $this->email, PDO::PARAM_STR);
            $stmt->bindParam(":phone", $this->phone, PDO::PARAM_STR);
            $stmt->bindParam(":password", $this->password, PDO::PARAM_STR);
            if($stmt->execute()){
                return json_encode([
                    "status" => "success",
                    "message" => "table updated successfully"
                ]);
            }
    }catch(PDOException $e){
        return json_encode([
            "error" => $e->getMessage()
        ]);
    }
}
public function getReception($data){
    $this->name = $data->name;
    $query = "SELECT * FROM reception where name = :name";
    try{
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name",$this->name);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $arr = array();
        foreach($rows as $row){
        array_push($arr,[
            "id" => $this->id = $row["receptionId"],
            "name" => $this->name = $row["name"],
            "address"=>$this->address = $row["address"],
            "salary"=>$this->salary = $row["salary"],
            "phone"=>$this->phone = $row["phone"],
            "email"=>$this->email = $row["email"],
            "password"=>$this->password = $row["password"]
        ]);
        }
        return json_encode($arr);
        }catch(PDOException $e){
            return json_encode([
                "error" => $e->getMessage()
            ]);
        }
}
public function updateReception($data){
    $this->id = $data->id;
    $this->name = $data->name;
    $this->address = $data->address;
    $this->email = $data->email;
    $this->phone = $data->phone;
    $this->specialization = $data->specialization;
    $this->salary = $data->salary;
    $this->password = $data->password;
    $query = "UPDATE reception SET name = :name, address=:address,salary=:salary,email=:email,phone=:phone,password=:password
            WHERE receptionId=:id ";
    try{
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);
        $stmt->bindParam(":name", $this->name, PDO::PARAM_STR);
        $stmt->bindParam(":address", $this->address, PDO::PARAM_STR);
        $stmt->bindParam(":email", $this->email, PDO::PARAM_STR);
        $stmt->bindParam(":phone", $this->phone, PDO::PARAM_STR);
        $stmt->bindParam(":password", $this->password, PDO::PARAM_STR);
        $stmt->bindParam(":salary", $this->salary, PDO::PARAM_STR);
        if($stmt->execute()){
            return json_encode([
                "status" => "success",
                "message" => "table updated successfully"
            ]);
        }
}catch(PDOException $e){
    return json_encode([
        "error" => $e->getMessage()
    ]);
}
}
}