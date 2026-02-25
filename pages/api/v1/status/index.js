import database from "../../../../infra/database.js";

export default async function status(req, res) {
  const result = await database.query("SELECt 1 + 1 as sum;");
  console.log(result.rows);
  res.status(200).json({ status: "ok" });
}
