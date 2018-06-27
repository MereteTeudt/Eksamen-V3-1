class Order 
{
    /**
     * An instance of this class is an order of one type of coffee product, name being the name of the coffee, price being the price 
     * @param {Object} product 
     */
    constructor(product)
    {
        this.name = product.name;
        this.price = product.price;
        this.amount = product.amount;

        this.allPrice = product.amount * product.price;
    }

        /**
     * Contains the HTML to create list items in the order list
     */
    RenderList()
    {
        let listItem =  `<li class="list-group-item d-flex justify-content-between" id=${this.key}>
                        <p>
                            <span id="${this.name}amount">${this.amount}x</span>
                        ${this.name}
                        </p>
                        <span id="${this.name}price">${this.allPrice}</span>
                        </li>`

        return listItem;
    }

    static Calc()
    {
        let product = {},
            totalProducts = 0,
            totalPrice = 0,
            key = '',
            keys = Object.keys(Order.instances);

            for(let i = 0; i < keys.length; i++)
            {
                key = keys[i];
                product = new Order(Order.instances[key]);
                totalProducts += product.amount;
                totalPrice += 0 + product.allPrice;
            }

        return[totalProducts, totalPrice];
    }
}
Order.instances = {};