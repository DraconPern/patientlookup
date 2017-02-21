var express = require('express');
var router = express.Router();
var models = require('../sequelize/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var sql = 'SELECT IDA, Last_Name, First_Name FROM Ident JOIN Patient ON Patient.Pat_id1 = Ident.Pat_id1 WHERE';
  var replacements = [];
  if(req.body.lastname) {
    sql += ' Patient.Last_Name LIKE ?';
    replacements.push('%' + req.body.lastname + '%');
  }

  if(req.body.firstname) {
    sql += ' Patient.First_Name LIKE ?';
    replacements.push('%' + req.body.firstname + '%');
  }

  if(replacements.length === 0) {
    res.render('index', { title: 'Express' });
  }

  models.sequelize.query(sql,
    { replacements:replacements, type: models.sequelize.QueryTypes.SELECT })
  .then(function(results) {
    res.render('index', { title: 'Express', results, lastname: req.body.lastname, firstname:req.body.firstname });
  }).catch(function (err) {
    res.render('error', {error: err} );
  });
});

module.exports = router;
