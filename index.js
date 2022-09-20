const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;
const app = express();

// midleware
app.use(cors());
app.use(express.json());

// breakway
// pxjYWDx5WSlENpys
const uri =
  "mongodb+srv://breakway:pxjYWDx5WSlENpys@cluster0.jduvjjq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
//
async function run() {
  try {
    await client.connect();
    const collection = client.db("breakway-data").collection("product");

    // app.post("/product", async (req, res) => {
    //   const parts = req.body;
    //   const result = await collection.insertOne(parts);
    //   res.send(result);
    // });

    app.get("/person", async (req, res) => {
      const query = {};
      const result = await collection.find(query).toArray();
      res.send(result);
    });
    app.post("/person", async (req, res) => {
      const person = req.body;

      const result = await collection.insertOne(person);

      res.send(result);
    });

    app.delete("/data/:id", async (req, res) => {
      const id = req.params;
      console.log(id);
      const query = { _id: ObjectId(id) };

      const result = await collection.deleteOne(query);
      res.send(result);
    });
    // app.delete("/data/is", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await collection.deleteOne(query);
    //   res.send(result);
    // });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hiii ki khobor");
});

app.listen(port, () => {
  console.log("listen to port", port);
});
