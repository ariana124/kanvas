import React, { Component } from 'react'
import {TextField} from '@material-ui/core'

class Jobs extends Component {
    constructor() {
        super()
        this.state = {
            search_term: '',
            place: '',
        };
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    clickSubmit = event => {
        // By default when the user clicks the submit button the page refreshes so that's why we're disabling it.
        event.preventDefault()
        const { search_term, place } = this.state;

        // signin(user).then(data => {
        //     if (data.error) {
        //         this.setState({error: data.error, loading: false})
        //     } else {
        //         // Authenticates the user and redirect user to another page.
        //         authenticate(data, () => {
        //             this.setState({redirectToReferer: true})
        //         })
        //     }
        // });

        console.log(`Search Term: `, search_term);
        console.log(`Search Term: `, place);


    };

    render() {
        const {search_term, place} = this.state;

        return (
            <div className="container">
                <form>
                    <h2 className="mt-5 mb-5">Find Jobs</h2>
                    <div className="form-group">
                        <label className="text-muted">Search Term</label>
                        <input onChange={this.handleChange("search_term")} className="form-control" type="text" value={search_term}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Place</label>
                        <input onChange={this.handleChange("place")} className="form-control" type="text" value={place}/>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Search Jobs</button>
                </form>
            </div>
        )
    }
}
export default Jobs
