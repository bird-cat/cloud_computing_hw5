// server.js
console.log('May Node be with you')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient

let helmet = require('helmet')
app.use(helmet())

MongoClient.connect('mongodb+srv://r09922114:jn251208@cluster0.yqr1b.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true }).then(client => {

    console.log('Connected to Database')
    
    // change the database
    const db = client.db('star-wars-quotes')
    
    // creat a collection in db
    const quotesCollection = db.collection('quotes')
    
    // use ejs as the template engine
    app.set('view engine', 'ejs')
    
    // Use middleware: body-parser
    app.use(bodyParser.urlencoded({ extended: true }))
    
    // Use middleware: express.static
    app.use(express.static('public'))
    
    // Enable server to read the JSON
    app.use(bodyParser.json())
    
    // get request (search)
    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
          .then(results => {
              res.render('index.ejs', {quotes: results})
          })
          .catch(error => console.error(error))
    })

    // post request (insert)
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
              res.redirect('/')
          })
          .catch(error => console.error(error))
    })
    
    // put request (update)
    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            {name: req.body.name},
            {
                $set:{
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            {
                upsert: true
            }
        )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })
    
    // delete request (delete)
    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            {name: req.body.name}
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json(`Deleted quote`)
        })
        .catch(error => console.error(error))
    })
    
    // Create a server
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})
.catch(console.error)

