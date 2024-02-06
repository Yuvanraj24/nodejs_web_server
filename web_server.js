const express = require('express');
const app = express ()
const path = require('path')
const cors = require('cors')
const {logger} = require('./middleware/logEvents')
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

app.get('^/$|index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html')); 
})

app.get('/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html')); 
})

app.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,'new-page.html'); 
})

app.get('/hello(.html)?',(req,res,next)=> {
    console.log('hello.html page is loading...')
    next()
}, (req, res)=> {
    res.send('This is Yuvanraj')
})


const one = (req,res,next) => {
    console.log('one')
    next()
}
const two = (req,res,next) => {
    console.log('two')
    next()
}

const three = (req,res,next) => {
    console.log('three')
    res.send('Finished..!')
}

app.get('/chain(.html)?',[one,two,three])


app.get('/*',(req,res)=> {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.listen(PORT,()=>{
    console.log(`The Server is running on port --> ${PORT}`);
})