document.getElementById('btnBuscarSelecao').addEventListener('click', async function () {
  try {
    
    const response = await fetch('/meninas');
    const meninas = await response.json();

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Limpa a tabela para sobreescrever

    // Itera sobre os dados obtidos e os adiciona à tabela
    meninas.forEach((menina) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${menina.nome}</td>
        <td>${menina.idade}</td>
        <td>${menina.cidade} - ${menina.estado}</td>
        <td>R$ ${menina.renda}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Erro ao obter meninas:', error);
  }
});