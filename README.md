#bamazonCustomer App tutorial
https://drive.google.com/file/d/1j8IgUQdtAWcq801FBc4IS87UolLUeaaW/view

# bamazonCustomer
This is an Amazon-like storefront using the MySQL database. The app will take in orders from customers and deplete stock from the store's inventory. 

 The Database squema has the following columns:

item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)


A node application called bamazonCustomer.js is used to invoke this app. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
The app then prompt users with two messages.

1) Ask the user to select the ID of the product they would like to buy.
2) The second message asks how many units of the product they would like to buy.

Once the customer has placed the order, the appliacton  check if the store has enough of the product to meet the customer's request.

If not, the app will communicate to the following message:Insufficient quantity!, and then prevent the order from going through.

However, if the store does have enough of the product, it fulfills the customer's order and calculates the total price to be paid buy the customer.

The database is updated to reflect all the remaining inventory.