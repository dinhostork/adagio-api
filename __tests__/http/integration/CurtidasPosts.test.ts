import request from "supertest";
import { Server } from "../../../src/app/server";
import sequelizeConnection from "../../../src/config/database";
import User from "../../../src/app/models/User.model";
import Post from "../../../src/app/models/Post.model";
import { PRIVACY_PUBLIC } from "../../../src/constants/privacies";

const makePost = async () => {
  const userdata = {
    name: "John Doe",
    email: "email@email.com",
    password: "12345678",
  };

  const postdata = {
    text: "content",
    privacy_id: PRIVACY_PUBLIC.id,
  };
  const user = await User.create(userdata);
  const post = await Post.create({
    ...postdata,
    owner_id: user.id,
  });

  return post;
};
describe("Curtidas em Posts", () => {
  let server: Server;
  let app: Express.Application;
  let token: string;
  let post: Post;

  beforeAll(async () => {
    await sequelizeConnection.sync();
    server = new Server();
    app = server.start();
  });

  beforeEach(async () => {
    post = await makePost();
    const response = await request(app).post("/v1/auth").send({
      email: "email@email.com",
      password: "12345678",
    });
    token = response.body.token;
  });

  afterEach(async () => {
    User.destroy({ where: {} });
    Post.destroy({ where: {} });
    server.stop();
  });

  it("deve retornar 201 com os dados da curtida", async () => {
    const response = await request(app)
      .post(`/v1/likes/${post.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  it("deve descadastrar a curtida do usuário e retornar 204", async () => {
    await request(app)
      .post(`/v1/likes/${post.id}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post(`/v1/likes/${post.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it("deve retornar 404 quando o post não existir", async () => {
    const response = await request(app)
      .post(`/v1/likes/999`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
