import React, { useState, useEffect } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Container,
  ListGroup,
  Toast,
  Navbar,
  Button,
  Modal,
} from 'react-bootstrap';

export function App() {
  const [data, setData] = useState([]);
  const [repos, setRepos] = useState([]);
  const [renderedRepos, setRenderedRepos] = useState([]);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastError, setToastError] = useState('');
  const [languages, setLanguages] = useState([]);
  const [showRepoDetails, setShowRepoDetails] = useState(false);
  const [repoDetails, setRepoDetails] = useState({
    latestCommitDate: 't',
    latestCommitAuthor: 't',
    latestCommitMessage: 't',
    readMe: 't',
  });

  useEffect(() => {
    const getData = async () => {
      let _data = await fetch('/repos');
      if (_data.ok) {
        _data = (await _data.json()).sort((a, b) => {
          const date_a = new Date(a.created_at).getTime();
          const date_b = new Date(b.created_at).getTime();
          return date_b - date_a;
        });
        const newRepos = _data.map((repo) => {
          return {
            id: repo.id,
            name: repo.name || 'No name specified',
            description: repo.description || 'No description specified',
            language: repo.language || 'No language specified',
            forkCount: repo.forks_count,
          };
        });
        setData((d) => _data);
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
        openShowErrorToast(_data);
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
    console.log(data);
  };

  const openShowErrorToast = async (error) => {
    setToastError(await error.json());
    setShowErrorToast(true);
  };

  const handleOpenRepoDetails = async (repo_id) => {
    if (showRepoDetails) {
      return;
    }
    // const selectedRepo = data.find((repo) => (repo.id = repo_id));
    setRepoDetails({
      latestCommitDate: 'date',
      latestCommitAuthor: 'author',
      latestCommitMessage: 'message',
      readMe: '<h1>Helloooooo Readme</h1>',
    });
    setShowRepoDetails(true);
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
              <ListGroup.Item
                onClick={() => handleOpenRepoDetails(repo.id)}
                className="Repo-item"
                variant="dark"
                key={idx}
              >
                <h3>Repo Name: {repo.name}</h3>
                <h3>Repo Description: {repo.description}</h3>
                <h3>Repo Language: {repo.language}</h3>
                <h3>Repo Forks Count: {repo.forkCount}</h3>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Container>
      <Modal show={showRepoDetails} onHide={() => setShowRepoDetails(false)}>
        <Modal.Header>
          <Modal.Title>Repo Deatils</Modal.Title>
        </Modal.Header>
        {repoDetails.readMe.length > 0 && (
          <Modal.Body>{repoDetails.readMe}</Modal.Body>
        )}
        <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowRepoDetails(false)}
            >
              Close
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
