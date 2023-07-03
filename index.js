const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { MongoClient } = require("mongodb")
require("dotenv").config()
const ObjectId = require("mongodb").ObjectId

const cors = require("cors")
app.use(express.json()) // Parse request bodies as JSON

const port = process.env.PORT || 5000
// middleware

app.use(cors())

// require("./index.js");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kxy80.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function run() {
  try {
    await client.connect()
    const database = client.db("medico")
    const productCollection = database.collection("medisin")
    const productCollectionMain = database.collection("productMain")
    const categoryProductCollection = database.collection("category")
    const orderCollection = database.collection("order")
    const addUserCollection = database.collection("addUser")
    const imageCollection = database.collection("images")
    const userCollection = database.collection("users")

    //post product

    // Product Post Api
    app.post("/medisin", async (req, res) => {
      const medisin = req.body
      const result = await productCollectionMain.insertOne(medisin)
      res.json(result)
    })
    // Get single product
    app.get("/medisin/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const question = await productCollectionMain.findOne(query)
      res.json(question)
    })
    // Get all Product
    app.get("/medisin", async (req, res) => {
      const cursor = productCollectionMain.find({})
      const user = await cursor.toArray()
      res.send(user)
    })

    // Update Product
    app.put("/medisin", async (req, res) => {
      const product = req.body
      const filter = { _id: ObjectId(product?._id) }
      const options = { upsert: true }
      const updateDoc = { $set: product }
      const result = await productCollectionMain.updateOne(
        filter,
        updateDoc,
        options
      )
      res.json(result)
    })

    //delete product
    app.delete("/medisin/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await productCollectionMain.deleteOne(query)
      res.json(result)
    })
    // users post api
    app.post("/product", async (req, res) => {
      const product = req.body
      const result = await productCollection.insertOne(product)
      res.json(result)
    })
    // get single product
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const question = await productCollection.findOne(query)
      res.json(question)
    })
    // get all product
    app.get("/product", async (req, res) => {
      const cursor = productCollection.find({})
      const user = await cursor.toArray()
      res.send(user)
    })

    // update product
    app.put("/product", async (req, res) => {
      const product = req.body
      const filter = { _id: ObjectId(product?._id) }
      const options = { upsert: true }
      const updateDoc = { $set: product }
      const result = await productCollection.updateOne(
        filter,
        updateDoc,
        options
      )
      res.json(result)
    })

    //delete product

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await productCollection.deleteOne(query)
      res.json(result)
    })

    // upload single image info
    app.post("/image", async (req, res) => {
      const image = req.body
      const result = await imageCollection.insertOne(image)
      res.json(result)
    })
    // get image
    app.get("/image", async (req, res) => {
      const cursor = imageCollection.find({})
      const user = await cursor.toArray()
      res.send(user)
    })

    // category post api
    //  const categoryProductCollection = database.collection("category");
    app.post("/category", async (req, res) => {
      const category = req.body
      const result1 = await categoryProductCollection.insertOne(category)
      res.json(result1)
    })
    // get single category
    app.get("/category/:id", async (req, res) => {
      const id = req.params.id
      const query1 = { _id: ObjectId(id) }
      const question1 = await categoryProductCollection.findOne(query1)
      res.json(question1)
    })
    // get all category
    app.get("/category", async (req, res) => {
      const cursor1 = categoryProductCollection.find({})
      const user1 = await cursor1.toArray()
      res.send(user1)
    })

    // update category
    app.put("/category", async (req, res) => {
      const category = req.body
      const filter = { _id: ObjectId(category?._id) }
      const options = { upsert: true }
      const updateDoc = { $set: category }
      const result = await categoryProductCollection.updateOne(
        filter,
        updateDoc,
        options
      )
      res.json(result)
    })

    //delete product

    app.delete("/category/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await categoryProductCollection.deleteOne(query)
      res.json(result)
    })
    // Add Order API
    app.post("/order", async (req, res) => {
      const orders = req.body // Access the order data from the request body

      // Set the default order status as "pending"
      const ordersWithStatus = orders.map((order) => ({
        ...order,
        status: "pending",
      }))

      // Insert the orders into the orderCollection
      const result = await orderCollection.insertMany(ordersWithStatus)

      // Retrieve the full order dataset including the generated IDs
      const fullOrders = await orderCollection.find().toArray()

      res.json(fullOrders)
    })
    app.get("/orders", async (req, res) => {
      const orders = await orderCollection.find().toArray()
      res.json(orders)
    })

    // Update Order Status
    app.put("/order/:id/status/:status", async (req, res) => {
      const orderId = req.params.id
      const newStatus = req.params.status

      const filter = { _id: ObjectId(orderId) }
      const update = { $set: { status: newStatus } }

      const result = await orderCollection.updateOne(filter, update)

      res.json(result)
    })

    // Get Product Information with Order Status
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const product = await productCollection.findOne(query)

      const orderQuery = { productId: id }
      const orders = await orderCollection.find(orderQuery).toArray()

      const productWithOrders = {
        _id: product._id,
        productName: product.productName,
        quantity: product.quantity,
        price: product.price,
        orders: orders.map((order) => ({
          _id: order._id,
          status: order.status,
        })),
      }

      res.json(productWithOrders)
    })

    // ADD USER TEST.........
    // ADD USER TEST.........
    // ADD USER TEST.........
    // ADD USER TEST.........
    // ADD USER TEST.........
    // category post api
    //    const categoryProductCollection = database.collection("category");
    app.post("/add", async (req, res) => {
      const category = req.body
      const result1 = await addUserCollection.insertOne(category)
      res.json(result1)
    })
    // get single category
    app.get("/add/:id", async (req, res) => {
      const id = req.params.id
      const query1 = { _id: ObjectId(id) }
      const question1 = await addUserCollection.findOne(query1)
      res.json(question1)
    })
    // get all category
    app.get("/add", async (req, res) => {
      const cursor1 = addUserCollection.find({})
      const user1 = await cursor1.toArray()
      res.send(user1)
    })

    // update category
    app.put("/add", async (req, res) => {
      const category = req.body
      const filter = { _id: ObjectId(category?._id) }
      const options = { upsert: true }
      const updateDoc = { $set: category }
      const result = await addUserCollection.updateOne(
        filter,
        updateDoc,
        options
      )
      res.json(result)
    })

    //delete product

    app.delete("/add/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await addUserCollection.deleteOne(query)
      res.json(result)
    })

    // .......................
    // .......................
    // .......................
    // .......................
    // .......................

    app.post("/register", async (req, res) => {
      const { firstName, lastName, email, password } = req.body

      // Create a new user object
      const user = {
        firstName,
        lastName,
        email,
        password, // Store the password in plain text
      }

      try {
        // Save the user object to the database
        await userCollection.insertOne(user)
        res.status(200).json({
          message: "Registration successful",
          user: user,
        })
      } catch (error) {
        res.status(500).json({
          error: error,
        })
      }
    })

    app.post("/login", async (req, res) => {
      const { email, password } = req.body
      const query = { email: email }
      const user = await userCollection.findOne(query)

      if (!user) {
        return res.status(401).json("User not found")
      }

      if (user.password !== password) {
        return res.status(401).json("Invalid login id or password")
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      })

      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id,
        role: user.role,
        token: token,
      }

      res.status(200).json(userData)
    })

    // Retrieve all users API
    app.get("/users", async (req, res) => {
      try {
        const users = await userCollection.find({}).toArray()
        res.status(200).json(users)
      } catch (error) {
        res.status(500).json({ error: "Internal server error" })
      }
    })

    // logout

    app.post("/logout", (req, res) => {
      res.status(200).json("Logged out successfully")
    })

    // set user role
    app.put("/userRole", async (req, res) => {
      const user = req.body
      console.log("user", user)
      const filter = { email: user.email }
      const updateDoc = { $set: { role: user?.role } }
      const result = await userCollection.updateOne(filter, updateDoc)
      res.json(result)
    })
    // get all user
    app.get("/user", async (req, res) => {
      const cursor = userCollection.find({})
      const user = await cursor.toArray()
      res.send(user)
    })
  } finally {
    // await client.close();
  }
}

run().catch(console.dir)
app.get("/", (req, res) => {
  res.send("prime server two is running")
})

app.listen(port, () => {
  console.log("server running at port ", port)
})
