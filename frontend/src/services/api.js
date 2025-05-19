const BASE_URL = 'https://system-coins-new.onrender.com/api/alunos';

export async function listarAlunos() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function cadastrarAluno(dados) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  return response.json();
}

export async function atualizarAluno(id, dados) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  return response.json();
}

export async function deletarAluno(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
}
