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
      console.log(repo.forks_count);
      const repoName = repo.name || 'No name specified';
      const repoDescription = repo.description || 'No description specified';
      const repoLanguage = repo.language || 'No language specified';
      const repoForksCount = repo.forks_count || 0;
      return {
        name: repoName,
        description: repoDescription,
        language: repoLanguage,
        forkCount: repoForksCount.toString(),
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
                <h3>Repo Forks Count: {repo.forks_count}</h3>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Container>
    </div>
  );
}
