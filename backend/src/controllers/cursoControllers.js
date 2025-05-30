import {
    listarCursos,
    criarCurso,
    atualizarCurso,
    deletarCurso
  } from '../models/tabelaCursos.js';
                                                 
  export async function getCursos(req, res) {
    try {
      const cursos = await listarCursos();
      res.status(200).json(cursos);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao buscar cursos.', erro });
    }
  }
  
  export async function postCurso(req, res) {
    const { nome, carga_horaria } = req.body;
  
    if (!nome || !carga_horaria) {
      return res.status(400).json({ mensagem: 'Nome e carga horária são obrigatórios.' });
    }
  
    try {
      await criarCurso({ nome, carga_horaria });
      res.status(201).json({ mensagem: 'Curso criado com sucesso!' });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao criar curso.', erro });
    }
  }
  
  export async function putCurso(req, res) {
    const { id } = req.params;
    const { nome, carga_horaria } = req.body;
  
    if (!nome || !carga_horaria) {
      return res.status(400).json({ mensagem: 'Nome e carga horária são obrigatórios.' });
    }
  
    try {
      await atualizarCurso(id, { nome, carga_horaria });
      res.status(200).json({ mensagem: 'Curso atualizado com sucesso!' });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao atualizar curso.', erro });
    }
  }
  
  export async function deleteCurso(req, res) {
    const { id } = req.params;
  
    try {
      await deletarCurso(id);
      res.status(200).json({ mensagem: 'Curso deletado com sucesso!' });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao deletar curso.', erro });
    }
  }
  