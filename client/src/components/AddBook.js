import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import React, { Component } from 'react';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'; 

class AddBook extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            genre: '',
            authorId: '',
        };
    }

    displayAuthors(){
        var data = this.props.getAuthorsQuery;

        if(data.loading){
            return(<option>Loading authors</option>)
        }else{
            // console.log(data.authors)

            return data.authors.map(author => {
                return(<option value={author.id} key={author.id}>{author.name}</option>)
            });
        }

    }

    submitForm(e){
        e.preventDefault();
        // console.log(this.state);

        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId,
            }, refetchQueries: [{query: getBooksQuery}]
        });
    }

    render(){
        // console.log(this.props);

        return(
            <form id="add-book" onSubmit={ this.submitForm.bind(this) }>

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={ (e) => this.setState({
                        name: e.target.value
                    }) }>

                    </input>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ (e) => this.setState({
                        genre: e.target.value
                    }) }></input>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select  onChange={ (e) => this.setState({
                        authorId: e.target.value
                    }) }>
                        <option>Select autor</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"}),
)(AddBook);
