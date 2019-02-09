const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log_message = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log',log_message+'\n',(err)=>{
        if(err){
            console.log('error in appending file');
        }
    });
    if(req.url === '/about'){
        res.send('<h1>ABOUT PAGE NEEDS AUTHENTICATION</h1>');
    }else{
        next();
    }
        
})

app.get('/',(req,res) => {
    console.log('home page api triggered');
    //res.send('<h1>hello express</h1>');
    res.send({
        name:'Subramanyam',
        age: 22
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle : 'About Page',
        currentYear : new Date().getFullYear()
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage : 'something went wrong',
    });
});

app.listen(3000, ()=>{
    console.log('The server is up at port 3000');
});