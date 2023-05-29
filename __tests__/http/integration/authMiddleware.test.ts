import request from "supertest";
import { Server } from "../../../src/app/server";
import sequelizeConnection from "../../../src/config/database";
import User from "../../../src/app/models/User.model";

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

  it("deve retornar 400 se o authorization não for fornecido", async () => {
    const response = await request(app).get("/v1/users");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("deve retornar 400 se o token for inválido", async () => {
    const token = (await request(app).post("/v1/auth").send(userData)).body
      .token;
    const response = await request(app)
      .get("/v1/users")
      .set("Authorization", `Bearer ${token}123`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("deve retornar 400 se o token for inválido", async () => {
    const response = await request(app)
      .get("/v1/users")
      .set("Authorization", `Bearer `);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("deve permitir o acesso se o token for válido", async () => {
    const token = (await request(app).post("/v1/auth").send(userData)).body
      .token;
    const response = await request(app)
      .get("/v1/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
