import React, { Component, createContext } from 'react';

export const JobsContext = createContext();

class JobsProvider extends Component {
    state = {
        jobs: [],
        bookmarks: [],
        page: 1,
        hasMore: true,
        loading: false,
        error:""
    };

    componentDidMount() {
        this.fetchJobs();
        window.addEventListener("scroll", this.debounceHandleScroll);
    
        const storedBookmarks = JSON.parse(localStorage.getItem('jobBookmarks')) || [];
        this.setState({ bookmarks: storedBookmarks });
    }
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.debounceHandleScroll);
        clearTimeout(this.scrollTimeout);
    }

    formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    fetchJobs = async () => {
        const { page, hasMore, loading } = this.state;
        if (loading || !hasMore) return;
        this.setState({ loading: true });
        try {
            const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            const data = json.results || [];
            const formatData = data.map((eachData, index) => {
                if (index !== 4) {
                    return {
                        id: eachData.id,
                        companyName: eachData.company_name,
                        createdOn: this.formatDate(eachData.created_on),
                        expireOn: this.formatDate(eachData.expire_on),
                        isPremium: eachData.is_premium,
                        title: eachData.title,
                        premiumTill: this.formatDate(eachData.premium_till),
                        jobLocation: eachData.job_location_slug,
                        salaryRange: eachData.primary_details.Salary,
                        experience: eachData.primary_details.Experience,
                        qualification: eachData.primary_details.Qualification,
                        whatsApp: eachData.whatsapp_no,
                    };
                }
                return null;
            }).filter(item => item !== null);
            if (formatData.length === 0) {
                this.setState({ hasMore: false });
            }
            this.setState(prevState => ({
                jobs: [...prevState.jobs, ...formatData],
                page: prevState.page + 1,
                loading: false,
            }));
        } catch (error) {
            console.error("Error While fetching ", error);
            this.setState({ loading: false, error:error });
        }
    };

    handleScroll = () => {
        const { loading, hasMore } = this.state;
    
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
    
        if (scrollTop + clientHeight >= scrollHeight - 100 && !loading && hasMore) {
            this.fetchJobs();
        }
    }
    
    debounceHandleScroll = () => {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(this.handleScroll, 200);
    }

    handleAddBookmark = (job) => {
        try {
            const storedJobsString = localStorage.getItem("jobBookmarks");
            const storedJobs = storedJobsString ? JSON.parse(storedJobsString) : [];
            const isAlreadyBookmarked = storedJobs.some(bookmarkedJob => bookmarkedJob.id === job.id);
            if (isAlreadyBookmarked) {
                alert("Job is already bookmarked.");
                return;
            }
            const updatedJobs = [...storedJobs, job];
            localStorage.setItem("jobBookmarks", JSON.stringify(updatedJobs));
            this.setState({ bookmarks: updatedJobs });
        } catch (error) {
            console.error(error);
        }
    };

    handleRemoveBookmark = (job) => {
        try {
            const storedJobsString = localStorage.getItem("jobBookmarks");
            const storedJobs = storedJobsString ? JSON.parse(storedJobsString) : [];
            const filteredJobs = storedJobs.filter(bookmarkedJob => bookmarkedJob.id !== job.id);
            localStorage.setItem("jobBookmarks", JSON.stringify(filteredJobs));
            this.setState({ bookmarks: filteredJobs });
        } catch (error) {
            console.error(error);
        }
    };

    getBookmarkedJobs = () => {
        try {
            const storedJobsString = localStorage.getItem("jobBookmarks");
            const storedJobs = storedJobsString ? JSON.parse(storedJobsString) : [];
            this.setState({ bookmarks: storedJobs });
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    render() {
        return (
            <JobsContext.Provider
                value={{
                    ...this.state,
                    fetchJobs: this.fetchJobs,
                    handleAddBookmark: this.handleAddBookmark,
                    handleRemoveBookmark: this.handleRemoveBookmark
                }}
            >
                {this.props.children}
            </JobsContext.Provider>
        );
    }
}

export default JobsProvider;
