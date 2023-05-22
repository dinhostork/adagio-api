import request from "supertest";
import { Server } from "../../../src/app/server";
import sequelizeConnection from "../../../src/config/database";
import User from "../../../src/app/models/User.model";

describe("Criação de Conta", () => {
  let server: Server;
  let app: Express.Application;

  beforeAll(async () => {
    await sequelizeConnection.sync(); // Sincronizar o modelo com o banco de dados
  });
  
  beforeEach(async() => {
    server = new Server();
    app = server.start();
  });

  afterEach(async () => {
    User.destroy({ where: {} }); // Deletar todos os usuários antes de cada teste
    await server.stop(); // Encerrar o servidor Express de forma assíncrona
  });


  it("deve retornar 200 com os dados do usuário", async () => {
    const response = await request(app).post("/v1/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
  });

  it("deve retornar 400 ao tentar criar uma conta sem fornecer os campos obrigatórios", async () => {
    const response = await request(app).post("/v1/users").send({});

    expect(response.status).toBe(400);
  });

  it("deve retornar 400 ao tentar criar uma conta com um e-mail já existente", async () => {
    // Primeiro, criamos uma conta com um e-mail
    await request(app).post("/v1/users").send({
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    });

    // Em seguida, tentamos criar outra conta com o mesmo e-mail
    const response = await request(app).post("/v1/users").send({
      name: "John Doe",
      email: "jane.smith@example.com",
      password: "password789",
    });

    expect(response.status).toBe(400);
  });
});
