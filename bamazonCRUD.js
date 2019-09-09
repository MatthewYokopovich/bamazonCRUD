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
    var query = connection.query(
        'SELECT * FROM products',
        function (err, res) {
            if (err) throw err;
            res.forEach(function (element) {
                console.log(`Item ID: ${element.item_id}  Product: ${element.product_name}  Price: $${element.price}`);
            });
            inquirer.prompt([{
                    name: "item_choice",
                    type: "number",
                    message: "Please enter the ID of the product you would like to purchase."
                },
                {
                    name: "item_quantity",
                    type: "number",
                    message: "Please enter the number of that product that you would like to purchase."
                }
            ]).then(function (p) {
                    var innerquery = connection.query(
                        'SELECT * FROM products WHERE item_id = ?', [p.item_choice],
                        function (err, res) {
                            if (err) throw err;
                            if (res[0].stock_quantity < p.item_quantity) {
                                console.log("Insufficient Quantity!");
                                init();
                            } else {
                                var temp = res[0].stock_quantity - p.item_quantity;
                                var totalcost = parseFloat(res[0].price * p.item_quantity);
                                var innerestquery = connection.query(
                                    `UPDATE products SET ? WHERE ?`, [{
                                        stock_quantity: temp
                                    }, {
                                        item_id: p.item_choice
                                    }]
                                );
                                console.log(innerestquery.sql);
                                console.log(`The total cost for ${p.item_quantity} ${res[0].product_name} is $${totalcost}`);
                                init();
                            }

                        })
            })
    }
);
}