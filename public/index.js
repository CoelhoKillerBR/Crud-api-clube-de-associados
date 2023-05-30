function getAssociados() {
    fetch('http://localhost:3000/associados')
      .then(response => response.json())
      .then(data => {
        const associadosList = document.getElementById('associados-list');
        associadosList.innerHTML = '';

        data.forEach(associado => {
          const listItem = document.createElement('li');
          listItem.textContent = `${associado.nome} - ${associado.email}`;

          // Cria um botão de exclusão
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Excluir';
          deleteButton.addEventListener('click', () => deleteAssociado(associado.cpf));

          listItem.appendChild(deleteButton);
          associadosList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Erro ao obter associados:', error);
      });
  }

  function deleteAssociado(cpf) {
    fetch(`http://localhost:3000/associados/${cpf}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Associado excluído:', data);
        getAssociados();
      })
      .catch(error => {
        console.error('Erro ao excluir associado:', error);
      });
  }

  // Chamada para obter todos os associados quando a página carregar
  window.addEventListener('load', () => {
    getAssociados();
  });


  