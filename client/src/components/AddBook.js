import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { getAuthorsQuery } from '../queries/queries'; 

class AddBook extends Component {
    displayAuthors(){
        var data = this.props.data;

        if(data.loading){
            return(<option>Loading authors</option>)
        }else{
            // console.log(data.authors);

            return data.authors.map(author => {
                return(<option value={author.id} key={author.id}>{author.name}</option>)
            });
        }

    }
    render(){
        // console.log(this.props);

        return(
            <form id="add-book">

                <div className="field">
                    <label>Book name:</label>
                    <input type="text"></input>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text"></input>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option>Select autor</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>
        )
    }
}

export default graphql(getAuthorsQuery)(AddBook);
