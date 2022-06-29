import React, { useState, useEffect } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, ListGroup } from 'react-bootstrap';

export function App() {
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data = await (await fetch('/repos')).json();
    const newRepos = data.map((repo) => {
      return {
        name: repo.name || 'No name specified',
        description: repo.description || 'No description specified',
        language: repo.language || 'No language specified',
        forkCount: repo.forks_count,
      };
    });
    setRepos(newRepos);
  };

  return (
    <div className="App">
      <h1 className="mb-4, App-header">Silverorange Coding Exercise</h1>
      <Container>
        <ListGroup>
          {repos.map((repo, idx) => {
            return (
              <ListGroup.Item className="Repo-item" variant="dark" key={idx}>
                <h3>Repo Name: {repo.name}</h3>
                <h3>Repo Description: {repo.description}</h3>
                <h3>Repo Language: {repo.language}</h3>
                <h3>Repo Forks Count: {repo.forkCount}</h3>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Container>
    </div>
  );
}
