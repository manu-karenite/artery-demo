const mongoose = require("mongoose");
const goNodeMongo = require("go-node-mongo");

require("dotenv").config();
let uri = process.env.MONGO_SRV;
uri = uri.replace("<password>", process.env.MONGO_PASSWORD);
const app = goNodeMongo(uri, mongoose);

//ROUTING FUNCTIONS
const customerRouter = require("./Route/route.js");
app.use("/api/v1", customerRouter);
app.listen(process.env.PORT, () => {
  console.log("Process is Running on Port", process.env.PORT);
});
