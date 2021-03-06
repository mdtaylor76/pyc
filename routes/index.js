const initViews = require('./views');
//const { pool } = require('../data-sources/connections');
//const pool = require('dbpool');
const pool = require("../dbPool.js").pool;
const bcrypt = require('bcrypt');

function initRoutes(app) {
  initViews(app);

  app.get('/', function (req, res) {
    console.log('app.get: ' + req.session.id);
    res.render('index', { active: 'home' });
  });

  app.post('/', async function (req, res) {
    let action = req.body.action;
    let username = req.body.username;
    let password = req.body.password;
    let result;
    //check if username already exists

    console.log('action: ' + action);
    switch (action) {
      case 'login':
        console.log('User Login');
        result = await checkUsername(username);
        //console.dir(result);
        let hashedPwd = '';

        if (result.length > 0) {
          hashedPwd = result[0].password;
        }

        let passwordMatch = await checkPassword(password, hashedPwd);

        if (passwordMatch) {
          req.session.authenticated = true;
          req.session.username = username;
          req.session.userid = result[0].userid;

          console.log('app.post req.session.id: ' + req.session.id);
          console.log('userid: ' + req.session.userid);
          res.redirect('/welcome');
        }
        else {
          console.log('account error');
          res.render('index', { active: 'home', 'loginError': true });
        }
        break;
      case 'create':

        //check for existing user
        let userExists = await checkUsername(username);

        if (userExists.length > 0) {
          console.log('UserExists(' + username + '): ' + userExists.length);
          res.render('index', { active: 'home', 'loginError': true });
        }
        else {
          let email = req.body.email;
          let first = req.body.firstName;
          let last = req.body.lastName;
          let hashedPass = await hashPassword(password);
          result = await addUsername(username, hashedPass, first, last, email);
          req.session.authenticated = true;
          req.session.username = username;
          res.redirect('/welcome');
        }
        break;
    }//switch


  });

  function checkUsername(username) {
    let sql = 'SELECT * FROM Users WHERE username = ?';
    let sqlParams = [username];

    return new Promise(function (resolve, reject) {
      pool.query(sql, sqlParams, function (err, rows, fields) {
        if (err) throw err;
        resolve(rows);
      }); //query
    }); //promise
  }

  function addUsername(username, password, first, last, email) {
    let sql = 'INSERT INTO Users (username, password, nameFirst, nameLast, userEmail) VALUES (?,?,?,?,?)';
    let sqlParams = [username, password, first, last, email];

    return new Promise(function (resolve, reject) {
      pool.query(sql, sqlParams, function (err, rows, fields) {
        if (err) throw err;
        resolve(rows);
      }); //query
    });
  }
  
  function updateUser(username, password, first, last, email) {
    let sql = 'UPDATE Users set nameFirst = ?, nameLast = ?, userEmail = ? where username = ?';
    let sqlParams = [first, last, email, username];

    return new Promise(function (resolve, reject) {
      pool.query(sql, sqlParams, function (err, rows, fields) {
        if (err) throw err;
        resolve(rows);
      }); //query
    });
  }

  function hashPassword(password) {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(password, 10, function (err, result) {
        console.log('Result: ' + result);
        resolve(result);
      });
    });
  }

  function checkPassword(password, hashedValue) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, hashedValue, function (err, result) {
        resolve(result);
      });
    });
  }

//  app.get('/welcome', isAuthenticated, function (req, res) {
    app.get('/welcome', function (req, res) {
    console.log('/myAccount req.session.id: ' + req.session.id);
    let username = req.session.username;
    let userid = req.session.userid;
    console.log('Username: ' + username);
    res.render('welcome', { active: 'home', 'logged': true, 'username': username, 'userid': userid });
  });

  app.get('/users', isAuthenticated, function (req, res) {
    console.log('/myAccount req.session.id: ' + req.session.id);
    let username = req.session.username;
    let userid = req.session.userid;
    console.log('Username: ' + username);
    res.render('users', { active: 'home', 'logged': true, 'username': username, 'userid': userid });
  });

  app.get('/student', isAuthenticated, function (req, res) {
    console.log('/myAccount req.session.id: ' + req.session.id);
    let username = req.session.username;
    let userid = req.session.userid;
    console.log('Username: ' + username);
    res.render('student', { active: 'home', 'logged': true, 'username': username, 'userid': userid });
  });

//  app.get('/incidents', isAuthenticated, function (req, res) {
    app.get('/incidents', function (req, res) {
    console.log('/myAccount req.session.id: ' + req.session.id);
    let username = req.session.username;
    let userid = req.session.userid;
    console.log('Username: ' + username);
    res.render('incidents', { active: 'home', 'logged': true, 'username': username, 'userid': userid });
  });

  app.post('/incidents', async function (req, res) {
    console.log('/incident post req.session.id: ' + req.session.id);
    let username = req.session.username;
    let userid = req.session.userid;
    //send session values to create incident function

    console.log(req.body);

    createIncident();
    
    res.render('incidents', { active: 'home', 'logged': true, 'username': username, 'userid': userid });
  });
  

  app.get("/api/data", function(req, res){
    let section = req.query.section;
    let sql = `select * from ${section}`;

    console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      //console.log("rows" + rows);
      res.send(rows);
    });
  });//api/location

/*
  app.get("/api/location", function(req, res){
    let id = req.query.id;
    let sql = `select * from location`;

    //console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      //console.log("rows" + rows);
      res.send(rows);
    });
  });//api/location

  app.get("/api/bodypart", function(req, res){
    let id = req.query.id;
    let sql = `select * from bodypart`;

    //console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      //console.log("rows" + rows);
      res.send(rows);
    });
  });//api/bodypart
  
  app.get("/api/behavior", function(req, res){
    let id = req.query.id;
    let sql = `select * from behavior`;

    //console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      //console.log("rows" + rows);
      res.send(rows);
    });
  });//api/behavior

  app.get("/api/recovery", function(req, res){
    let id = req.query.id;
    let sql = `select * from recovery`;

    //console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      //console.log("rows" + rows);
      res.send(rows);
    });
  });//api/recovery

  app.get("/api/student", function(req, res){
    let id = req.query.id;
    let sql = `select * from student`;

    //console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      //console.log("rows" + rows);
      res.send(rows);
    });
  });//api/recovery

  app.get("/api/support", function(req, res){
    let id = req.query.id;
    let sql = `select * from support`;

    console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      //console.log("rows" + rows);
      res.send(rows);
    });
  });//api/recovery

  app.get("/api/supportplan", function(req, res){
    let id = req.query.id;
    let sql = `select * from supportplan`;

    console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      //console.log("rows" + rows);
      res.send(rows);
    });
  });//api/recovery
  
  app.get("/api/nextsteps", function(req, res){
    let id = req.query.id;
    let sql = `select * from nextsteps`;

    console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      //console.log("rows" + rows);
      res.send(rows);
    });
  });//api/recovery
  
  app.get("/api/possibletrigger", function(req, res){
    let id = req.query.id;
    let sql = `select * from possibletrigger`;

    console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      //console.log("rows" + rows);
      res.send(rows);
    });
  });//api/recovery
*/

  function createIncident(username, password, first, last, email) {
    let sql = 'UPDATE Users set nameFirst = ?, nameLast = ?, userEmail = ? where username = ?';
    let sqlParams = [first, last, email, username];

    return new Promise(function (resolve, reject) {
      pool.query(sql, sqlParams, function (err, rows, fields) {
        if (err) throw err;
        resolve(rows);
      }); //query
    });
  }
  
  app.get('/reports', isAuthenticated, function (req, res) {
    console.log('/myAccount req.session.id: ' + req.session.id);
    let username = req.session.username;
    let userid = req.session.userid;
    console.log('Username: ' + username);
    res.render('reports', { active: 'home', 'logged': true, 'username': username, 'userid': userid });
  });

  app.get('/account', isAuthenticated, function (req, res) {
    console.log('/account req.session.id: ' + req.session.id);
    let username = req.session.username;
    let userid = req.session.userid;
    console.log('Username: ' + username);

    res.render('account', { active: 'home', 'logged': true, 'username': username, 'userid': userid });
  });
  
  app.post('/account', async function (req, res) {
    console.log('/account post req.session.id: ' + req.session.id);
    let username = req.session.username;
    let userid = req.session.userid;

    let email = req.body.email;
    let first = req.body.fname;
    let last = req.body.lname;
    let password = req.body.password;

    updateUser(username, password, first, last, email);
    
    res.render('account', { active: 'home', 'logged': true, 'username': username, 'userid': userid });
  });

  app.get('/logout', function (req, res) {
    console.log('req.session.id' + req.session.id);
    req.session.destroy();
    res.redirect('/');
  });

  function isAuthenticated(req, res, next) {
    console.log('isAuthenticated req.session.id: ' + req.session.id);
    if (!req.session.authenticated) {
      console.log('!req.session.authenticated');
      res.redirect('/');
    }
    else {
      console.log('next() req.session.authenticated: ' + req.session.authenticated);
      console.log('user: ' + req.body.username);
      next();
    }
  }
  
  app.get('/history', isAuthenticated, function (req, res) {
    console.log('/history req.session.id: ' + req.session.id);
    let username = req.session.username;
    let userid = req.session.userid;
    console.log('Username: ' + username);
    res.render('history', { active: 'history', 'logged': true, 'username': username, 'userid': userid });
  });
    
  app.get("/api/history", function(req, res){
    let id = req.query.id;
    let sql = `select orderID from Orders where userID = ${id}`;

    console.log("get history: " + id);
    console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      console.log("rows" + rows);
      res.send(rows);
    });
  });//api/history
  
  app.get("/api/customer", function(req, res){
    let id = req.query.id;
    let sql = `select * from Users where userID = ${id}`;

    console.log("get user: " + id);
    console.log(sql);
    
    pool.query(sql, function (err, rows, fields) {
      if (err) throw err;
      console.log("rows" + rows);
      res.send(rows);
    });
  });//api/history
}

module.exports = initRoutes;
