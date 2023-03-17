const express = require("express");
const cors = require("cors");
const User = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    const snapshot = await User.get()
    // const id = snapshot.docs.map((doc) => doc.id)
    // console.log(id);
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.send(list)
})
app.post("/create", async (req, res) => {
    const data = req.body;
    // console.log("Data of users ", data)
    await User.add(data);
    res.send({ msg: "User Add" });
})
app.post("/update", async (req, res) => {
    const data = req.body;
    console.log("before delete id", req.body)
    const id = req.body.id;
    delete req.body.id;
    console.log("after delete id", req.body);
    const update = await User.doc(id).update(data);
    res.send({ msg: "User Updated" });
})
app.post("/delete", async (req, res) => {
    const id = req.body.id;
    await User.doc(id).delete();
    res.send({ msg: "User deleted" });
})

app.listen(4000, () => console.log("Up & Running 4000"))

