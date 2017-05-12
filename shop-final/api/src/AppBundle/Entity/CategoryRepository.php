<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Tools\Pagination\Paginator;
use JMS\Serializer;
/**
 * CategoryRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CategoryRepository extends \Doctrine\ORM\EntityRepository
{

    public function getAll(){
        $em = $this->getEntityManager();
        $qb = $this->createQueryBuilder('c');
        $query = $qb->where($qb->expr()->isNull('c.categoryId'))
                    ->getQuery();

        return $query->getResult();
    }

    public function getOneBy(array $by, $page, $offset, $filters = [], $sort){
        $res = $this->findOneBy($by);
        $qb = $this->_em->createQueryBuilder()
                    ->select('p')
                   ->from('AppBundle:Product', 'p')
                   ->where('p.categoryId = :identifier')
                   ->join('p.extra', 'e')
                   ->setParameter('identifier', $by['id']);


        foreach($filters as $filter){
            switch ($filter['name']) {
                case 'price':
                    $qb->andWhere('e.price BETWEEN :min and :max')
                       ->setParameter('min', $filter['value'][0])
                       ->setParameter('max', $filter['value'][1]);
                    break;
                case 'brand':
                    $qb->join('p.brand', 'b')
                        ->andWhere('b.name IN (:brands)')
                        ->setParameter('brands', array_values($filter['value']));
                    break;
                default:
                    $whereClause = 'e.' . $filter['name'] . ' IN (:values)';
                    $qb->andWhere($whereClause)
                    ->setParameter('values', array_values($filter['value']));
                    break;
            }
        }

        if($sort !== NULL){
          $qb->orderBy('e.price', $sort['order']);
        }

        $qb->setFirstResult(($page-1) * $offset)
            ->setMaxResults($offset)
            ->getQuery();

        $paginator = new Paginator($qb);

       return [
          'paginator' => $paginator,
          'total' => count($paginator),
          'category' => $res
       ];

   }

   public function getCategoryWithProducts($category_id){
     $res = $this->findOneBy(['id' => $category_id]);
     $qb = $this->_em->createQueryBuilder()
                ->select('p')
                ->from('AppBundle:Product', 'p')
                ->where('p.categoryId = :identifier')
                ->setParameter('identifier', $category_id)
                ->getQuery();

      $products = $qb->getResult();
      $res->setProducts($products);

      return $res;
   }

   public function exists($category_id){
     $cat = $this->findOneBy(['id' => $category_id]);
     return $cat !== NULL;
   }


   public function getFilters($category_id, array $filter_types){
       $serializer = Serializer\SerializerBuilder::create()->build();

       $category = $this->findOneBy(['id' => $category_id]);
       $qb = $this->_em->createQueryBuilder()
                   ->select('p')
                  ->from('AppBundle:Product', 'p')
                  ->where('p.categoryId = :identifier')
                  ->setParameter('identifier', $category_id)
                  ->getQuery();

        $category->setProducts($qb->getResult());

        $catSerialized = $serializer->toArray($category);

        $products = $catSerialized['products'];
        $filters = [];

        foreach ($filter_types as $filter_type) {
            $filters[$filter_type] = [];
            foreach($products as $product){
                $value = array_key_exists($filter_type, $product['extra'])
                        ? $product['extra'][$filter_type]
                        : $product[$filter_type];

                $value = is_array($value)
                         ? $value['name']
                         : $value;
                $value .= '';
                if(!array_key_exists($value, $filters[$filter_type]))
                    $filters[$filter_type][$value] = 1;
                else
                    $filters[$filter_type][$value] ++ ;
            }
        }

        return $filters;

   }

    public function getCategoriesById(array $ids){
        $em = $this->getEntityManager();
        $qb = $this->createQueryBuilder('c');
        $query = $qb->select('c.id, c.name')->where($qb->expr()->in('c.id', $ids))
            ->getQuery();

        return $query->getResult();
    }

}
