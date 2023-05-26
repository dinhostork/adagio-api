import request from "supertest";
import { Server } from "../../../src/app/server";
import sequelizeConnection from "../../../src/config/database";
import User from "../../../src/app/models/User.model";

describe("Autenticação de usuário", () => {
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

  it("deve retornar 200 com os dados do usuário e o token JWT", async () => {
    const userData = {
      name: "John Doe",
      email: "john@email.com",
      password: "password123",
    };
    await User.create(userData);

    const response = await request(app).post("/v1/auth").send({
        email: userData.email,
        password: userData.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("token");
  });


  it("deve retornar 401 quando o usuário não for encontrado", async () => {
    const response = await request(app).post("/v1/auth").send({
      email: "user@noExists.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });
});
