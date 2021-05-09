const mongoose = require('mongoose')
const User = require('./models/students.js')


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
    return listAllUsers({});
})


  console.log(user)
  process.exit(0)
})()

