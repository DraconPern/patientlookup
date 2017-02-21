var express = require('express');
var router = express.Router();
var models = require('../sequelize/models');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var sql = 'SELECT IDA, Last_Name, First_Name, Birth_DtTm FROM Ident JOIN Patient ON Patient.Pat_id1 = Ident.Pat_id1 WHERE Status_Inactive = 0 AND';
  var replacements = [];
  if(req.body.lastname) {
    sql += ' Patient.Last_Name LIKE ?';
    replacements.push('%' + req.body.lastname + '%');
  }

  if(req.body.firstname) {
    sql += (replacements.length > 0)?' AND': '';
    sql += ' Patient.First_Name LIKE ?';
    replacements.push('%' + req.body.firstname + '%');
  }

  // if no query
  if(replacements.length === 0) {
    res.render('index', { title: 'Express' });
    return;
  }

  models.sequelize.query(sql,
    { replacements:replacements, type: models.sequelize.QueryTypes.SELECT })
  .then(function(results) {

    for (var i = 0;i < results.length; i++) {
      var item = results[i];
      item.birthday = moment(item.Birth_DtTm).format('l');
    }

    res.render('index', { title: 'Express', results, lastname: req.body.lastname, firstname:req.body.firstname });
  }).catch(function (err) {
    res.render('error', {error: err} );
  });
});

module.exports = router;
