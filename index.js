const figlet = require("figlet");

figlet("Ciao Mondo!", function (err, data) {
  if (err) {
    console.log("Si è verificato un errore:");
    console.dir(err);
    return;
  }
  console.log(data);
});
