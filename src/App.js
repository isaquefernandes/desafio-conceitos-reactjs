import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `New Repository ${Date.now()}`,
      url: "https://github.com/newRepOne/ReactProjector",
      techs: "New, NodeJS, ReactJS, React, AAA",
    };

    const response = await api.post('/repositories', newRepository);

    const addNewRepository = response.data;

    if(response.status === 200 )
      setRepositories([...repositories, addNewRepository]);
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`/repositories/${id}`);

    if(response.status === 204) {
      const newRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
