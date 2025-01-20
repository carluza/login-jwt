const pronoun = ["the", "our"];
const adj = ["great", "big"];
const noun = ["jogger", "racoon"];

function elementoRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateExcuse() {
  const randomPronoun = elementoRandom(pronoun);
  const randomAdj = elementoRandom(adj);
  const randomNoun = elementoRandom(noun);

  return `www.${randomPronoun}_${randomAdj}_${randomNoun}.com`;
}

window.onload = function () {
  const excuse = generateExcuse();
  document.querySelector("#excuse").innerHTML = excuse;
};
