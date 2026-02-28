const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout, stderr) {
    // console.log("stdout: ", stdout);
    // console.log("stderr: ", stderr);
    // console.log("error: ", error);
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      setTimeout(checkPostgres, 1000);
      return;
    }
    console.log("\n\n😎  Postgres is ready!\n");
  }
}
process.stdout.write("\n🤡  Waiting for Postgres to be ready...");
checkPostgres();
