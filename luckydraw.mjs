
function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }
  
  async function getResults() {
    try {
      const tina = await luckyDraw("Tina");
      const jorge = await luckyDraw("Jorge");
      const julien = await luckyDraw("Julien");
  
      console.log(tina, jorge, julien)
    } catch (error) {
      console.error(error);
    }
  }
  
  getResults()