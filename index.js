const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal');
const path = require('path')

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const admin = require('./admin');

const port = 4000;

// Used to serve static files from public directory

app.use(express.static('public/build'));
app.use(cors());


// Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


//CRUD


// create user account
app.post('/account/create/:name/:email/:password', function(req, res){
  dal.createUser(req.params.name, req.params.email, req.params.password)
    .then(user => {
      res.send(user);
    });
});

// Get

// All accounts
app.get('/account/all', (req, res) => {
  try {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
      .then(function() {
        dal.allUsers()
          .then(docs => {
            res.send(docs);
          });
      }).catch(function(error){
        console.log('error: ', error)
        res.send('Authentication Fail!')
      })
  } catch (e) {
    res.send('Token error: ' + e.message )
  }
});

app.get('/account/:email', (req, res) => {
  try {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
      .then(function() {
        let email = req.params.email
        dal.searchUser(email)
          .then(docs => {
            res.send(docs);
          });
      }).catch(function(error){
        console.log('error: ', error)
        res.send('Authentication Fail!')
      })

  } catch (e) {
    res.send('Token error: ' + e.message )
  }
})

app.get('/movements/:email', (req, res) => {
  try {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
      .then(function() {
        let email = req.params.email
        dal.getMove(email)
          .then(docs => {
            res.send(docs);
          });
      }).catch(function(error){
        console.log('error: ', error)
        res.send('Authentication Fail!')
      })
  } catch (e) {
    res.send('Token error: ' + e.message )
  }
})

// Update
app.put('/account/update/:email/:balance/:type', (req, res) => {
  try {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
      .then(function() {
        let { email, balance, type } = req.params
        dal.balanceUser(email, balance, type)
          .then(docs => {
            res.send(docs);
          });
      }).catch(function(error){
        console.log('error: ', error)
        res.send('Authentication Fail!')
      })
  } catch (e) {
    res.send('Token error: ' + e.message )
  }
})

//Delete
app.delete('/account/delete/:email', (req, res) => {
  try {
      const idToken = req.headers.authorization;
  admin.auth().verifyIdToken(idToken)
    .then(function() {
      let email = req.params.email
      dal.deleteUser(email)
        .then(docs => {
          res.send(docs);
        });
    }).catch(function(error){
      console.log('error: ', error)
      res.send('Authentication Fail!')
    })

  } catch (e) {
    res.send('Token error: ' + e.message )
  }
})


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/build/index.html'));
})

app.listen(port, () => {
  console.log('Running on port' + port);
})
