<?php

namespace AppBundle\Controller;


use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\View\View;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Doctrine\ORM\EntityRepository;
use AppBundle\Entity\User;

class UserController extends FOSRestController{

    private $auth_service;

    public function __construct(){

    }

    public function getAction(Request $request){
        $session = $request->getSession();
        $sessUser = $session->get('user');
        if($sessUser != NULL){
            return new JsonResponse(array('success' => true , 'user' => $sessUser), 200);
        }

        return new JsonResponse(array('success' => false, 'error' => 'Not Logged in'), 401);
    }


}
