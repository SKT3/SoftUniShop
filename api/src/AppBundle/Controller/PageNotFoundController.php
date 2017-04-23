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

class PageNotFoundController extends FOSRestController{
    public function redirect(){
        // $loader = $this->container->get('app.root_loader');
        // $loader->load();
        return $this->render(
        'root.html.php'
    );

    }


}
