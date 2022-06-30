import React, { useState, useEffect } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, ListGroup, Toast, Navbar, Button } from 'react-bootstrap';

export function App() {
  const [repos, setRepos] = useState([]);
  const [renderedRepos, setRenderedRepos] = useState([]);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastError, setToastError] = useState('');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let data = await fetch('/repos');
      if (data.ok) {
        data = (await data.json()).sort((a, b) => {
          const date_a = new Date(a.created_at).getTime();
          const date_b = new Date(b.created_at).getTime();
          return date_b - date_a;
        });
        const newRepos = data.map((repo) => {
          return {
            name: repo.name || 'No name specified',
            description: repo.description || 'No description specified',
            language: repo.language || 'No language specified',
            forkCount: repo.forks_count,
          };
        });
        setRepos(newRepos);
        setRenderedRepos(newRepos);
        //Collect all of the languages
        const _languages = [];
        newRepos.forEach((repo) => {
          if (repo.language && !_languages.includes(repo.language)) {
            _languages.push(repo.language);
          }
        });
        setLanguages((l) => _languages);
      } else {
        openShowErrorToast(data);
      }
    };
    getData();
  }, []);

  const filterByLanguage = (lang) => {
    setRenderedRepos(repos);
    if (lang !== 'remove') {
      const filteredRepos = repos.filter((repo) => repo.language === lang);
      setRenderedRepos(filteredRepos);
    }
  };

  const openShowErrorToast = async (error) => {
    setToastError(await error.json());
    setShowErrorToast(true);
  };

  return (
    <div className="App">
      <h1 className="mb-4, App-header">Silverorange Coding Exercise</h1>
      <Navbar
        style={{
          backgroundColor: '#0f74ac',
          width: '100%',
          borderRadius: '.5rem',
        }}
      >
        <Container>
          <Navbar.Brand href="#home">Filter by language:</Navbar.Brand>
          {languages.map((lang, idx) => {
            return (
              <Button onClick={() => filterByLanguage(lang)} key={idx}>
                {lang}
              </Button>
            );
          })}
          <Button onClick={() => filterByLanguage('remove')}>
            Remove Filter
          </Button>
        </Container>
      </Navbar>
      <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)}>
        <Toast.Header>
          <strong className="me-auto">{toastError.status}</strong>
        </Toast.Header>
        <Toast.Body>{toastError.message}</Toast.Body>
      </Toast>
      <Container>
        <ListGroup>
          {renderedRepos.map((repo, idx) => {
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
