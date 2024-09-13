import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { JobsContext } from '../jobContext';
const JobCard = ({ job }) => {
    const {
        id,
        title,
        jobLocation,
        salaryRange,
        whatsApp
    } = job;
    const {handleAddBookmark, handleRemoveBookmark}=useContext(JobsContext);
    const location=useLocation();
    const pathName=location.pathname
    return (
        <div className="job-card">
            <div className="job-card-header">
                <p><strong>Job Title:</strong> {title}</p>
            </div>
            <div className="job-card-body">
                <p><strong>Location:</strong> {jobLocation}</p>
                <p><strong>Salary Range:</strong>{salaryRange==="-"? " Not Mentioned": salaryRange}</p>
                <p><strong>Mobile:</strong> {whatsApp}</p>
                <Link to={`/jobs/${id}`}><button className='details-button button'>View Details</button></Link>
                <button
                    onClick={() => pathName === "/bookmarks" ? handleRemoveBookmark(job) : handleAddBookmark(job)} 
                    className={`${pathName === "/bookmarks" ? 'remove-button' : 'add-button'} button`}
                >
                    {pathName === "/bookmarks" ? 'Remove From Bookmark' : 'Add to Bookmark'}
                </button>
            </div>
        </div>
    );
};

export default JobCard;
