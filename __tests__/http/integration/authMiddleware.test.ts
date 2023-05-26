import request from "supertest";
import { Server } from "../../../src/app/server";
import sequelizeConnection from "../../../src/config/database";
import User from "../../../src/app/models/User.model";

// # Backend: Middleware de Autenticação

// O backend do sistema deve reconhecer os usuários através do token

// ## Casos de Sucesso
// - Recebe uma requisição para uma rota protegida com o **token no cabeçalho**
// - Valida se o campo token está presente na requisição e é válido
// - exporta o id na requisição
// - prossegue com a requisição

// ## Exceções
// - retorna erro **400** se o campo **token**, não for fornecido no cabeçalho ou não for válido
// - retorna erro **401** caso o token tenha expirado

describe("Middleware de Autenticação", () => {
  let server: Server;
  let app: Express.Application;

  let user: User;
  const userData = { name: "John Doe", email: "j@d.com", password: "123456" };

  beforeAll(async () => {
    await sequelizeConnection.sync();
    server = new Server();
    app = server.start();

    user = await User.create(userData);
  });

  afterAll(async () => {
    User.destroy({ where: {} });
    await server.stop();
  });

  it("deve retornar 400 se o token não for fornecido", async () => {
    const response = await request(app).get("/v1/users");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("deve retornar 400 se o token for inválido", async () => {
    const token = (await request(app).post("/v1/auth").send(userData)).body.token;
    const response = await request(app).get("/v1/users").set("Authorization", `Bearer ${token}123`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

});
