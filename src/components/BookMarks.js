import { useContext, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { JobsContext } from "../jobContext";
import JobCard from "./jobcard";

const Bookmarks = () => {
    const { bookmarks, loading } = useContext(JobsContext);

    useEffect(() => {
        // console.log(bookmarks);
    }, [bookmarks]);

    if (!bookmarks || bookmarks.length === 0) {
        return <div className="no-bookmarks-view">No jobs bookmarked yet</div>;
    }

    return (
        <div>
            <h1 className="section-head">Bookmarks List</h1>
            <ul className="jobs-list">
                {bookmarks.map((job) => (
                    <li key={job.id}>
                        <JobCard job={job} />
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

export default Bookmarks;
