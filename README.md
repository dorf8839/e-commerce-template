# A template for a basic E-Commerce Site

To get started, simply clone repo into your directory and run the below
commands from the root directory to start the back-end and front-end servers

`npm i` to download and install the needed dependencies

`./node_modules/.bin/json-server-auth ./backend/db.json --port 3001` to 
start the backend server

`npm start` to start the react server

This site uses a fake back-end to simulate a user and product database.  The admin
and user logins are provided in the db.json file, with the password encrypted using bcryptjs.  It is actually "password" for your testing purposes.

When logging in as an admin, an extra feature is availabe to add products to your
backend file.  Both users are allowed to add items to the cart and view your cart.  While viewing the cart, you can clear the cart, remove individual items, or checkout entirely.  When checking out, the billing portion is skipped for simplicity but the fake backend is updated appropriately.
