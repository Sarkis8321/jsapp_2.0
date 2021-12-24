var express = require('express');
var router = express.Router();

let data_users = [];

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

db.each('SELECT * FROM users', function(err, row) {
  data_users.push(row); 
});
 
db.close();

function addUser(r){
  db = new sqlite3.Database('data.db');
  db.run('INSERT INTO users(name, age) VALUES(?, ?)',[r.name,r.age],(err)=>{
    console.log('errorer!!');
  })
  db.close();
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Пользователи', users: data_users });
});

/* добавление пользователя */
router.get('/addusers', function(req, res, next) {
  res.render('add-users');
});
router.post('/adduserspost', function(req, res, next) {
  
  addUser(req.body);

  res.render('add-users');
});

router.get('/nodes', function(req, res, next) {
  res.render('nodes', { title: 'Записи' });
});

module.exports = router;
