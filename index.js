const fs = require('fs');
const path = require('path');
const express = require('express');
//./ is because it's not a library, but a file in the directory
const config = require('./config');
const PORT = config.PORT;
const MONGODB_URI = config.MONGODB_URI;

const mongoose = require('mongoose');

//connect to the database that's living in the cloud
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log("MongoDb connected"))
.catch( err => console.log(err));


const db = require('./models/todo');

//create your app by calling the express function
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//set up somethingorother at static directory


//set the path to your public directory
const publicURL = path.resolve(`${__dirname}/public`);
//define the folder which will host your static files
//this will check in this directory if an index.html exists and if no 
//other file is called out it will serve up your index.html file
app.use(express.static(publicURL))

//your file directory needs to have the dot at the front to make it work
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get("/api/v1/todos", async (req, res) => {
    //all async functions need to have a try and a catch
    try {
        //this 
        const data = await db.find();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});

app.post("/api/v1/todos", async (req, res) => {
    //all async functions need to have a try and a catch
    try {
        const newData = {
            "todo": req.body.todo,
            "status": req.body.status
        }
        const data = await db.create(newData);
        console.log(newData);
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});


app.put("/api/v1/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const updatedData = {
            todo: req.body.todo,
            status: req.body.status
        }
        const changedData = await db.findOneAndUpdate({_id:id}, updatedData, {new: true});

        res.json(changedData);

    } catch (error) {
        res.json(error);
    }
});

app.delete("/api/v1/todos/:id", async (req, res) => {
    //all async functions need to have a try and a catch
    try {
        const id = req.params.id;
        //console.log(id);
        const deletedData = await db.findByIdAndDelete(id);
        res.json({message:"delete!", deletedDocument: deletedData});
    } catch (error) {
        res.json(error);
    }
});

//listen at the defined port
app.listen(PORT, () => {
    console.log(`see the magic at http://localhost:${PORT}`)
});