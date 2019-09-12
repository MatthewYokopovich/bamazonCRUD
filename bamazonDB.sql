DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    stock_quantity INT,
    price DECIMAL(10, 2) NULL,
    product_sales DECIMAL(15, 2) NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments(
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100),
    over_head_costs DECIMAL(15, 2),
    PRIMARY KEY (department_id)
    );

INSERT INTO products(product_name, department_name, stock_quantity, price)
VALUES("Valve Index", "Gaming", 10, 1000.00), 
("Gamer Girl Bathwater", "Hygeine", 5, .50), 
("Homestuck Godtier Hoodie", "Clothing", 100, 50.00), 
("Fallout 76", "Gaming", 100000, 15.00), 
("Neckbeard Brand Deoderant", "Hygeine", 0, 10.00),
("Air Jordans", "Clothing", 100, 100.00),
("Donald Trump's Toupeé", "Memorabilia", 1, 5000.00),
("Signed Michael Jordan jersey", "Memorabilia", 1, 50000.00),
("Dororo Bluray", "Media", 100, 30.00),
("My Dignity", "Misc", 1, .01);

SELECT * FROM products;