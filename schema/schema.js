const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// example books array
var books = [
    {name: 'Book 1', genre: 'Action', id: '1'},
    {name: 'Book 2', genre: 'Sci-Fi', id: '2'},
    {name: 'Book 3', genre: 'Action', id: '3'},
];

const BookType = new GraphQLObjectType({
    name: 'Book', 
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                // code to get data from db / other source
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});