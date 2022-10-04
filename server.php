<?php
$_POST = json_decode(file_get_contents("php://input"), true); // на php коде получить json данные и поработать с ними
echo var_dump($_POST);