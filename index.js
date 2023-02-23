const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
// middleware

app.use(cors());
app.use(express.json());
// require("./index.js");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c8lf0v2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("primeDatabase");
    const productCollection = database.collection("products");
    const productCollectionMain = database.collection("productMain");
    const blogProductCollection = database.collection("blogs");
    const addUserCollection = database.collection("addUser");
    const imageCollection = database.collection("images");
    const userCollection = database.collection("users");

    //post product
// user reg....
    app.post("/register", async (req, res) => {
      const user = req.body;

      /* try {
        bcrypt.hash(user.password, saltRounds, async function (err, hash) {
          const newUser = new User({
            email: user.email,
            password: hash,
          });
          const result = await userCollection.insertOne(newUser);
          res.json(result);
        });
      } catch (error) {
        res.status(500).json(error.message);
      } */

      const result = await userCollection.insertOne(user);
      res.json(result);
    });

// Products
// Products
// Products
// Products
  // users post api
  app.post("/products", async (req, res) => {
    const products = req.body;
    const result = await productCollectionMain.insertOne(products);
    res.json(result);
  });
  // get single product
  app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const question = await productCollectionMain.findOne(query);
    res.json(question);
  });
  // get all product
  app.get("/products", async (req, res) => {
    const cursor = productCollectionMain.find({});
    const user = await cursor.toArray();
    res.send(user);
  });

  // update product
  app.put("/products", async (req, res) => {
    const product = req.body;
    const filter = { _id: ObjectId(product?._id) };
    const options = { upsert: true };
    const updateDoc = { $set: product };
    const result = await productCollectionMain.updateOne(
      filter,
      updateDoc,
      options
    );
    res.json(result);
  });

  //delete product

  app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await productCollectionMain.deleteOne(query);
    res.json(result);
  });




    // users post api
    // users post api
    // users post api
    // users post api
    app.post("/product", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.json(result);
    });
    // get single product
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const question = await productCollection.findOne(query);
      res.json(question);
    });
    // get all product
    app.get("/product", async (req, res) => {
      const cursor = productCollection.find({});
      const user = await cursor.toArray();
      res.send(user);
    });

    // update product
    app.put("/product", async (req, res) => {
      const product = req.body;
      const filter = { _id: ObjectId(product?._id) };
      const options = { upsert: true };
      const updateDoc = { $set: product };
      const result = await productCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    //delete product

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.json(result);
    });

    // upload single image info
    app.post("/image", async (req, res) => {
      const image = req.body;
      const result = await imageCollection.insertOne(image);
      res.json(result);
    });
    // get image
    app.get("/image", async (req, res) => {
      const cursor = imageCollection.find({});
      const user = await cursor.toArray();
      res.send(user);
    });

    // Blog api 
    // Blog api 
    // Blog api 
    // Blog api 
    // Blog api 
    // Blog api 


     // Blog post api
    //    const blogProductCollection = database.collection("blogs");
     app.post("/blog", async (req, res) => {
      const blog = req.body;
      const result1 = await blogProductCollection.insertOne(blog);
      res.json(result1);
    });
    // get single blog
    app.get("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query1 = { _id: ObjectId(id) };
      const question1 = await blogProductCollection.findOne(query1);
      res.json(question1);
    });
    // get all blog
    app.get("/blog", async (req, res) => {
      const cursor1 = blogProductCollection.find({});
      const user1 = await cursor1.toArray();
      res.send(user1);
    });

    // update blog
    app.put("/blog", async (req, res) => {
      const blog = req.body;
      const filter = { _id: ObjectId(blog?._id) };
      const options = { upsert: true };
      const updateDoc = { $set: blog };
      const result = await blogProductCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    //delete product

    app.delete("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await blogProductCollection.deleteOne(query);
      res.json(result);
    });


    // ADD USER TEST.........
    // ADD USER TEST.........
    // ADD USER TEST.........
    // ADD USER TEST.........
    // ADD USER TEST.........
    // Blog post api
    //    const blogProductCollection = database.collection("blogs");
    app.post("/add", async (req, res) => {
      const blog = req.body;
      const result1 = await addUserCollection.insertOne(blog);
      res.json(result1);
    });
    // get single blog
    app.get("/add/:id", async (req, res) => {
      const id = req.params.id;
      const query1 = { _id: ObjectId(id) };
      const question1 = await addUserCollection.findOne(query1);
      res.json(question1);
    });
    // get all blog
    app.get("/add", async (req, res) => {
      const cursor1 = addUserCollection.find({});
      const user1 = await cursor1.toArray();
      res.send(user1);
    });

    // update blog
    app.put("/add", async (req, res) => {
      const blog = req.body;
      const filter = { _id: ObjectId(blog?._id) };
      const options = { upsert: true };
      const updateDoc = { $set: blog };
      const result = await addUserCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    //delete product

    app.delete("/add/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await addUserCollection.deleteOne(query);
      res.json(result);
    });
    
    // .......................
    // .......................
    // .......................
    // .......................
    // .......................
    

    //register
    app.post("/register", async (req, res) => {
      const { firstName, lastName, email, password } = req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const user = new User({
            firstName,
            lastName,
            email,
            password: hash,
          });
          console.log(user);
          const result = userCollection.insertOne(user);
          res.json(result);
        }
      });
    });

    // login
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const query = { email: email };
      const userList = await userCollection.findOne(query);
      const resData = {
        firstName: userList?.firstName,
        lastName: userList?.lastName,
        email: userList?.email,
        id: userList?._id,
        role: userList?.role,
      };
      bcrypt.compare(password, userList.password, function (err, result) {
        if (result === true) {
          const token = jwt.sign(
            {
              email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "2h",
            }
          );
          res.status(200).json({ ...resData, token });
        } else {
          res.status(401).json("Invalid login id or password");
        }
      });
    });

    // logout

    app.post("/logout", (req, res) => {
      res.status(200).json("Logged out successfully");
    });

    // set user role
    app.put("/userRole", async (req, res) => {
      const user = req.body;
      console.log("user", user);
      const filter = { email: user.email };
      const updateDoc = { $set: { role: user?.role } };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.json(result);
    });
    // get all user
    app.get("/user", async (req, res) => {
      const cursor = userCollection.find({});
      const user = await cursor.toArray();
      res.send(user);
    });








    


  } finally {
    // await client.close();
  }
}


run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("prime server two is running");
});

app.listen(port, () => {
  console.log("server running at port ", port);
});
