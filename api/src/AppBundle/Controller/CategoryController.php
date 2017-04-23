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

class CategoryController extends FOSRestController{
    public function getCategoriesAction(){
        $category_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Category');

        $categories = $category_repository->getAll();
        //$categories = $category_repository->fingAll();

        $categories = $this->container->get('jms_serializer')->toArray($categories);

        return ApiResponse::success(['data' => $categories]);
    }

    public function getCategoryAction($id){
        $category_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Category');

        $category = $category_repository->getOneBy(array('id' => $id));

        $category = $this->container->get('jms_serializer')->toArray($category);

        return ApiResponse::success(['data' => $category]);

    }

}
