<?php

$id = $_POST['id'];

 switch( $id ) {
     case 1:
        $cantones = array(
           array('id' => 1, 'name' =>'Central'), 
           array('id' => 2, 'name' =>'Acosta') 
        );
        break;
     case 2:
        $cantones = array(
           array('id' => 1, 'name' =>'Alajuela'), 
           array('id' => 2, 'name' =>'Atenas') 
        );
        break;
     default:
        $cantones = array();
        break;
 }
 echo json_encode($cantones);
 