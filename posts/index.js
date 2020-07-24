const express = require('express'); 
const app = express(); 
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); 
const posts = {};

app.use(cors())
app.use(bodyParser.json());
app.get('/posts', (req,res) => {
    res.send(posts);
})


app.post('/posts', async (req,res)=> {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body; 
    posts[id] = {
        id, 
        title, 
    }

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated', 
        data: {
            id, 
            title,
        }

    })
    res.status(201).send(posts[id]);
})



app.post('/events', (req,res) =>{
    console.log('received events', req.body.type);
    res.send({});
})




app.listen(process.env.PORT || 4000, (req,res) => {
    console.log('hello world');
    console.log('server is running');
})