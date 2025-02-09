const express = require('express');
const app = express ()
const path = require('path')
const cors = require('cors')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 2426;

app.use(logger)


//Cross Orgin Resource Sharing
const whitelist = ['http://localhost:2426']
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
 }

app.use(cors(corsOptions))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'./public')))

app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees'))

app.all('*', (req,res) => { 
    res.status(404);
    if(req.accepts ('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    } else if(req.accepted('json')){
        res.json({"error": "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
})

app.use(errorHandler)

app.listen(PORT, ()=> console.log(`The Server is running on port --> ${PORT}`))