class ProductCard
{
    /**
     * An instance of this class is a coffee product for representation on a card
     * @param {Object} slot 
     * @param {Number} key 
     */
    constructor(slot, key)
    {
        this.name = slot.name;
        this.description = slot.description;
        this.price = slot.price;
        this.img = slot.img;

        this.key = key;

    }
    
    /**
     * Contains the HTML to create the cards for the products
     */
    RenderCard()
    {
        let productCard = 
        `<div class="col-12 col-md-6 mt-4" id="${this.key}">
            <article class="card cardHeight cardZoom bg-light">
                <img src="Images/${this.img}" alt="${this.name}" class="card-img-top">
                <div class="card-body m-3 p-2 bg-white border rounded">
                    <h5 class="card-title">${this.name}</h5>
                    <p class="card-text pHeight">${this.description}</p>
                    <p class="d-flex justify-content-between m-0"><a class="btn btn-outline-dark " onclick="ProductCard.ClickHandler('${this.key}')">Bestil</a><span>${this.price}kr.</span></p>
                </div>
            </article>
        </div>`

        return productCard;
    }

    /**
     * Updates the list with the number of this specific coffee that is ordered
     * @param {Number} amount 
     */
    static UpdateAmount(amount)
    {
        return `<span>${amount}x</span>`
    }

    static UpdatePrice(allPrice)
    {
        return `<span>${allPrice}</span>`
    }

    /**
     * Makes a new instance of the Product class for each object in the database and adds them to the page using the Render method
     * And checks if the item is on the order list and displays it on the list if it is
     */
    static SetupUserInterface()
    {
        let cardSection = document.getElementById('productCards'),
            list = document.getElementById('productList'),
            button = document.getElementById('orderButton');

        Product.LoadAll();

        let productKeys = Object.keys(Product.instances);

        for(let i = 0; i < productKeys.length; i++)
        {
            let key = productKeys[i],
                productCard = new ProductCard(Product.instances[key], key);

            cardSection.insertAdjacentHTML('afterbegin', productCard.RenderCard());

        }
        let orderKeys = Object.keys(Order.instances);

        for(let i = 0; i < orderKeys.length; i++)
        {
            let key = orderKeys[i],
                order = new Order(Order.instances[key]);
                
            button.classList.remove('disabled');

            list.insertAdjacentHTML('afterbegin', order.RenderList());
        }

        ProductCard.UpdateList();

        Product.SaveAll();
    }

    /**
     * Adds the product to the order list when the order button on the card is clicked and tallies up the total cost of the products in the list
     * @param {Number} key
     */
    static ClickHandler(key)
    {
        let product = new ProductCard(Product.instances[key], key),
            list = document.getElementById('productList'),
            button = document.getElementById('orderButton'),
            order = {};
        
        button.classList.remove('disabled');

        if(Order.instances[key])
        {
            order = new Order(Order.instances[key]);
            order.amount += 1;
            Order.instances[key] = order;
            let updatedOrder = new Order(Order.instances[key]);
            document.getElementById(order.name+'amount').innerHTML = this.UpdateAmount(updatedOrder.amount);
            document.getElementById(order.name+'price').innerHTML = this.UpdatePrice(updatedOrder.allPrice);
        }
        else
        {
            order = new Order({
                name: product.name,
                price: product.price,
                amount: 1});
            
                Order.instances[key] = order;
            list.insertAdjacentHTML('afterbegin', order.RenderList());

        }

        
        ProductCard.UpdateList();

        Product.SaveAll();
    }
    static UpdateList()
    {
        let calc = Order.Calc(),
            totalProducts = 0 + calc[0],
            totalPrice = 0 + calc[1];

        document.getElementById('orderCount').innerHTML = totalProducts;
        document.getElementById('orderTotal').innerHTML = totalPrice;
    }
}