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
     * @ORM\OneToOne(targetEntity="Extra", mappedBy="product")
     */
    private $extra;


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

    public function getObj(){
        $ret = array();
        foreach(get_object_vars($this) as $key => $val){
                $ret[$key] = $val;
        }

        return $ret;
    }
}
