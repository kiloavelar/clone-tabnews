import database from "infra/database";

export default async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const databaseNameResult = await database.query("SHOW event_source;");
  const databaseNameValue = databaseNameResult.rows[0].event_source;

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue = parseInt(
    databaseMaxConnectionsResult.rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    // Limpa a string para evitar SQL Injection, mesmo que o valor venha de uma variável de ambiente
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        name: databaseNameValue,
        version: databaseVersionValue,
        max_connections: databaseMaxConnectionsValue,
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}
