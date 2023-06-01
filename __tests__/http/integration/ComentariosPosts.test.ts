import Post from "../../../src/app/models/Post.model";
import User from "../../../src/app/models/User.model";
import { PRIVACY_PUBLIC } from "../../../src/constants/privacies";
import { Server, request, sequelizeConnection } from "../setup";
const userdata = {
  name: "John Doe",
  email: "email@email.com",
  password: "12345678",
};

const makePost = async () => {
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

describe("Comentários de posts", () => {
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

  it("deve retornar 200 com os dados do comentário", async () => {
    const response = await request(app)
      .post(`/v1/comments/${post.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        text: "comment",
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("text");
  });

});
