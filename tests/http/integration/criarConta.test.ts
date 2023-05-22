import request from "supertest";
import { Server } from "../../../src/app/server";

describe("Criação de Conta", () => {
  let server: Server;
  let app: Express.Application;

  beforeEach(() => {
    server = new Server();
    app = server.start();
  });

  afterEach(() => {
    server.stop();
  });

  it("deve retornar 200 com os dados do usuário e token JWT ao criar uma conta válida", async () => {
    const response = await request(app).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });

  it("deve retornar 400 ao tentar criar uma conta sem fornecer os campos obrigatórios", async () => {
    const response = await request(app).post("/users").send({});

    expect(response.status).toBe(400);
  });

  it("deve retornar 400 ao tentar criar uma conta com um e-mail já existente", async () => {
    // Primeiro, criamos uma conta com um e-mail
    await request(app).post("/users").send({
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    });

    // Em seguida, tentamos criar outra conta com o mesmo e-mail
    const response = await request(app).post("/users").send({
      name: "John Doe",
      email: "jane.smith@example.com",
      password: "password789",
    });

    expect(response.status).toBe(400);
  });
});
