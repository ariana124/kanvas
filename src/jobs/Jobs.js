import React, { Component } from 'react';
import {getJobs} from './apiJobs';
import JobList from './JobList';


class Jobs extends Component {
    constructor() {
        super()
        this.state = {
            search_term: '',
            place: '',
            jobs: [],
            displayJobs: false
        };
    }

    displayJobs = event => {
        event.preventDefault()
        this.setState({
            // Toggles displayJobs' state to true
            displayJobs: true
        })
        const { search_term, place } = this.state;
        getJobs(search_term, place).then(data => {
                this.setState({jobs: data})
                console.log(`Jobs: `, this.state.jobs)
        }).catch(() => console.log(`Error: retrieving jobs`));
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        let jobs = null;
        const {search_term, place} = this.state;

        if ( this.state.displayJobs ) {
            jobs = (
            <ul class="list-group bmd-list-group-sm">
                {this.state.jobs.map((job, index) => {
                    return <JobList key={index}
                    job={job} />
                })}
            </ul>
            )
        }

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
                    <button onClick={this.displayJobs} className="followBtn">Search Jobs</button>
                </form>
                <div>
                    {jobs}
                </div>
            </div>
        )
    }
}
export default Jobs
