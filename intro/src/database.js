const mongoose = require('mongoose')
const userSchema = require('./models/users.js')

const User = mongoose.model('Student', userSchema, 'students')


async function listAllUsers() {
  return await User.find({})
}

async function findUserById(id){
  return await User.find({id});
}

const uri = "mongodb+srv://pzveb:pzveb@cluster0.r6adq.mongodb.net/JobHunter?retryWrites=true&w=majority";

;(async () => {
  const connector = mongoose.connect(uri, { useUnifiedTopology: true ,useNewUrlParser: true})

  let user = await connector.then(async () => {
      return findUserById({ _id: "607df6b9ed53f737a02af8a0"});
  })


  console.log(user)
  process.exit(0)
})()

