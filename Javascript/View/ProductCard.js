class ProductCard
{

    /**
     * @param {Bool} order
     * @param {Object} slot 
     * @param {Number} key 
     */
    constructor(slot, key, orderList)
    {
        this.name = slot.name;
        this.description = slot.description;
        this.price = slot.price;
        this.img = slot.img;

        this.key = key;

        this.orderList = orderList;
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
        let listItem =  `<li class="list-group-item d-flex justify-content-between">${this.name}<span>${this.price}</span></li>`

        return listItem;
    }

    /**
     * Makes a new instance of the Product class for each object in the database and adds them to the page using the Render method
     * And checks if the item is on the order list and displays it on the list if it is
     */
    static SetupUserInterface()
    {
        let cardSection = document.getElementById('productCards'),
            list = document.getElementById('productList'),
            badgeCount = 0,
            total = 0;

        Product.LoadAll();

        let keys = Object.keys(Product.instances);

        for(let i = 0; i < keys.length; i++)
        {
            let key = keys[i],
                productCard = new ProductCard(Product.instances[key], key);

            cardSection.insertAdjacentHTML('afterbegin', productCard.RenderCard());

            if(productCard.order)
            {
                list.insertAdjacentHTML('afterbegin', productCard.RenderList());
                badgeCount += 1;
                total += productCard.price;
            }
        }
        document.getElementById('orderCount').innerHTML = badgeCount;
        document.getElementById('orderTotal').innerHTML = total;
    }

    /**
     * Adds the product to the order list when the order button on the card is clicked and tallies up the total cost of the products in the list
     * @param {Number} key
     */
    static ClickHandler(key)
    {
        let product = new ProductCard(Product.instances[key], key),
            list = document.getElementById('productList');
        
        list.insertAdjacentHTML('afterbegin', product.RenderList());

        product.order = true;
        Product.instances[key] = product;

        Product.SaveAll();
    }
}