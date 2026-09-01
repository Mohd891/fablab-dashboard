<?php
require_once __DIR__ . '/../includes/auth.php';
requireEmployee();
header('Content-Type: application/json; charset=UTF-8');
if($_SERVER['REQUEST_METHOD']==='POST'){
  $d=json_decode(file_get_contents('php://input'),true);$date=$d['date']??date('Y-m-d');$records=$d['records']??[];
  $st=$conn->prepare("INSERT INTO attendance(student_id,attendance_date,status) VALUES(?,?,?) ON DUPLICATE KEY UPDATE status=VALUES(status)");
  foreach($records as $x){$sid=(int)($x['student_id']??0);$status=($x['status']??'absent')==='present'?'present':'absent';if($sid>0){$st->bind_param('iss',$sid,$date,$status);$st->execute();}}
  echo json_encode(['success'=>true],JSON_UNESCAPED_UNICODE);exit;
}
http_response_code(405);
?>
