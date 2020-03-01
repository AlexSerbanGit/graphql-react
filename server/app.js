const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect mlab database
mongoose.connect('mongodb+srv://dbuser:dbpassword@cluster0-txhuo.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
    schema: schema, // or just schema bcs of es6
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});