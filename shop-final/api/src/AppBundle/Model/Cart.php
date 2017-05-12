<?php

namespace AppBundle\Model;

class Cart{

    /**
     * Products added to cart
     * @var Array
     */
    public $products;

    public function __construct($products = array()){
        if($products === null)
            $this->products = array();
        else
            $this->products = $products;
    }

    /**
     * Add product to Cart
     * @param AppBundle\Entity\Product $product
     * @param number $quantity
     * @return Cart
     */
    public function addProduct($product, $quantity, $price){
        $index = null;
        foreach ($this->products as $key => $value) {
            if($value['product']->getId() == $product->getId())
            {
                $index = $key;
                break;
            }
        }

        if($index === null){
            $this->products[] = ['product' => $product,
                                  'price' => $price,
                                  'quantity' => $quantity];
        }

        return $this;
    }

    /**
     * Remove Product from Cart
     * @param  AppBundle\Entity\Product $product
     * @return void    Cart
     */
    public function removeProduct($product){
        $index = null;
        foreach ($this->products as $i => $cart_product) {
            if($cart_product['product']->getId() == $product['product_id']){
                $index = $i;
                break;
            }
        }
        if($index !== null)
            array_splice($this->products, $index, 1);
        return $this;
    }

    /**
     * Change Cart product quantity
     * @param  $product
     * @return Cart
     */
    public function changeQuantity($product){
        foreach ($this->products as $key => &$value) {
            if($value['product']->getId() == $product['product_id']){
                $value['quantity'] = $product['quantity'];
                break;
            }
        }

        return $this;
    }

    public function getPriceToPlay(){
      $out = 0;
      foreach ($this->products as $product) {
        $out += $product['price'] * $product['quantity'];
      }
      return $out;
    }

    public function getProductList(){
      $out = [];
      foreach ($this->products as $product) {
          $out[] = $product['product']->getId();
      }
      return $out;
    }
}
