<?php

namespace AppBundle\Controller;

use AppBundle\Entity\DiscountProduct;
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


class BrandController extends FOSRestController{

    public function getBrandsAction(){
        $brand_repository = $this->getDoctrine()->getManager()->getRepository('AppBundle:Brand');

        $brands = $brand_repository->findAll();

        $brands = $this->container->get('jms_serializer')->toArray( $brands);

        return ApiResponse::success(['data' =>  $brands]);
    }

    public function getBrandAction($id){

        $brand_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Brand');
        $brand = $brand_repository->findOneBy(array('id' => $id));
        $brand = $this->container->get('jms_serializer')->toArray($brand);

        $products_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Product');
        $categories_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Category');

        $products = $products_repository->findBy( array('brandId' => $id));


        $products = $this->container->get('jms_serializer')->toArray($products);
        //$brand['products'] = $products;

        $categoryArray = [];

        foreach ($products as  $val){
            if(in_array($val['category_id'],$categoryArray))
                continue;
            $categoryArray[] = $val['category_id'];
        }

        $categoryArray =  $this->container->get('jms_serializer')
            ->toArray($categories_repository->getCategoriesById($categoryArray));


        foreach ($categoryArray as &$category){
            $category['products'] = [];
            foreach ($products as $product){
                if($product['category_id'] == $category['id'] && !in_array($product, $category['products'])){
                    $category['products'][] = $product;
                }
            }
        }

        $brand['categories'] = $categoryArray;

        return ApiResponse::success(['data' => $brand]);
    }

}