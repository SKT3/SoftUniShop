<?php

namespace AppBundle\Controller;


use AppBundle\Form\ProductType;
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

use AppBundle\Entity\Product;
use AppBundle\Entity\ProductRepository;

use AppBundle\Entity\Category;
use AppBundle\Entity\CategoryRepository;

use AppBundle\Entity\Extra;
use AppBundle\Entity\ExtraRepository;

use AppBundle\Helper\ApiResponse;

use Doctrine\Common\Collections\ArrayCollection;

class ProductController extends FOSRestController
{

//�	    Editors can add/delete products -> deleteProductAction() && createProductAction();
//�	    Editors can move products between categories -> updateProductAction();
//�	    Editors can change quantities -> updateProductAction();
//�	    Editors can reorder products

    public function getProductsAction()
    {
        $product_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Product');

        $products = $product_repository->getAllProducts();

        $products = $this->container->get('jms_serializer')->toArray($products);

        return ApiResponse::success(['data' => $products]);
    }

    public function getProductAction($id)
    {
        $product_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Product');

        $product = $product_repository->findOneBy(array('id' => $id));

        $product = $this->container->get('jms_serializer')->toArray($product);

        return ApiResponse::success(['data' => $product]);
    }


    public function putRatingAction(Request $request)
    {
        $data = $request->get('vote_data');

        $user_vote_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:UserVote');
        $product_rating_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:ProductRating');

        $vote_ent = new UserVote();

        $form = $this->createForm(new UserVoteType(), $vote_ent);
        $form->submit($data);

        if(!$form->isValid()){
            return ApiResponse::fail(['error' =>$this->container->get('jms_serializer')->toArray($form->getErrors())]);
        }

        $vote = $user_vote_repository->insertVote($data);

        $rating = $product_rating_repository->updateRating($vote);

        $rating = $this->container->get('jms_serializer')->toArray($rating);

        return ApiResponse::success(['data' => $rating]);
    }

    public function updateProductAction($id, Request $request)
    {
        $session = $request->getSession();

        $user = $session->get('user');

        if($user === null)
        {
            return ApiResponse::fail(['error' => 'No logged in User']);
        }

        if($user->getRoles()->getName() == 'basic'){
            return ApiResponse::fail(['error' => 'User does not have permission for this operation']);
        }

        $product_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Product');
        $product = $product_repository->findOneBy(array('id' => $id));

        $data = $request->get('data');
      //  try{
            $this->validateProductUpdate($data);
        // }catch(\Exception $e){
        //     //return ApiResponse::fail(['error' => $e->getMessage()]);
        // }

        if ($product === NULL) {
            return ApiResponse::fail(['error' => 'No such Product exists!']);
        }

        if(array_key_exists('category_id', $data)){
            $product->setCategoryId($data['category_id']);
        }

        if(array_key_exists('quantity', $data)){
            $product->setQuantity($data['quantity']);
        }

        $em = $this->getDoctrine()->getEntityManager();
        $em->persist($product);
        $em->flush();
        return ApiResponse::success(['data' => $this->container->get('jms_serializer')->toArray($product)]);


    return ApiResponse::fail(['error' => 'error!']);

    }

    private function validateProductUpdate($data){
      if(!array_key_exists('category_id', $data) && !array_key_exists('quantity', $data)){
        throw new \Exception( "Missing parameters");
      }
      if(array_key_exists('category_id', $data)){
        if($data['category_id'] == '' || $data['category_id'] === null){
          throw new \Exception( "Wrong category parameter");
        }
      }

      if(array_key_exists('quantity', $data)){
        if($data['quantity'] == '' || $data['quantity'] === null){
          throw new \Exception( "Wrong quantity parameter");
        }
      }
    }

    public function deleteProductAction($id, Request $request)
    {
        $session = $request->getSession();

        $user = $session->get('user');

//        if($user === null)
//        {
//            return ApiResponse::fail(['error' => 'No logged in User']);
//        }
//
//        if($user->getRoles()->getName() == 'basic'){
//            return ApiResponse::fail(['error' => 'User does not have permission for this operation']);
//        }

        $product_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Product');
        $product = $product_repository->findOneBy(array('id' => $id));

        if ($product === NULL) {
            return ApiResponse::fail(['error' => 'No such product exists!']);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($product);
        $em->flush();

        return ApiResponse::success(['data' => 'Product Deleted!']);

    }

}
