var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the displayInventory function after the connection is made to show the products and prompt the user
  displayInventory();
});

// Display Inventory 
function displayInventory() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    console.log("\nWelcome to Bamazon - Check Inventory");
    console.table(results);
    productQuery();
    // connection.end();
  }
  )
};

// Complete Order and update inventory database
function fulfillOrder(item_id, new_quantity, totalPrice) {
  
  console.log("new quantity: ", new_quantity);
  console.log("Item ID: ", item_id);
  connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: new_quantity
      },
      {
        id: item_id 
      }
    ],
    function (err, res) {
      if (err) throw err;
      console.log("\n==================");
      console.log("\Order Fulfilled");
      console.log("\nTotal Cost: " + totalPrice);
      console.log("==================");
      connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("\nInventory Update");
        console.table(results);
        // productQuery();
        connection.end();
      });
    });
};

function checkInventory(item_id, quantity) {
  console.log("Checking Inventory");
  connection.query("SELECT * FROM products WHERE id=?", [item_id], function (err, response) {
    if (err) {
      throw err
    };
    // console.log("Response");
    // console.log(response);
    // console.log(quantity, response[0].stock_quantity);
    if (response[0].stock_quantity >= parseInt(quantity)) {
      var new_quantity = response[0].stock_quantity - parseInt(quantity);
      fulfillOrder(item_id, new_quantity, (quantity * response[0].price));
    }
    else {
      console.log("Insufficient quantity! Cannot process order");
      connection.end();
    }
  })
};

function productQuery() {
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "Enter the ID of the product you would like to buy:",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units of the product you would like to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
    ])
    .then(function (answer) {
      console.log("item ID: " + answer.item_id);
      console.log("Quantity: " + answer.quantity);
      checkInventory(answer.item_id, answer.quantity);
    });
}


