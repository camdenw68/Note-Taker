const express = require('express')
const path = require('path')
const fs = require('fs')

const uniqid = require('uniqid'); 

// console.log(uniqid()); // -> 4n5pxq24kpiob12og9
// console.log(uniqid(), uniqid()); // -> 4n5pxq24kriob12ogd, 4n5pxq24ksiob12ogl

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        console.log(data)
        const notes = JSON.parse(data)
        console.log(notes)
        res.json(notes)
    })
})

app.post('/api/notes', (req, res) => {
    console.log(req.body)
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const notes = JSON.parse(data)
        console.log(notes)
        let note = {
            id:uniqid(), 
            ...req.body
        }
        notes.push(note)
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {res.json(notes)})
    })
})

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, '/public/index.html'))})
app.get('/notes',(req, res) => {res.sendFile(path.join(__dirname, '/public/notes.html'))})
app.get('*', (req, res) => {res.sendFile(path.join(__dirname, '/public/index.html'))})

app.listen(PORT, () => {console.log('app is listening on port 3001')})

