import React, { Component } from 'react'
import {getJobs} from './apiJobs'

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

        console.log(`Search Term: `, search_term);
        console.log(`Search Term: `, place);

        getJobs(search_term, place).then(data => {
                console.log(`Jobs: `, data)
        }).catch(() => console.log(`Error: retrieving jobs`));
    };

    render() {
        const {search_term, place} = this.state;

        return (
            <div className="container">
                <form>
                    <h2 className="mt-5 mb-5">Find Jobs</h2>
                    <div className="form-group">
                        <label className="text-muted">Search Term</label>
                        <input onChange={this.handleChange("search_term")} className="form-control" type="text" value={search_term} placeholder="JavaScript"/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Place</label>
                        <input onChange={this.handleChange("place")} className="form-control" type="text" value={place} placeholder="San Francisco"/>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Search Jobs</button>
                </form>
            </div>
        )
    }
}
export default Jobs
