import sequelize from "../../../src/config/database";
import User from "../../../src/app/models/User.model"

describe("User Model", () => {
  beforeAll(async () => {
    await sequelize.sync(); // Synchronize the model with the database
  });

  afterEach(async () => {
    await User.destroy({ where: {} }); // Delete all users after each test
  });

  afterAll(async () => {
    await sequelize.close(); // Close the database connection
  });

  it("should create a new user", async () => {
    // Arrange
    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    // Act
    const user = await User.create(userData);
    console.log(user)
    // Assert
    expect(user.id).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.password).toBe(userData.password);
  });

  it("should not allow duplicate email addresses", async () => {
    // Arrange
    const userData1 = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const userData2 = {
      name: "Jane Smith",
      email: "john.doe@example.com", // Same email as userData1
      password: "password456",
    };

    // Act & Assert
    await User.create(userData1);
    await expect(User.create(userData2)).rejects.toThrow();
  });
});
