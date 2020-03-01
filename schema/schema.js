const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
} = graphql;

// example books array
var books = [
    {name: 'Book 1', genre: 'Action', id: '1'},
    {name: 'Book 2', genre: 'Sci-Fi', id: '2'},
    {name: 'Book 3', genre: 'Action', id: '3'},
];

var authors = [
    {name: 'Alex Serban', age: 18, id: '1'},
    {name: 'Author 2', age: 21, id: '2'},
    {name: 'Author 3', age: 56, id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book', 
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author', 
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db / other source
                console.log(typeof(args.id));

                return _.find(books, {id: args.id});
            }
        }, 
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                // code to get data from db / other source such as the array above :) 
                
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});