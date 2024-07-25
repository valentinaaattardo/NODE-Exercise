function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} ha vinto un premio nel sorteggio!`);
      } else {
        reject(new Error(`${player} ha perso il sorteggio.`));
      }
    });
  });
}


function executeLuckyDraw() {
  luckyDraw("Joe")
    .then((result) => {
      console.log(result);
      return luckyDraw("Caroline");
    })
    .then((result) => {
      console.log(result);
      return luckyDraw("Sabrina");
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error.message);
    });
}


executeLuckyDraw();
