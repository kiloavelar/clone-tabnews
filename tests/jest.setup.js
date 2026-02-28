beforeAll(async () => {
  const orchestrator = await import("./orchestrator.js");
  await orchestrator.default.waitForAllServices();
});
