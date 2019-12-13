const http = require('http')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser');


var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

const hostname = '127.0.0.1'
const port = process.env.PORT || 3000;

let json = fs.readFileSync('page.json', 'utf8');
let page = JSON.parse(json);

app.get('/', function (req, res) {
    res.render('main', {array: page});
});

app.get('/page/:id', function (req, res) {
    let id = parseInt(req.params.id);
    res.render('page', {page: page.page[id]});
});
app.get('/newpost', function(req, res){
    res.render(__dirname + "/views/newpost.ejs");
})

app.post('/newpost', urlencodedParser, function(req, res){
    let newpage =
    {
        "title" : req.body.title,
        "text" : req.body.text,
        "id" : req.body.id,
    };
    addpage(newpage);
    res.render(__dirname + "/views/newpost.ejs");
})
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

function addpage(newpage) {
    page.page.push(newpage);
    fs.writeFileSync('page.json', JSON.stringify(page));
}