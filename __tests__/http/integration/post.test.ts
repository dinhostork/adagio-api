import request from "supertest";
import { Server } from "../../../src/app/server";
import sequelizeConnection from "../../../src/config/database";
import User from "../../../src/app/models/User.model";
import Post from "../../../src/app/models/Post.model";
import fs from "fs";

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

  it("deve retornar 400 se a publicação não tiver texto", async () => {
    const response = await request(app)
      .post("/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        privacy_id: 1,
      });
    expect(response.status).toBe(400);
  });

  it("deve retornar 400 se a publicação não tiver privacidade", async () => {
    const response = await request(app)
      .post("/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        text: "content",
      });
    expect(response.status).toBe(400);
  });

  it("deve retornar 400 se a publicação tiver privacidade inválida", async () => {
    const response = await request(app)
      .post("/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        text: "content",
        privacy_id: 4,
      });
    expect(response.status).toBe(400);
  });

  it("deve enviar os arquivos para o servidor externo", async () => {
    const post = await request(app)
      .post("/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        text: "content",
        privacy_id: 1,
        hasMedia: true,
      });

    const filepath = `${__dirname}/fixtures/test.jpg`;
    const fileBuffer = fs.readFileSync(filepath);

    const response = await request(app)
      .post(`/v1/posts/${post.body.id}/files`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "multipart/form-data")
      .attach("file", fileBuffer, "test.jpg");

    expect(response.status).toBe(200);
  });

  it("deve retornar 400 se o arquivo não for uma imagem, audio ou video", async () => {
    const post = await request(app)
      .post("/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        text: "content",
        privacy_id: 1,
      });

    const filepath = `${__dirname}/fixtures/invalidFile.txt`;
    const fileBuffer = fs.readFileSync(filepath);

    const response = await request(app)
      .post(`/v1/posts/${post.body.id}/files`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "multipart/form-data")
      .attach("file", fileBuffer, "invalidFile.txt");

    expect(response.status).toBe(400);
  });
  it("deve retornar 400 caso o usuário que não seja o dono da publicação tente adicionar um arquivo", async () => {
    const userdata2 = {
      name: "John Doe2",
      email: "j2@email.com",
      password: "1234",
    };

    await User.create(userdata2);

    const login = await request(app).post("/v1/auth").send({
      email: userdata2.email,
      password: userdata2.password,
    });

    const token2 = login.body.token;

    const post = await request(app)
      .post("/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        text: "content",
        privacy_id: 1,
      });

    const filepath = `${__dirname}/fixtures/test.jpg`;
    const fileBuffer = fs.readFileSync(filepath);

    const response = await request(app)
      .post(`/v1/posts/${post.body.id}/files`)
      .set("Authorization", `Bearer ${token2}`) // outro usuário
      .set("Content-Type", "multipart/form-data")
      .attach("file", fileBuffer, "test.jpg");

    expect(response.status).toBe(400);
  });    
});
