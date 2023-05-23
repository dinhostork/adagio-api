import User from "../../../src/app/models/User.model";
import sequelizeConnection from "../../../src/config/database";

describe("User Model", () => {
  beforeAll(async () => {
    await sequelizeConnection.sync(); 
  });

  afterEach(async () => {
    await User.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelizeConnection.close(); 
  });

  it("should create a new user", async () => {

    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const user = await User.create(userData);

    expect(user.id).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  it("should not allow duplicate email addresses", async () => {

    const userData1 = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const userData2 = {
      name: "Jane Smith",
      email: "john.doe@example.com", 
      password: "password456",
    };


    await User.create(userData1);
    await expect(User.create(userData2)).rejects.toThrow();
  });
});
