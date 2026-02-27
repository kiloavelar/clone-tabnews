import database from "infra/database";

beforeAll(cleanDatabase);
async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

test("GET /api/v1/migrations retorna status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  // Verifica se o status da resposta é 200
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  // Verifica se o corpo da resposta é um array
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
