// const express = require("express");
import express from 'express'

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import multer from 'multer';
import cors from 'cors';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import User from "./config";
const app = express();
app.use(express.json());
app.use(cors());

const firebaseConfig = {
    apiKey: "AIzaSyDch7TTmQ7fRKIhTXUX2zYzAWCMGz1g1Lc",
    authDomain: "fir-nodejs-d8f3d.firebaseapp.com",
    projectId: "fir-nodejs-d8f3d",
    storageBucket: "fir-nodejs-d8f3d.appspot.com",
    messagingSenderId: "254828854280",
    appId: "1:254828854280:web:17bea23794b7160f3965bd",
    measurementId: "G-600L022170"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore();
const db = firebaseApp.firestore();
const User = db.collection("Users")

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

app.post("/uploadImg", upload.single("filename"), async (req, res) => {
    try {
        console.log('voo')
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `file/${req.file.originalname + "     " + dateTime}`);
        // create metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        }
        // upload the file in the bucket storage 
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        //Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('file successfully uploaded.');
        return res.send({
            message: "file uploaded to firebase storage",
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        console.log("loi");
        console.log(error);
    }
})
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDay();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime
}

app.get("/", async (req, res) => {
    const snapshot = await User.get()
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

