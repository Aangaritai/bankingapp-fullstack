const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bankadmin:btEWJtV6xBrJVYd@cluster0.gaut0zc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var db = null;

async function main() {
  // Use connect method to connect to the server
  db = client.db('bankingapp')
  await client.connect();
  console.log('Connected successfully to server');

  return 'Connected.';
}

// Users
function allUsers() {
  return new Promise((resolve, reject) => {
    const users = db
      .collection('users')
      .find({})
      .toArray(function(err, docs) {
        err ? reject(err) : resolve(docs);
      })
    return users;
  });
}

function searchUser( email ) {
  return new Promise((resolve, reject) => {
    const user = db
      .collection('users')
      .find({ email })
      .toArray(function(err, docs) {
        err ? reject(err) : resolve(docs);
      })
    return user;

  })
}

function createUser( name, email, password ) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    searchUser(email).then(user => {
      if ( !user.length > 0 ) {
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, function(err) {
          err ? reject(err) : resolve(doc);
        });
      } else {
        resolve({message:"User already exists"});
      }
    })
  })
}

function balanceUser( email, balance, type) {
  return new Promise((resolve, reject) => {
    balance = Number(balance)
    const transaction = db.collection('movements');
    const doc = { email, balance, type };
    const resTransaction = transaction.insertOne(doc, {w:1}, function(err) {
      err ? reject(err) : resolve(doc);
    });
    const user = db
      .collection('users')
      .updateOne({ email },
        { $set: { balance } },
        function(err, docs) {
          err ? reject(err) : resolve(docs);
        }
      )
    const result = { resTransaction, user }
    return result;
  })
}

function deleteUser(email) {
  return new Promise((resolve, reject) => {
    const delUser = db
      .collection('users')
      .deleteOne({email})
    delUser
      .then(() => {
        deleteMove(email)
          .then( () => resolve({ message: "User Deleted" }) )
          .catch(e => reject(e))
      })
      .catch(e => {
        reject(e)
      })
  })
}

function deleteMove(email) {
  return new Promise((resolve, reject) => {
    const delTransaction = db
      .collection('movements')
      .deleteOne({email})
    delTransaction
      .then(() => {
        resolve()
      })
      .catch(e => {
        reject(e)
      })
  })
}

function getMove( email ) {
  return new Promise((resolve, reject) => {
    const transactions = db
      .collection('movements')
      .find({ email })
      .toArray(function(err, docs) {
        err ? reject(err) : resolve(docs);
      })
    return transactions;

  })
}

main()
  .then(console.log())
  .catch(console.error())


module.exports = {
  createUser,
  allUsers,
  searchUser,
  deleteUser,
  balanceUser,
  getMove
}
