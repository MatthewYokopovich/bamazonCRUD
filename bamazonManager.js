var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "052595my",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init();
});

function init() {
    console.log("Bamazon Manager Interface")
    inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "Select your task.",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add new Product", "Exit"]
    }]).then(function (u) {
        switch (u.choice) {
            case "View Products for Sale":
                viewProduct();
                break;
            case "View Low Inventory":
                viewLow();
                break;
            case "Add to Inventory":
                addInv();
                break;
            case "Add new Product":
                addNew();
                break;
            case "Exit":
                connection.end();
                break;
        }
    })
}

function viewProduct() {
    var query = connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            res.forEach(function (element) {
                console.log(`Item ID: ${element.item_id}  Product: ${element.product_name}  Price: $${element.price}  Stock: ${element.stock_quantity}`);
            });
        }
    )
}

function viewLow() {
    var query = connection.query(
        "SELECT * FROM products WHERE stock_quantity < 6",
        function (err, res) {
            if (err) throw err;
            res.forEach(function (element) {
                console.log(`Item ID: ${element.item_id}  Product: ${element.product_name}  Price: $${element.price}  Stock: ${element.stock_quantity}`);
            });
        }
    )
}

function addInv() {
    viewProduct();
    inquirer.prompt([{
        name: "id",
        message: "Please enter the ID of the item to modify.",
        type: "number"
    }, {
        name: "quantity",
        message: "Enter the amount to be added",
        type: "number"
    }]).then(function (u) {
        var innerquery = connection.query(
            'SELECT * FROM products WHERE item_id = ?', [u.id],
            function (err, res) {
                if (err) throw err;
                var newStock = res[0].stock_quantity + u.quantity;
                var innerestquery = connection.query(
                    `UPDATE products SET ? WHERE ?`, [{
                        stock_quantity: newStock
                    }, {
                        item_id: u.id
                    }], function(err, res){
                        if(err) throw err;
                    }
                );
                console.log(innerestquery.sql);
            })
    });
}

function addNew(){
    inquirer.prompt([
        {
            name: "product",
            message: "Enter the name of the product to be added"
        },{
            name: "department",
            message: "What department does this product belong to?"
        },{
            name: "price",
            message: "What is the price per item?",
            type: "number"
        }, {
            name: "stock",
            message: "How many of that item are we stocking?",
            type: "number"
        }
    ]).then(function(a){
        var toAdd = {product_name: a.product, department_name: a.department, price: a.price, stock_quantity: a.stock};
        var query = connection.query(
"INSERT INTO products SET ?", toAdd,
function(err, result){
                if(err) throw err;
            }
        )
        console.log(query.sql);
    })
}