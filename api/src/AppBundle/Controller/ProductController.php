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

use AppBundle\Entity\Product;
use AppBundle\Entity\ProductRepository;

use AppBundle\Entity\Category;
use AppBundle\Entity\CategoryRepository;

use AppBundle\Entity\Extra;
use AppBundle\Entity\ExtraRepository;

use AppBundle\Helper\ApiResponse;

use Doctrine\Common\Collections\ArrayCollection;

class ProductController extends FOSRestController{
    public function getProductsAction(){
        $product_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Product');

        $products = $product_repository->findAll();

        $products = $this->container->get('jms_serializer')->toArray($products);

        return ApiResponse::success(['data' => $products]);
    }

    public function getProductAction($id){
        $product_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Product');

        $product = $product_repository->findOneBy(array('id' => $id));

        $product = $this->container->get('jms_serializer')->toArray($product);

        return ApiResponse::success(['data' => $product]);
    }

}
