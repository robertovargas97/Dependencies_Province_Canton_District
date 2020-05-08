<?php

 $id = $_POST['id'];
 $cid = $_POST['cid'];

    if($id == 1 && $cid == 1){
        $distritos= array(
            array('id' => 1, 'name' =>'Carmen'), 
            array('id' => 2, 'name' =>'Merced') 
         );
    }
    else if($id == 1 && $cid == 2){
        $distritos= array(
            array('id' => 1, 'name' =>'Cangrejal'), 
            array('id' => 2, 'name' =>'Guaitil') 
         );
    }
   else if($id == 2 && $cid == 1){
        $distritos= array(
            array('id' => 1, 'name' =>'Alajuela'), 
            array('id' => 2, 'name' =>'Carrizal') 
         );
    }  
    else if($id == 2 && $cid == 2){
        $distritos= array(
            array('id' => 1, 'name' =>'Atenas'), 
            array('id' => 2, 'name' =>'Concepcion') 
         );
    }

 echo json_encode($distritos);
 