class Order 
{
    constructor(product)
    {
        this.name = product.name;
        this.price = product.price;
        this.amount = product.amount;
    }

    static Calc()
    {
        let totalProducts = 0,
            totalPrice = 0,
            key = '',
            keys = Object.keys(Order.instances);

            for(let i = 0; i < keys.length; i++)
            {
                key = keys[i];
                let product = Order.instances[key];
                totalProducts += product.amount;
                totalPrice += product.amount * product.price;
            }
        console.log(totalPrice);
        return[totalProducts, totalPrice];
    }
}
Order.instances = {};