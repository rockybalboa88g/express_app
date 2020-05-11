const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.port || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, () => { }, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
        console.log(err);
    });
    

const connection = mongoose.connection;
connection.once("open", () => 
    console.log("Connection established with MongoDB")
);

const articlesRouter = require('./routes/articles')
app.use('/articles', articlesRouter);

app.listen(port, () => console.log(`Port running on ${port}`));
