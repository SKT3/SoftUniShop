<?php

namespace AppBundle\Helper;

use Symfony\Component\HttpFoundation\JsonResponse;

class ApiResponse{
    public static function success($data, $headers = array()){
        $ret = array('success' => true);
        $ret = array_merge($ret, $data);
        $headers = array_merge($headers, ['Content-type' => 'application/json']);
        return new JsonResponse($ret, 200, $headers);
    }

    public static function fail($data, $status = 500){
        $ret = array('success' => false);
        $ret = array_merge($ret, $data);
        return new JsonResponse($ret, $status, ['Content-type' => 'application/json'] );
    }
}
