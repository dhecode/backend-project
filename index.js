const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')//callback api not promise based

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    fs.readdir(`./files`, function(err,files){
          res.render('index',{files:files}); //folder read ke baad reposnece render ho rha hai
    });
});

// app.post('/create', function(req, res){
//     console.log(req.body);
// });
  
  
app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
      res.redirect("/")
    });
});// for example aapka hai some issues with node ayega ['some','issue','of','node'] 

app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){//converting in english utf-8 otherwise codes
        //  console.log(filedata);
         res.render('show',{filename: req.params.filename,filedata:filedata });
    });
});


app.get('/edit/:filename',function(req,res){
    res.render('edit',{filename:req.params.filename});
});// for example aapka hai some issues with node ayega ['some','issue','of','node'] 

app.post('/edit', function(req, res){
  fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err) {
    res.redirect("/");
  });
});

app.listen(3000);

// video 8 readmore of text


// video 9 edit wla
// create a new encodeURIComponent.ejs
// taking form from indexedDB.ejs


