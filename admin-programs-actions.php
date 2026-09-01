<?php
require_once __DIR__ . '/includes/auth.php';
requireAdmin();
header('Content-Type: application/json; charset=UTF-8');
$method=$_SERVER['REQUEST_METHOD'];
if($method==='POST'){
  $d=json_decode(file_get_contents('php://input'),true);
  $name=trim($d['name']??'');$period=trim($d['period']??'');$capacity=(int)($d['capacity']??0);$description=trim($d['description']??'');$status=$d['status']??'active';
  $st=$conn->prepare("INSERT INTO programs(name,period,capacity,description,status) VALUES(?,?,?,?,?)");$st->bind_param('ssiss',$name,$period,$capacity,$description,$status);$st->execute();
  echo json_encode(['success'=>true,'id'=>$st->insert_id],JSON_UNESCAPED_UNICODE);exit;
}
if($method==='DELETE'){
  $id=(int)($_GET['id']??0);$st=$conn->prepare("DELETE FROM programs WHERE id=?");$st->bind_param('i',$id);$st->execute();echo json_encode(['success'=>true],JSON_UNESCAPED_UNICODE);exit;
}
http_response_code(405);
?>
