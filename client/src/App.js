import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import './index.css';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>Reading list</h1>
      <BookList/>
      <AddBook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
