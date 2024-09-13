// src/components/JobDetail.js
import React, { useContext, useEffect, useState } from 'react';
import { Oval } from "react-loader-spinner";
import { useParams } from 'react-router-dom';
import { JobsContext } from '../jobContext';

const JobDetail = () => {
    const { id } = useParams();
    const { jobs } = useContext(JobsContext);
    const [job, setJob] = useState(null);

    useEffect(() => {
        const jobDetail = jobs.find(job => job.id === parseInt(id));
        setJob(jobDetail);
    }, [id, jobs]);

    if (!job) {
        return  (
            <div className="loader-container" testid="loader">
                <Oval type="TailSpin" color="#0284C7" height={50} width={50} />
            </div>
            );
    }

    return (
        <div className="job-detail">
            <h1>{job.title}</h1>
            <p><strong>Company:</strong> {job.companyName}</p>
            <p><strong>Location:</strong> {job.jobLocation}</p>
            <p><strong>Salary Range:</strong> {job.salaryRange}</p>
            <p><strong>WhatsApp:</strong> {job.whatsApp}</p>
            <p><strong>Created On:</strong> {job.createdOn}</p>
            <p><strong>Expires On:</strong> {job.expireOn}</p>
            <p><strong>Premium Until:</strong> {job.premiumTill}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Qualification:</strong> {job.qualification}</p>
            <p><strong>Job Location:</strong> {job.jobLocation}</p>
        </div>
    );
};

export default JobDetail;
