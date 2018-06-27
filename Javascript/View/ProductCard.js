class ProductCard
{
    /**
     * 
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
        `<div class="col-12 col-md-6 col-lg-4 col-xl-3" id="${this.key}">
            <article class="card">
                <img src="Images/${this.img}" alt="${this.name}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <p class="card-text">${this.description}</p>
                    <p class="d-flex justify-content-between"><a class="btn btn-outline-dark" onclick="ProductCard.ClickHandler('${this.key}')">Bestil</a><span>${this.price}</span></p>
                </div>
            </article>
        </div>`

        return productCard;
    }

    /**
     * Contains the HTML to create list items in the order list
     */
    RenderList()
    {
        let listItem =  `<li class="list-group-item d-flex justify-content-between" id="${this.name}">${this.name}</span><span>${this.price}</span></li>`

        return listItem;
    }
    /**
     * Updates the list with the number of this specific coffee that is ordered
     * @param {Number} amount 
     */
    static UpdateList(amount)
    {
        return `<span>${amount}</span>`
    }

    /**
     * Makes a new instance of the Product class for each object in the database and adds them to the page using the Render method
     * And checks if the item is on the order list and displays it on the list if it is
     */
    static SetupUserInterface()
    {
        let cardSection = document.getElementById('productCards'),
            list = document.getElementById('productList');

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
                product = new Product(Product.instances[key])
            
            list.insertAdjacentHTML('afterbegin', product.RenderList());
        }
    }

    /**
     * Adds the product to the order list when the order button on the card is clicked and tallies up the total cost of the products in the list
     * @param {Number} key
     */
    static ClickHandler(key)
    {
        let product = new ProductCard(Product.instances[key], key),
            list = document.getElementById('productList'),
            order = {};
        
        
        if(Order.instances[key])
        {
            order = Order.instances[key];
            order.amount += 1;
            console.log(order.amount);
            let id = 'amount'+order.name;
            console.log(id);
            let item = document.getElementById(order.name);
            item.insertAdjacentHTML('afterbegin', this.UpdateList(order.amount));
        }
        else
        {
            order = new Order({
                name: product.name,
                price: product.price,
                amount: 1});
            
            list.insertAdjacentHTML('afterbegin', product.RenderList());

        }
        Order.instances[key] = order;
        let calc = Order.Calc(),
            totalProducts = 0 + calc[0],
            totalPrice = 0 + calc[1];
        
        console.log(calc[1]);

        document.getElementById('orderCount').innerHTML = totalProducts;
        document.getElementById('orderTotal').innerHTML = totalPrice;
        Product.SaveAll();
    }
}