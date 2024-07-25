const figlet = require("figlet");
const fs = require("fs");

figlet("Ciao Mondo!", (err, data) => {
  if (err) {
    console.error("Errore nella generazione del testo:", err);
    return;
  }

  console.log(data);

  fs.writeFile("art.txt", data, (err) => {
    if (err) {
      console.error("Errore nella scrittura del file:", err);
      return;
    }

    console.log("File scritto con successo!");
  });
});
