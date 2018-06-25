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
    static SaveAll()
    {
        let productTableString = '',
            error = false,
            nmbrOfProducts = Object.keys(Product.instances).length;

        try
        {
            productTableString = JSON.stringify(Product.instances);
            sessionStorage['productTable'] = productTableString;
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
            productTable;

        try
        {
            if(sessionStorage['productTable'])
            {
                productTableString = sessionStorage['productTable'];
            }
        }
        catch(e)
        {
            alert('Error when reading from Session Storage\n');
        }
        if(productTableString)
        {
            productTable = JSON.parse(productTableString);
            keys = Object.keys(productTable);
            console.log(keys.length + 'products loaded');
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
    }

    /**
     * Creates instances of the Product class for testing
     */
    static CreateTestData()
    {
        Product.instances['americano'] = new Product({
            "navn" : "Americano",
            "beskrivelse" : "Stærk crema espresso med varmt vand",
            "pris" : "60kr",
            "img" : "Americano.jpg"
        });
        Product.instances['caffeLatte'] = new Product({
            "navn" : "Caffe latte",
            "beskrivelse" : "Espresso med skummet varm mælk",
            "pris" : "65kr",
            "img" : "Caffe_Latte.jpg"
        });
        Product.instances['cappuchino'] =  new Product({
            "navn" : "Cappuccino",
            "beskrivelse" : "Espresso med dampet mælk og skum",
            "pris" : "75kr",
            "img" : "Cappucino.jpg"
        });
        Product.instances['espresso'] = new Product({
            "navn" : "Espresso",
            "beskrivelse" : "Espresso lavet af vores dygtigste baristaer",
            "pris" : "50kr",
            "img" : "Espresso.jpg"
        });
        Product.instances['macchiato'] = new Product({
            "navn" : "Macchiato",
            "beskrivelse" : "Lækker espressodrik med skummet mælk og chokolade",
            "pris" : "100kr",
            "img" : "Macchiato.jpg"
        });

        Product.SaveAll();
    }
}
/**
 * Creates a new property of the Product class named instances with the datatype object
 */
Product.instances = {};