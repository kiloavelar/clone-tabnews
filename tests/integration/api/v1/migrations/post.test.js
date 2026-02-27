test("POST /api/v1/migrations retorna status 200 e 201", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  // Verifica se o status da resposta é 201
  expect(response1.status).toBe(201);

  const response1Body = await response1.json();
  // console.log(response1Body);

  // Verifica se o corpo da resposta é um array
  expect(Array.isArray(response1Body)).toBe(true);

  // Verifica se o array de migrações não está vazio
  expect(response1Body.length).toBeGreaterThan(0);

  // Verifica se cada item do array tem as propriedades "path", "name" e "timestamp"
  response1Body.forEach((item) => {
    expect(item).toHaveProperty("path");
    expect(item.path).toContain(item.timestamp.toString());
    expect(item.path).toContain(item.name + ".js");
    expect(item).toHaveProperty("name");
    expect(item.name).toContain(item.timestamp.toString());
    expect(item).toHaveProperty("timestamp");
    expect(typeof item.timestamp).toBe("number");
  });

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  // Verifica se o status da resposta é 200
  expect(response2.status).toBe(200);

  const response2Body = await response2.json();
  // console.log(response2Body);

  // Verifica se o corpo da resposta é um array
  expect(Array.isArray(response2Body)).toBe(true);

  // Verifica se o array de migrações não está vazio
  expect(response2Body.length).toBe(0);
});
