import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import upload from './multerRoute';
import path from 'path';


const prisma = new PrismaClient();
const app = express();

// Definindo rota para GET /users
app.get('/users', async (req: Request, res: Response) => {
  // Buscando todos os usuários no banco de dados do Prisma
  const users = await prisma.user.findMany();
  // Retornando a lista de usuários como resposta em formato JSON
  res.json(users);
});

// Define a rota GET que retorna o formulário de upload
app.post("/", (req, res) => {
  res.sendFile(path.join(__dirname,"./src/index.html"));
});

// Define a rota POST que recebe o arquivo enviado pelo formulário
app.post("/upload", upload.single("music"), (req, res) => {
  // Aqui você pode processar o arquivo enviado pelo usuário, como salvar no banco de dados
  // e retornar uma resposta ao usuário informando que o arquivo foi recebido com sucesso
  res.send("Arquivo recebido com sucesso!");
});




