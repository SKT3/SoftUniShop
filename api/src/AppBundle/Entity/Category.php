<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Category
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\CategoryRepository")
 */
class Category
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
     * @ORM\Column(name="name", type="string", length=256)
     */
    private $name;

    /**
     * @var integer
     *
     * @ORM\Column(name="category_id", type="integer", nullable=true)
     */
    private $categoryId;

    // /**
    //  * @ORM\OneToMany(targetEntity="Product", mappedBy="category", fetch="EXTRA_LAZY")
    //  */
    // private $products;


    /**
     * One Category has Many Categories.
     * @ORM\OneToMany(targetEntity="Category", mappedBy="parent")
     */
    private $children;

    /**
     * Many Categories have One Category.
     * @ORM\ManyToOne(targetEntity="Category", inversedBy="children")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     */
   private $parent;

   private $products;

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
     * @return Category
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

    public function getProducts(){
        return $this->products;
    }

    public function setProducts($val){
        $this->products = $val;
    }

    /**
     * Set categoryId
     *
     * @param integer $categoryId
     *
     * @return Category
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
     * Constructor
     */
    public function __construct()
    {
        //$this->products = new \Doctrine\Common\Collections\ArrayCollection();
        $this->children = new \Doctrine\Common\Collections\ArrayCollection();
    }

    // /**
    //  * Add product
    //  *
    //  * @param \AppBundle\Entity\Product $product
    //  *
    //  * @return Category
    //  */
    // public function addProduct(\AppBundle\Entity\Product $product)
    // {
    //     $this->products[] = $product;
    //
    //     return $this;
    // }
    //
    // /**
    //  * Remove product
    //  *
    //  * @param \AppBundle\Entity\Product $product
    //  */
    // public function removeProduct(\AppBundle\Entity\Product $product)
    // {
    //     $this->products->removeElement($product);
    // }

    // /**
    //  * Get products
    //  *
    //  * @return \Doctrine\Common\Collections\Collection
    //  */
    // public function getProducts()
    // {
    //     return $this->products;
    // }

    /**
     * Add child
     *
     * @param \AppBundle\Entity\Category $child
     *
     * @return Category
     */
    public function addChild(\AppBundle\Entity\Category $child)
    {
        $this->children[] = $child;

        return $this;
    }

    /**
     * Remove child
     *
     * @param \AppBundle\Entity\Category $child
     */
    public function removeChild(\AppBundle\Entity\Category $child)
    {
        $this->children->removeElement($child);
    }

    /**
     * Get children
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * Set parent
     *
     * @param \AppBundle\Entity\Category $parent
     *
     * @return Category
     */
    public function setParent(\AppBundle\Entity\Category $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent
     *
     * @return \AppBundle\Entity\Category
     */
    public function getParent()
    {
        return $this->parent;
    }
}
