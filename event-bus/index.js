const express = require('express'); 
const bodyParser = require('body-parser');

const axios = require('axios');
const app = express();
const events = []; 

app.use(bodyParser.json());
app.post('/events', (req,res) => {
    const event = req.body; 

    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event);
    // axios.post('http://localhost:4001/events', event);
    // axios.post('http://localhost:4002/events', event);
    // axios.post('http://localhost:4003/events', event);

    res.send({status:'OK'});
})

app.get('/events', (req,res)=> {
    res.send(events);
})


app.listen(process.env.PORT || 4005 , (req,res) => {
    console.log("Listening pn 40005");
})