import request from "supertest";
import { Server } from "../../../src/app/server";
import sequelizeConnection from "../../../src/config/database";
import User from "../../../src/app/models/User.model";
import bcrypt from "bcrypt";

describe("Criação de Conta", () => {
  let server: Server;
  let app: Express.Application;

  beforeAll(async () => {
    await sequelizeConnection.sync();
  });

  beforeEach(async () => {
    server = new Server();
    app = server.start();
  });

  afterEach(async () => {
    User.destroy({ where: {} });
    await server.stop();
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
    await request(app).post("/v1/users").send({
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    });

    const response = await request(app).post("/v1/users").send({
      name: "John Doe",
      email: "jane.smith@example.com",
      password: "password789",
    });

    expect(response.status).toBe(400);
  });

  it("deve retornar 400 ao tentar criar uma conta com um e-mail inválido", async () => {
    const response = await request(app).post("/v1/users").send({
      name: "John Doe",
      email: "john.doe",
      password: "password123",
    });

    expect(response.status).toBe(400);
  });

  it("deve armazenar a senha do usuário de forma criptografada", async () => {
    const password = "password123";
    const response = await request(app).post("/v1/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");

    const user = await User.findOne({
      where: { email: "john.doe@example.com" },
    });
    expect(user).toBeTruthy();
    expect(await bcrypt.compare(password, user!.password)).toBe(true);
  });

  it("deve retornar 500 caso ocorra algum erro na criação do usuário", async () => {
    jest.spyOn(User, "create").mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await request(app).post("/v1/users").send({
      name: "John Doe",
      email: 'valid@email.com',
      password: "password123",
    });

    expect(response.status).toBe(500);
  });
});
