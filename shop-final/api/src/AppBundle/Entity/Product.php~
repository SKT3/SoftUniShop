<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Product
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\ProductRepository")
 */
class Product
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=4000)
     */
    private $name;

    /**
     * @var integer
     *
     * @ORM\Column(name="category_id", type="integer")
     */
    private $categoryId;

    /**
     * @var integer
     *
     * @ORM\Column(name="quantity", type="integer")
     */
    private $quantity;

    // /**
    // * @ORM\ManyToOne(targetEntity="Category", inversedBy="products")
    // * @ORM\JoinColumn(name="category_id", referencedColumnName="id")
    // */
    // private $category;

    /**
     * @ORM\OneToOne(targetEntity="Extra", mappedBy="product", cascade={"remove"})
     */
    private $extra;


    /**
     * @ORM\OneToOne(targetEntity="ProductRating", mappedBy="product", cascade={"remove"})
     */
    private $rating;


    /**
     * @ORM\ManyToOne(targetEntity="Brand")
     * @ORM\JoinColumn(name="brand_id", referencedColumnName="id")
     */
    private $brand;


    /**
     * @var integer
     *
     * @ORM\Column(name="brand_id", type="integer")
     */
    private $brandId;

    /**
     * @ORM\ManyToMany(targetEntity="DiscountProduct")
     * @ORM\JoinTable(name="products_discounts",
     *      joinColumns={@ORM\JoinColumn(name="product_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="discount_id", referencedColumnName="id", unique=true)}
     *      )
     */
    private $discounts;

    public function __construct()
    {
        $this->discounts = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Product
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set categoryId
     *
     * @param integer $categoryId
     *
     * @return Product
     */
    public function setCategoryId($categoryId)
    {
        $this->categoryId = $categoryId;

        return $this;
    }

    /**
     * Get categoryId
     *
     * @return integer
     */
    public function getCategoryId()
    {
        return $this->categoryId;
    }

    /**
     * Set quantity
     *
     * @param integer $quantity
     *
     * @return Product
     */
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;
    }

    /**
     * Get quantity
     *
     * @return integer
     */
    public function getQuantity()
    {
        return $this->quantity;
    }


    // /**
    //  * Set category
    //  *
    //  * @param \AppBundle\Entity\Category $category
    //  *
    //  * @return Product
    //  */
    // public function setCategory(\AppBundle\Entity\Category $category = null)
    // {
    //     $this->category = $category;
    //
    //     return $this;
    // }
    //
    // /**
    //  * Get category
    //  *
    //  * @return \AppBundle\Entity\Category
    //  */
    // public function getCategory()
    // {
    //     return $this->category;
    // }

    /**
     * Set extra
     *
     * @param \AppBundle\Entity\ProductExtra $extra
     *
     * @return Product
     */
    public function setExtra(\AppBundle\Entity\Extra $extra = null)
    {
        $this->extra = $extra;

        return $this;
    }

    /**
     * Get extra
     *
     * @return \AppBundle\Entity\Extra
     */
    public function getExtra()
    {
        return $this->extra;
    }

    public function getObj()
    {
        $ret = array();
        foreach (get_object_vars($this) as $key => $val) {
            $ret[$key] = $val;
        }

        return $ret;
    }

    /**
     * Set rating
     *
     * @param \AppBundle\Entity\ProductRating $rating
     *
     * @return Product
     */
    public function setRating(\AppBundle\Entity\ProductRating $rating = null)
    {
        $this->rating = $rating;

        return $this;
    }

    /**
     * Get rating
     *
     * @return \AppBundle\Entity\ProductRating
     */
    public function getRating()
    {
        return $this->rating;
    }

    /**
     * Set brand
     *
     * @param \AppBundle\Entity\Brand $brand
     *
     * @return Product
     */
    public function setBrand(\AppBundle\Entity\Brand $brand = null)
    {
        $this->brand = $brand;

        return $this;
    }

    /**
     * Get brand
     *
     * @return \AppBundle\Entity\Brand
     */
    public function getBrand()
    {
        return $this->brand;
    }

    /**
     * Set brandId
     *
     * @param integer $brandId
     *
     * @return Product
     */
    public function setBrandId($brandId)
    {
        $this->brandId = $brandId;

        return $this;
    }

    /**
     * Get brandId
     *
     * @return integer
     */
    public function getBrandId()
    {
        return $this->brandId;
    }

    /**
     * Add discount
     *
     * @param \AppBundle\Entity\DiscountProduct $discount
     *
     * @return Product
     */
    public function addDiscount(\AppBundle\Entity\DiscountProduct $discount)
    {
        $this->discounts[] = $discount;

        return $this;
    }

    /**
     * Remove discount
     *
     * @param \AppBundle\Entity\DiscountProduct $discount
     */
    public function removeDiscount(\AppBundle\Entity\DiscountProduct $discount)
    {
        $this->discounts->removeElement($discount);
    }

    /**
     * Get discounts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getDiscounts()
    {
        return $this->discounts;
    }
}
