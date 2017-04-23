export class Product{
    
    id: number;

    name: string;

    quantity: number;

    category_id: number;

    extra: ProductExtra;


    public constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.quantity = data.quantity;
        this.category_id = data.category_id;
        this.extra = data.extra;
    }
}

interface ProductExtra{
    id: number,
    price: number,
    description: string,
    color: string,
}
