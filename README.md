# Recipe Web App

## Demo

https://github.com/user-attachments/assets/1d957d3e-746b-452d-b027-922abfd02e38

## Prerequisites  
To run this project, ensure you have:  
- [Node.js](https://nodejs.org)  
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community)  
- [MongoDB Compass](https://www.mongodb.com/products/compass)  

---

## Setup Instructions  

### 1. Clone the Repository  
Open a terminal and run:  

```sh
git clone https://github.com/C22380473/webdevproject  
cd webdevprojectfolder
```

### 2. Install Dependencies
Run the following command to install the required Node.js packages:

```sh
npm install express express-session mongodb mongoose nodemon bcrypt
```

### 3. Start MongoDB Server
Windows: Open the Services app, find MongoDB, and click Start.

macOS/Linux: Open a terminal and run:
```sh
brew services start mongodb-community
```
If you installed MongoDB manually, start it with:
```sh
mongod --dbpath /path/to/your/data
```

### 4. Create the Database and Collections
Using MongoDB Compass:

1. Open MongoDB Compass and connect to your MongoDB instance.
2. Create a new database named recipeApp.
3. Inside recipeApp, create two collections: recipes and users.

Using MongoDB Shell:
```sh
use recipeApp
db.createCollection("recipes")
db.createCollection("users")
```

### 5. Restore the Database from JSON Files
Using MongoDB Compass:
1. Open MongoDB Compass.
2. Import the recipeApp.recipes.json file into the recipes collection.
3. Import the recipeApp.users.json file into the users collection.

Using MongoDB Shell:
```sh
mongoimport --db recipeApp --collection recipes --file recipeApp.recipes.json --jsonArray
mongoimport --db recipeApp --collection users --file recipeApp.users.json --jsonArray
```

### 6. Run Project
Navigate to the controller folder and start the server:
```sh
cd controller
nodemon server.js
```

### 7. Access the Website
Once the server is running, open your browser and visit:
http://localhost:8080

---
## Notes
- Ensure MongoDB is running before starting the application.
- The recipeApp database must contain both recipes and users collections with the appropriate data imported.
- If you face any issues, double-check your MongoDB setup and imported data.
- See the [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/administration/install-community/) for troubleshooting.









