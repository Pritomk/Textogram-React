const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const {MONGOURI} = require('./config/keys');
const cors = require('cors');


app.use(cors())

//Connect server with mongodb database
mongoose.connect(MONGOURI);

mongoose.connection.on('connected', ()=> {
    console.log("Database has been connected");
})

mongoose.connection.on('error', (err)=> {
    console.log(`Error with ${err}`);
})

require('./models/User');
require('./models/Post');


app.use(express.json())


const customMiddleware = (req, res, next) => {
    console.log("This is the middleware");
    next();
}

//Use middleware into entire server
// app.use(customMiddleware);
const requirelogin = require('./middleware/requirelogin');
app.get('/protected',requirelogin,(req, res) => {
    res.send("Hello world");
});

if (process.env.NODE_ENV=="production") {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    })
}


app.use('/auth',require('./routes/auth'));
app.use('/post',require('./routes/post'));
app.use('/user',require('./routes/user'));

app.listen(PORT,() => {
    console.log(`Server is running on Port http://localhost:${PORT}`);
});