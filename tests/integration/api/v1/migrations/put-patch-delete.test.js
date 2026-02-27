test("PUT PATCH DELETE /api/v1/migrations retorna status 405", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
  // Verifica se o status da resposta é 405 (Method Not Allowed)
  expect(response1.status).toBe(405);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PATCH",
  });
  // Verifica se o status da resposta é 405 (Method Not Allowed)
  expect(response2.status).toBe(405);

  const response3 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE",
  });
  // Verifica se o status da resposta é 405 (Method Not Allowed)
  expect(response3.status).toBe(405);

  // Verifica se o sistema fecha a conexão com o banco de dados após receber uma requisição com método não permitido
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
});
