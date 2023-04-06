import { PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance } from "Fastify";
import { request } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";

// Rota para criar um novo usuário
export async function main(app: FastifyInstance) {
  app.post("/users", async (request, reply) => {
    const newUser = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });
    const { password, email, name } = newUser.parse(request.body);
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  });

  // Rota para obter um usuário específico
  app.get("/users", async (request, reply) => {
    const users = await prisma.user.findMany();
    return users;
  });

  //Rota para atualizar um usuário em especifico.
  app.patch("/users/:id", async (request, reply) => {
    const userId = z.object({
      id: z.string().uuid(),
    });
    const userData = z.object({
      name:z.string(),
      email:z.string(),
      password:z.string(),
    })
    const {id} = userId.parse(request.params);
    const { name, password, email} = userData.parse(request.body);
    
    
     await prisma.user.update({
      where:{
        id: id.toString(),
        
      },
     data:{
      name:name,
      email:email,
      password:password,
    },
    });
  });

  // Rota para excluir um usuário em especifico.
  app.delete("/users/:id", async (request, reply) => {
    const userId = z.object({
      id: z.string().uuid(),
    });
    const { id } = userId.parse(request.params);

    const user = await prisma.user.delete({
      where: {
        id: id.toString(),
      },
    });
    return user;
  });




}

 

