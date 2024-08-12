import bcrypt from "bcrypt";
import request from "supertest";
import app from "../../app";


describe("E2E tests", () => {
    beforeAll(async () => {
        // Create a user
        const password = await bcrypt.hash("password", 10);
        await app.locals.db.collection("users").insertOne({
            email: "sam@gmail.com",
            password: password,
            name: "Test User",
            orgs: [],
        });
    })
    test("GET /api/v1/user", async () => {
        const response = await request(app)
            .get("/api/v1/user")
            .set("Authorization", "Bearer")
                .expect(200);
        expect(response.body).toEqual({
            email: "sam@gmail.com",
            password: "password",
            name: "Test User",
            orgs: [],
        });
    });
    test("GET /api/v1/orgs", async () => {
        const response = await request(app)
            .get("/api/v1/orgs")
            .set("Authorization", "Bearer")
                .expect(200);
        expect(response.body).toEqual([]);
    });
    afterAll(async () => {
        // Delete the user
        await app.locals.db.collection("users").deleteOne({
            email: "sam@gmail.com",
            password: "password",
            name: "Test User",
            orgs: [],
        });
    });

});



