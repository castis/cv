<?php

header('Content-Type: text/plain');

die(json_encode(array(
    'ip' => $_SERVER['REMOTE_ADDR'],
    'time' => date('Y-m-d H:i:s', time())
)));
