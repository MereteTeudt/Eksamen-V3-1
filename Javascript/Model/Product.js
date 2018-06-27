class Product
{
    /**
     * 
     * @param {Object} slot 
     */
    constructor(slot)
    {
        this.name = slot.name;
        this.description = slot.description;
        this.price = slot.price;
        this.img = slot.img;
    }
    
    /**
     * Stores all the objects in Product.instances in Session Storage
     */
    static SaveAll(orders)
    {
        let productTableString = '',
            orderTableString = '',
            error = false,
            nmbrOfProducts = Object.keys(Product.instances).length;

        try
        {
            productTableString = JSON.stringify(Product.instances);
            sessionStorage['productTable'] = productTableString;

            orderTableString = JSON.stringify(orders);
            sessionStorage['orderTable'] = orderTableString;
        }
        catch(e)
        {
            alert('Error when reading from Session Storage\n' + e);
            error = true;
        }
        if(!error)
        {
            console.log(nmbrOfProducts + ' products saved.');
        }
    }

    /**
     * Creates a new instance of Product from the object given in the parameter
     * @param {Object} productRow 
     */
    static ConvertRow2Object(productRow)
    {
        var product = new Product(productRow);
        return product;
    }

    /**
     * Stores all the objects in Session Storage in Product.instances
     */
    static LoadAll()
    {
        let key = '',
            keys = [],
            productTableString = '',
            productTable = {},
            orderTable = {},
            orderTableString = '';

        try
        {
            if(sessionStorage['productTable'])
            {
                console.log(sessionStorage['productTable']);
                productTableString = sessionStorage['productTable'];
            }
        }
        catch(e)
        {
            alert('Error when reading from Session Storage productTable\n');
        }
        if(productTableString)
        {
            productTable = JSON.parse(productTableString);
            keys = Object.keys(productTable);
            console.log(keys.length + ' products loaded');
            for(let i = 0; i < keys.length; i++)
            {
                key = keys[i];
                Product.instances[key] = Product.ConvertRow2Object(productTable[key]);
            }
        }
        else
        {
            this.CreateTestData();
        }
        try
        {
            if(sessionStorage['orderTable'])
            {
                console.log(sessionStorage['orderTable']);
                orderTableString = sessionStorage['orderTable'];
            }
        }
        catch(e)
        {
            alert('Error when reading from Session Storage orderTable\n');
        }
        if(! typeof orderTableString === 'undefined')
        {
            console.log(orderTableString);
            orderTable = JSON.parse(orderTableString);
            keys = Object.keys(orderTable);
            for(let i = 0; i < keys.length; i++)
            {
                keys = keys[i];
                Orders.instances[key] = Orders.ConvertRow2Object(orderTable[key]);
            }
        }
    }
    /**
     * Creates instances of the Product class for testing
     */
    static CreateTestData()
    {
        Product.instances['americano'] = new Product({
            name : "Americano",
            description : "Stærk crema espresso med varmt vand",
            price : 60,
            img : "Americano.jpg"
        });
        Product.instances['caffeLatte'] = new Product({
            name : "Caffe latte",
            description : "Espresso med skummet varm mælk",
            price : 65,
            img : "Caffe_Latte.jpg"
        });
        Product.instances['cappuchino'] =  new Product({
            name : "Cappuccino",
            description : "Espresso med dampet mælk og skum",
            price : 75,
            img : "Cappuccino.jpg"
        });
        Product.instances['espresso'] = new Product({
            name : "Espresso",
            description : "Espresso lavet af vores dygtigste baristaer",
            price : 50,
            img : "Espresso.jpg"
        });
        Product.instances['macchiato'] = new Product({
            name : "Macchiato",
            description : "Lækker espressodrik med skummet mælk og chokolade",
            price : 100,
            img : "Macchiato.jpg"
        });

        let product = Product.instances['macchiato'];

        Order.instances[product.name] = new Order({
            name : product.name,
            price : product.price,
            amount : 1
        });
        Product.SaveAll(Order.instances);
    }
}
/**
 * Creates a new property of the Product class named instances with the datatype object
 */
Product.instances = {};