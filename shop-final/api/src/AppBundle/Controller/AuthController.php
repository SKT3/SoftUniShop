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
use Symfony\Component\HttpFoundation\Session\Session;

use AppBundle\Entity\User;
use AppBundle\Entity\UserRepository;
use AppBundle\Helper\ApiResponse;

class AuthController extends FOSRestController{

    public function loginAction(Request $request){
        $em = $this->getDoctrine()->getEntityManager();
        $user_repository = $em->getRepository('AppBundle:User');
        //get POST data
        $data = $request->get('user');
        //validate
        $this->validateLoginData($data);
        //find user in db
        $user = $user_repository->findOneBy(array('email' => $data['username'], 'password' => $data['password']));
        //user exists
        if($user !== NULL){
            $session = $request->getSession();
            //check if user is logged in
            $is_logged_in = $session->get('user');
            if($is_logged_in != NULL)
                return new JsonResponse(array('success' => 'false', 'error' => 'User already logged in!'));
            //set session(user is logged in)
            $session->set('user', $user);

            return ApiResponse::success(['user' => $this->container->get('jms_serializer')->toArray($user)]);
        }
        return ApiResponse::fail(['error' => 'Wrong credentials!']);
    }

    public function logoutAction(Request $request){
        $session = $request->getSession();
        if($session->get('user') != NULL){
            $session->remove('user');
            return ApiResponse::success(['data' => 'Logout successful!']);
        }else{
            return ApiResponse::fail(['data' => 'No user logged in!']);
        }
    }

    /**
     * Register User
     * @param  Request $request POST request
     * @return JsonResponse
     */
    public function registerAction(Request $request){
        $em = $this->getDoctrine()->getEntityManager();
        $user_repository = $em->getRepository('AppBundle:User');
        //POST data
        $data = $request->get('user');
        //@TODO validate POST data
        $this->validate($data);
        //create new User entity
        $user = new User();
        //check if user with that username already exists
        $exists = $user_repository->findOneBy(array('email' => $data['username']));
        if($exists != NULL){
            return ApiResponse::fail(['error' => 'User already exists!']);
        }
        //set entity props
        $user->setEmail($data['username']);
        $user->setPassword($data['password']);
        $user->setRole('basic');
        $user->setCash(240);
        try{
            //write to db
            $em->persist($user);
            $em->flush();
        }catch(\Exception $e){
            return ApiResponse::fail(['error' => 'Database error']);
        }

        return ApiResponse::success(['data' => $user->getForResponse()]);

    }

    private function validateLoginData($data){

    }

    private function validate($data){

    }
}
