var express = require('express');
var users = express.Router();
const cors = require('cors');
var jwt = require('jsonwebtoken');
var token;
const database = require('./Database/database');

users.use(cors());

















/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
