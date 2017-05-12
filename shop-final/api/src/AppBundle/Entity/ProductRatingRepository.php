<?php

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * ProductRatingRepository
 *
 * This class was generated by the PhpStorm "Php Annotations" Plugin. Add your own custom
 * repository methods below.
 */
class ProductRatingRepository extends EntityRepository
{
    public function updateRating($vote){
        $product_rating = $this->findOneBy(array('productId'=> $vote->getProductId()));
        $em = $this->getEntityManager();
        $votes_repository = $this->getEntityManager()->getRepository('AppBundle:UserVote');
        $votes = $votes_repository->findBy(array('productId' => $vote->getProductId()));
        $overall_rating = 0;

        foreach ($votes as $vote) {
            $overall_rating += $vote->getRating();
        }

        $rating_count = $product_rating->getRatingCount();
        $rating_count = $rating_count + 1;

        $rating_sum = ($overall_rating + $vote->getRating());

        $rating_new = ($rating_sum / $rating_count );

        $rating_new = round($rating_new);

        $product_rating->setRating($rating_new);
        $product_rating->setRatingCount($rating_count);


        $em->persist($product_rating);
        $em->flush();

        return $product_rating;
    }
}