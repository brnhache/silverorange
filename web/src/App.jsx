import React, { useState, useEffect } from 'react';

import './App.css';

export function App() {
  const [repos, setRepos ] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async() => {
    const data = await (await fetch('/repos')).json();
    const newRepos = data.map((repo) => {return {
      name: repo.name,
      description: repo.description,
      language: repo.language,
      forkCount: repo.forks_count
    }})
    setRepos(newRepos);
    console.log(newRepos)
  }
  return (
    <div className="App">
      
    </div>
  );
}
