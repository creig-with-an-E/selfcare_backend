const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');
const professionalRoutes = require('./api/routes/professionals');

/*This is where we connect to the mLab database, using this connection string*/
mongoose.connect('mongodb://johndoe:mcqxLUR6xzPe45e@ds247690.mlab.com:47690/selfcaredb',
    { useNewUrlParser: true }
    );

/*to use the default node.js promise implementation, instead of the mongoose version.
This will also remove the deprecation warning.*/
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/users', userRoutes);  //users route
app.use('/professionals', professionalRoutes);  //professional route
app.use('/graphql', graphqlHttp({
    // points to a valid graphql schema
    schema: buildSchema(`
    type RootQuery{
        events: [String!]!
    }
    
    type RootMutation{
        crateEvent(name: String): String
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    
    }
    
    `),
    rootValue: {
        events: () => {
            return ['cooking', 'eating', 'coding'];
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },// points to a js object that has all the resolver functions in it. Resolver functions need to match schema endpoints by name.
graphiql: true



}));






module.exports = app;


