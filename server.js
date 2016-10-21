var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('ecommerce', ['ecommerce']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//Busca dos produtos
app.get('/ecommerce', function (req, res) {
    console.log("I receive a GET request!");

    db.ecommerce.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

//Inserir novo produto
app.post('/ecommerce', function (req, res) 
{
    console.log(req.body);
    db.ecommerce.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

//Excluir produto
app.delete('/ecommerce/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.ecommerce.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    })
});

//Editar produto
app.get('/ecommerce/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.ecommerce.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    })
});

//Alterar produto
app.put('/ecommerce/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.ecommerce.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { 
            $set: {
                nome: req.body.nome,
                descricao: req.body.descricao,
                categoria: req.body.categoria,
                peso: req.body.peso,
                valor: req.body.valor
        }},
        new: true 
    }, function (err, doc) {
        res.json(doc);
    });
});

app.listen(3000);
console.log("Server running in port 3000!");