class Order 
{
    constructor(product)
    {
        this.name = product.name;
        this.price = product.price;
    }

    static CountProducts()
    {
        let products = 0,
            keys = Object.keys(Order.instances);

        for(let i = 0; i < keys.length; i++)
        {
            products += 1;
        }

        return products;
    }
    static OrderTotal()
    {
        let amount = this.CountProducts,
            total = 0,
            key = '',
            keys = Object.keys(Order.instances);
        
        for(let i = 0; i < amount; i++)
        {
            key = keys[i];
            let product = Order.instances[key];
            total += product.price;
        }

        return total;
    }
}
Order.instances = {};