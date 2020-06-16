import React, { Component } from 'react'


export default class JobList extends Component {
    render() {
        return (
                <div className="row">
                    <a class="list-group-item col-10">
                    <div class="bmd-list-group-col">
                        <p class="list-group-item-heading">{this.props.job.title}</p>
                        <p class="list-group-item-text">Company: {this.props.job.company}</p>
                        <p class="list-group-item-text">Type: {this.props.job.type}</p>
                        <p class="list-group-item-text">Location: {this.props.job.location}</p>
                    </div>
                    </a>
                    <a className="jobInfo mt-3" href={this.props.job.url} target="_blank">Learn More</a>
                </div>
        )
    }
}
