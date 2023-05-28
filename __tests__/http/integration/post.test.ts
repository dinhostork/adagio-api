import request from "supertest";
import { Server } from "../../../src/app/server";
import sequelizeConnection from "../../../src/config/database";
import User from "../../../src/app/models/User.model";
import Post from "../../../src/app/models/Post.model";

describe("Publicações", () => {
  let server: Server;
  let app: Express.Application;
  const userData = {
    name: "John Doe",
    email: "email@d.com",
    password: "1234",
  };
  let user: User;
  let token: string;

  beforeAll(async () => {
    await sequelizeConnection.sync();
    server = new Server();
    app = server.start();
    user = await User.create(userData);
    const response = await request(app).post("/v1/auth").send({
      email: userData.email,
      password: userData.password,
    });
    token = response.body.token;
  });

  afterAll(async () => {
    await Post.destroy({ where: {} });
    await User.destroy({ where: {} });
    await server.stop();
  });

  it("deve retornar 200 se a publicação for criada com sucesso", async () => {
    const response = await request(app)
      .post("/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        text: "content",
        privacy_id: 1,
      });
    expect(response.status).toBe(200);
  });
  
});
