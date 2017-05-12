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
use AppBundle\Helper\ApiResponse;
use AppBundle\Form\UserType;


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

    public function getUsersAction(){
        $session = $this->get('session');

        $user = $session->get('user');

       if($user === null){
           return ApiResponse::fail(['error' => 'No logged in User']);
       }

       if($user->getRoles()->getName() == 'basic'){
           return ApiResponse::fail(['error' => 'User does not have permission for this operation']);
       }

        $user_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:User');

        $users = $user_repository->findAll();

        $users = $this->container->get('jms_serializer')->toArray($users);

        return ApiResponse::success(['data' => $users]);
    }


    public function deleteUserAction($id,Request $request){
        $session = $request->getSession();
        $user = $session->get('user');

       if($user === null){
           return ApiResponse::fail(['error' => 'No logged in User']);
       }
       if($user->getRoles()->getName() == 'basic'){
           return ApiResponse::fail(['error' => 'User does not have permission for this operation']);
       }

        $user_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:User');
        $user = $user_repository->findOneBy(array('id' => $id));

        if ($user === NULL) {
            return ApiResponse::fail(['error' => 'No such user exists!']);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();

        return ApiResponse::success(['data' => 'User Deleted!']);
    }

    public function updateUserAction($id,Request $request){
        $session = $request->getSession();

        $userCurrent = $session->get('user');

       if($userCurrent === null)
       {
           return ApiResponse::fail(['error' => 'No logged in User']);
       }

       if($userCurrent->getRoles()->getName() == 'basic'){
           return ApiResponse::fail(['error' => 'User does not have permission for this operation']);
       }

        $user_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:User');
        $user = $user_repository->findOneBy(array('id' => $id));

        $data = $request->get('data');

        if ($user === NULL) {
            return ApiResponse::fail(['error' => 'No such User exists!']);
        }

        $form = $this->createForm(new UserType());
        $form->submit($data);



        if ($form->isValid()) {
            if(array_key_exists('email', $data)){
                $user->setEmail($data['email']);
            }
            if(array_key_exists('password', $data)){
                $user->setPassword($data['password']);
            }
            if(array_key_exists('cash', $data)){
                $user->setCash($data['cash']);
            }
            if(array_key_exists('roleId', $data)){
                $user->setRoleId($data['roleId']);
            }
            if(array_key_exists('roles', $data)){
                $user->setRoles($data['roles']);
            }
            if(array_key_exists('createdAt', $data)){
                $user->setCreatedAt($data['createdAt']);
            }

            $em = $this->getDoctrine()->getEntityManager();
            $em->persist($user);
            $em->flush();
            return ApiResponse::success(['data' => $this->container->get('jms_serializer')->toArray($user)]);
        }

        return ApiResponse::fail(['error' => $this->container->get('jms_serializer')->toArray($form->getErrors())]);
    }

}
