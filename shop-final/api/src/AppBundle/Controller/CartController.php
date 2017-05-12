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

use AppBundle\Model\Cart;

use AppBundle\Form\CartProductType;
use Cassandra\Exception\AlreadyExistsException;

use AppBundle\Entity\Purchase;

class CartController extends FOSRestController{

    /**
     * Get Cart from session (if any)
     * @param  Request $request Request object
     * @return {ApiResponse}
     */
    public function getCartAction(Request $request){
        $session = $request->getSession();
        $cart = $session->get('cart');
        return ApiResponse::success(['cart' => $this->container->get('jms_serializer')->toArray($cart)]);
    }

    /**
     * Add Product to Cart
     * @param Request $request [description]
     * @return ApiResponse
     */
    public function addProductAction(Request $request){
        //Get request data
        $product_data = $request->get('data');
        //Create form
        //@see AppBundle\Form\CartProductType
        $form = $this->createForm(new CartProductType());
        $form->submit($product_data);

        if($form->isValid()){
            //Get Product Entity with id = data.product_id
            $product_repository = $this->getDoctrine()->getEntityManager()->getRepository('AppBundle:Product');
            $product = $product_repository->findOneBy(['id' => $product_data['product_id']]);
            //Get Cart object from session
            $session = $request->getSession();
            $cart = $session->get('cart');
            //Create Cart Model object
            //@see AppBundle\Model\Cart
            $cart = ($cart !== null) ? new Cart($cart->products) : new Cart();
            //Add Product to Cart
            $cart->addProduct($product, $product_data['quantity'], $product_data['price']);
            //Save new Cart object to session
            $session->set('cart', $cart);

            return ApiResponse::success(['data' => $this->container->get('jms_serializer')->toArray($cart)]);
        }else{
            return ApiResponse::fail(['error' =>  $this->container->get('jms_serializer')->toArray($form->getErrors())]);
        }
    }

    /**
     * Remove Product from Cart
     * @param  Request $request
     * @return ApiResponse
     */
    public function removeProductAction(Request $request){
        $product_data = $request->get('data');

        $form = $this->createForm(new CartProductType());
        $form->submit($product_data);

        if($form->isValid()){

            $session = $request->getSession();
            $cart = $session->get('cart');

            $cart = new Cart($cart->products);

            $cart->removeProduct($product_data);
            $session->set('cart', $cart);

            return ApiResponse::success(['data' => $this->container->get('jms_serializer')->toArray($cart)]);
        }else{
            return ApiResponse::fail(['error' => $form->getErrors()]);
        }
    }

    public function checkoutAction(Request $request){
      try{
        $em = $this->getDoctrine()->getEntityManager();
        $session = $request->getSession();
        $cart = $session->get('cart');
        $user = $session->get('user');

        $em->getConnection()->beginTransaction(); // suspend auto-commit
        try {
          $price_to_pay = $cart->getPriceToPlay();
          $products_ids = $cart->getProductList();

          $purchase = new Purchase();
          $purchase->setUserId($user->getId());
          $purchase->setPricePaid($price_to_pay);
          $purchase->setProducts($products_ids);

          $em->persist($purchase);

          foreach ($cart->products as &$product) {
            $quantity = $product['product']->getQuantity();
            $quantity = $quantity - $product['quantity'];
            $product['product']->setQuantity($quantity);
            $em->merge($product['product']);
          }

          $user_cash = ($user->getCash() - $price_to_pay);

          $user->setCash($user_cash);
          $em->merge($user);
          $em->flush();
          $em->getConnection()->commit();
          $session->remove('cart');
          return ApiResponse::success(['data' => 'work']);
        } catch (\Exception $e) {
            $em->getConnection()->rollBack();
            throw $e;
        }

      }catch(\Exception $e){
        return ApiResponse::fail(['error' => $e->getMessage()]);
      }
    }



    /**
     * Change Cart Product Quatity
     * @param  Request $request
     * @return ApiResponse
     */
    public function changeQuantityAction(Request $request){
        $product_data = $request->get('data');

        $form = $this->createForm(new CartProductType());
        $form->submit($product_data);

        if($form->isValid()){

            $session = $request->getSession();
            $cart = $session->get('cart');

            $cart = new Cart($cart->products);

            $cart->changeQuantity($product_data);
            $session->set('cart', $cart);

            return ApiResponse::success(['data' => $this->container->get('jms_serializer')->toArray($cart)]);
        }else{
            return ApiResponse::fail(['error' => $form->getErrors()]);
        }
    }

}
