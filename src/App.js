import { Component } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Bookmarks from './components/BookMarks';
import Header from './components/Header';
import JobDetails from './components/JobDetails';
import Jobs from './components/jobs';
import NotFound from './components/NotFound';
import JobsProvider from './jobContext';

class App extends Component {

  render() {
    return (
      <JobsProvider>
        <BrowserRouter>
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Jobs />} />
              <Route path="/bookmarks" element={<Bookmarks/>} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </JobsProvider>
    );
  }
}

export default App;
