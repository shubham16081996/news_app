import './App.css';
import { useState } from 'react';
import Navbar from "./components/Navbar"
import NewsIndex from "./components/NewsIndex"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar';

function App() {

  const [progress, setprogress] = useState(0)
  const pageSize = 40                             // limiting articles on one page
  const apiKey = process.env.REACT_APP_API_KEY   // Accessing the ApiKey which is hidden.
  let country = 'in'

  return (
    <>
    <div>
    <Router>
      <Navbar/>
      
      {/* React Top Loading Bar */}

      <LoadingBar height={4} color='red' progress={progress} />
      <Switch>

      {/* Sending Props to NewsIndex Component */}

        <Route exact path="/">
        <NewsIndex setprogress={setprogress} apiKey={apiKey} key="business" pageSize={pageSize} country={country}     category="Business"/>
        </Route>

        <Route exact path="/business">
        <NewsIndex setprogress={setprogress} apiKey={apiKey} key="business" pageSize={pageSize} country={country}     category="Business"/>
        </Route>

        <Route exact path="/entertainment">
        <NewsIndex setprogress={setprogress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country}     category="Entertainment" />
        </Route>

        <Route exact path="/sports">
        <NewsIndex setprogress={setprogress} apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="Sports" />
        </Route>

        <Route exact path="/technology">
        <NewsIndex setprogress={setprogress} apiKey={apiKey} key="technology" pageSize={pageSize} country={country}     category="Technology" />
        </Route>

      </Switch>
    </Router>
    </div>
    </>
  );
}

export default App;
