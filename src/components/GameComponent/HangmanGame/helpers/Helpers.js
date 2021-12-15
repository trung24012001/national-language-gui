

export function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 3000);
}



export function checkWin(correct, wrong, word) {
  let status = "win";



  // Check for win
  for (let letter of word.split("")) {
    if (letter == " ") continue;
    if (!correct.includes(letter)) {
      status = "";
    }
  }
  // Check for lose
  if (wrong.length === 6) status = "lose";

  return status;
}
