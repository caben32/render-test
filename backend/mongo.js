const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3] ? process.argv[3] : 'Did not provide'
const number = process.argv[4] ? process.argv[4] : 'Did not provide'

const url =
  `mongodb+srv://cabenano:${password}@cluster0.yahlnec.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phoneBookSchema)

if (process.argv.length==3){
    Person.find({}).then(result => {
        result.forEach(note => {
          console.log(note)
        })
        mongoose.connection.close()
      })
}
else{
    const person = new Person({
        name: name,
        number: number,
    })
    
    person.save().then(result => {
      console.log('Person saved!')
      mongoose.connection.close()
    })
}
