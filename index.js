const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true })

const articleSchema = mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model('Article', articleSchema)

//GET API
// app.get('/articles', (req, res) => {
//     Article.find(function (err, foundresult) {
//         if (!err) {
//             res.send(foundresult)
//         } else {
//             res.send(err)
//         }
//     })
// })
// // POST API
// app.post('/articles',(req,res)=>{

// console.log(req.body.title,req.body.content)
// const newArticle = new Article({
//     title:req.body.title,
//     content:req.body.content
// })

// newArticle.save(function(err){
//     if(!err){
//         res.send('Successfully added')
//     }else{
//         res.set(err)
//     }
// })
// })





// app.delete('/articles',(req,res)=>{
//     Article.deleteMany(function(err){
//         if(!err){
//             console.log('Deleted All Succesffuly')
//         }else{
//             console.log(err);
//         }
//     })
// })

//////////////////////////////////////////////////REQUESTS FOR ALL ARTICLES ////////////////////////////////////////////////////////////////////////////////
// APIS
app.route('/articles')

    // Get API
    .get((req, res) => {
        Article.find(function (err, foundresult) {
            if (!err) {
                res.send(foundresult)
            } else {
                res.send(err)
            }
        })
    }
    )
    // Post API

    .post((req, res) => {

        console.log(req.body.title, req.body.content)
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })

        newArticle.save(function (err) {
            if (!err) {
                res.send('Successfully added')
            } else {
                res.set(err)
            }
        })
    })

    // DELETE API   
    .delete((req, res) => {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send('Successfully Deleted')
            } else {
                console.log(err);
            }
        })
    })




//////////////////////////////////////////////////REQUESTS FOR A SINGLE ARTICLES ////////////////////////////////////////////////////////////////////////////////

app.route('/articles/:articleTitle')

    .get((req, res) => {
        console.log(req.params.articleTitle)
        Article.findOne({ title: req.params.articleTitle }, function (err, foundArticle) {
            if (!err) {
                if (!foundArticle) {
                    res.send('No Articles found')
                } else {
                    res.send(foundArticle)
                }
            } else {
                res.send(err)
            }
        })
    })


    .put((req, res) => {
        Article.update(
            {
                title: req.params.articleTitle
            },
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                overwrite: true
            },
            function (err) {
                if (!err) {
                    res.send('Updated Successfully')
                }
            }

        )
    })

    .patch((req, res) => {
        Article.update(
            {
                title: req.params.articleTitle
            },
            {
                $set: req.body
            },
            function (err) {
                if (!err) {

                    res.send('Succesfully updated')
                } else {
                    res.send(err)
                }
            }
        )
    })
    .delete((req, res) => {
        Article.deleteOne(
            { title: req.params.articleTitle },
            function (err) {
                if (!err) {
                    res.send('Successfully Deleted Data')
                } else {
                    res.send(err)
                }
            }
        )
    });

app.listen(3000,
    console.log('Server is running on port 3000'))