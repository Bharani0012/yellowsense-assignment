import React, { Component } from 'react';
import { Oval } from "react-loader-spinner";
import { JobsContext } from '../jobContext';
import JobCard from './jobcard';
class Jobs extends Component {
    static contextType=JobsContext;
    render() {
        const { jobs, loading } = this.context;
        return (
            <div className='jobs-container'>
                <h1 className='section-head'>Jobs List</h1>
                <ul className='jobs-list'>
                    {jobs.map((job) => (
                        <li key={job.id}>
                            <JobCard job={job}/>
                        </li>
                    ))}
                </ul>
                {loading && (
                <div className="loader-container" testid="loader">
                    <Oval type="TailSpin" color="#0284C7" height={50} width={50} />
                </div>
                )}
            </div>
        );
    }
}

export default Jobs;
