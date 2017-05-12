<?php

namespace AppBundle\Form;

use Guzzle\Common\Collection;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ProductType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name' )
            ->add('category_id', 'integer')
            ->add('quantity', 'integer')
        ;
    }

    // /**
    //  * @param OptionsResolverInterface $resolver
    //  */
    // public function setDefaultOptions(OptionsResolverInterface $resolver)
    // {
    //     $resolver->setDefaults(array(
    //         'data_class' => 'AppBundle\Entity\Product'
    //     ));
    // }

    /**
     * @return string
     */
    public function getName()
    {
        return 'appbundle_product';

    }
}
