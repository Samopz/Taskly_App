import request from "supertest";
import bcrypt from "bcrypt";
import app from "../../app";

describe("Express App", () => {
  it("should respond with 200 status code for /test route", async () => {
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Test route");
  });

  it("should apply rate limiting", async () => {
    for (let i = 0; i < 3; i++) {
      await request(app).get("/test");
    }
    const response = await request(app).get("/test");
    expect(response.status).toBe(429); // Too Many Requests
  });

  // Add more tests as needed
});
