import Prisma from "../src/db";
import { server } from "../src/server";

// describe("server test", () => {
//   it("should assert 1 + 1 is 2", () => {
//     expect(1 + 1).toEqual(2);
//   });
// });

describe("Tests creating a card /create/", () => {
  it("should return the created entry card", async () => {
    const res = await server.inject({
      method: "POST",
      url: "/create/",
      payload: {
        description: "Test description",
        created_at: "2024-11-18T00:00:00.000Z",
        scheduled: "2024-11-18T00:00:00.000Z",
        title: "Test title",
      },
    });
    expect(res.statusCode).toEqual(200);
    expect(res.json().description).toEqual("Test description");
    expect(res.json().title).toEqual("Test title");
    expect(res.json().created_at).toEqual("2024-11-18T00:00:00.000Z");
    expect(res.json().id).toBeDefined();
  });
});

describe("Tests the /get/ route and /update/ route", () => {
  it("should get a card and update it and check it has updated", async () => {
    const get_res = await server.inject({
      method: "GET",
      url: "/get/",
    });
    expect(get_res.statusCode).toEqual(200);
    expect(get_res.json().length).toBeGreaterThan(0);

    const card_id = get_res.json()[0].id;
    const update_res = await server.inject({
      method: "PUT",
      url: `/update/${card_id}`,
      payload: {
        description: "Updated description",
        created_at: "2024-11-19T00:00:00.000Z",
        scheduled: "2024-11-19T00:00:00.000Z",
        title: "Updated title",
      },
    });
    expect(update_res.statusCode).toEqual(200);

    const get_res_after_update = await server.inject({
      method: "GET",
      url: `/get/${card_id}`,
    });
    expect(get_res_after_update.statusCode).toEqual(200);
    expect(get_res_after_update.json().description).toEqual("Updated description");
    expect(get_res_after_update.json().title).toEqual("Updated title");
    expect(get_res_after_update.json().created_at).toEqual("2024-11-19T00:00:00.000Z");
    expect(get_res_after_update.json().id).toEqual(card_id);
  });
});

describe("Tests the /get/ route and /delete/ route", () => {
  it("should get a card and delete it and check it is deleted", async () => {
    const get_res = await server.inject({
      method: "GET",
      url: "/get/",
    });
    expect(get_res.statusCode).toEqual(200);
    expect(get_res.json().length).toBeGreaterThan(0);

    const card_id = get_res.json()[0].id;
    const delete_res = await server.inject({
      method: "DELETE",
      url: `/delete/${card_id}`,
    });
    expect(delete_res.statusCode).toEqual(200);

    const get_res_after_delete = await server.inject({
      method: "GET",
      url: `/get/${card_id}`,
    });
    expect(get_res_after_delete.statusCode).toEqual(500);
  });
});

describe("Tests getting and updating a non-existent card", () => {
  it("should return 500 for a non-existent card", async () => {
    const get_res = await server.inject({
      method: "GET",
      url: "/get/123456789",
    });
    expect(get_res.statusCode).toEqual(500);

    const update_res = await server.inject({
      method: "PUT",
      url: "/update/123456789",
      payload: {
        description: "Updated description",
        created_at: "2024-11-19T00:00:00.000Z",
        scheduled: "2024-11-19T00:00:00.000Z",
        title: "Updated title",
      },
    });
    expect(update_res.statusCode).toEqual(500);
  });
});