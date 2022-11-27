const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Services = require('./services');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const service = new Services();

//apis
app.post("/user", async (req, res) => {
  const userData = req.body;
  try {
    const result = await service.addUser(userData);
    res.send({
      status: true,
      data: result
    });
  } catch (err) {
    res.send({
      status: false,
      msg: err 
    });
  }
});

app.put("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const result = await service.updateUser(userId, userData);
    res.send({
      status: true,
      data: result
    });  
  } catch (err) {
    res.send({
      status: false,
      msg: err 
    });
  }
});

app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await service.deleteUser(userId);
    res.send({
      status: true,
      data: result
    });
  } catch (err) {
    res.send({
      status: false,
      msg: err 
    });
  }
});
 

app.get("/users", async (req, res) => {
  try {
    const result = await service.getUserList();
    res.send({
      status: true,
      data: result
    });
  } catch (err) {
    res.send({
      status: false,
      msg: err 
    });
  }
});

app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await service.getUserDetail(userId);
    res.send({
      status: true,
      data: result
    });
  } catch (err) {
    res.send({
      status: false,
      msg: err 
    });
  }
});


app.post("/user/picture", async (req, res) => {
  try {
    await service.imageUpload(req, res);
  } catch (err) {
    res.send({
      status: false,
      msg: err 
    });
  }
})

app.all("/", (req, res) => {
  res.send("Invalid request");
})

app.listen(port, () => {console.log(`Server started on ${port}`);});
mongoose.connect(
  "mongodb://127.0.0.1", 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);