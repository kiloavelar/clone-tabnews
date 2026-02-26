test("GET /api/v1/status retorna status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  // Verifica se o status da resposta é 200
  expect(response.status).toBe(200);

  // Verifica se o campo updated_at existe e é uma data válida
  expect(responseBody).toHaveProperty("updated_at");
  const date = new Date(responseBody.updated_at).toISOString();
  const updatedAt = responseBody.updated_at;
  expect(date).toEqual(updatedAt);

  // Verifica o nome da base de dados
  expect(responseBody.dependencies.database.name).toBe("PostgreSQL");

  // Versão da base de dados
  expect(responseBody.dependencies.database.version).toBe("16.0");

  // Conexões máximas
  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  // Conexões ativas
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
});
