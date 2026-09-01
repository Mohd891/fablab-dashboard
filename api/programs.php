<?php
require_once __DIR__.'/db.php'; require_once __DIR__.'/../includes/auth.php'; header('Content-Type: application/json; charset=UTF-8');
$method=$_SERVER['REQUEST_METHOD']; $u=currentUser();
if($method==='GET'){ $r=$conn->query("SELECT p.*,(SELECT COUNT(*) FROM students s WHERE s.program_id=p.id) student_count FROM programs p ORDER BY p.id DESC");$rows=[];while($x=$r->fetch_assoc())$rows[]=$x;echo json_encode(['success'=>true,'programs'=>$rows],JSON_UNESCAPED_UNICODE);exit; }
requireAdmin(); $d=json_decode(file_get_contents('php://input'),true)??[];
if($method==='POST'){ $name=trim($d['name']??'');$period=trim($d['period']??'');$capacity=(int)($d['capacity']??0);$status=$d['status']??'active';$st=$conn->prepare('INSERT INTO programs(name,period,capacity,status) VALUES(?,?,?,?)');$st->bind_param('ssis',$name,$period,$capacity,$status);$st->execute();echo json_encode(['success'=>true,'message'=>'تمت الإضافة'],JSON_UNESCAPED_UNICODE);exit;}
if($method==='DELETE'){ $id=(int)($_GET['id']??0);$st=$conn->prepare('DELETE FROM programs WHERE id=?');$st->bind_param('i',$id);$st->execute();echo json_encode(['success'=>true,'message'=>'تم الحذف'],JSON_UNESCAPED_UNICODE);exit;}
?>