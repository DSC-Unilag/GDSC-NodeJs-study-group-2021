const fs = require("fs");
const path = require("path");
const axios = require("axios");

const URL = 'https://v2.jokeapi.dev/joke/Any?idRange=180';


const isPrime = (num) => {
  let prime = true;
  if (num > 1) {
      for ( let i = 2; i < num; i++ ) {
          if ( num % i === 0 ) {
              prime = false;
              break
          }
      }
  }
  return prime
};

const writeToFile = (a, b) => {
  let primeNumArray = [];

  if (a > b) {
    primeNumArray.push(`a ought to be less than b. Do the right thing boy, abi it is man or woman. Sha do the right thing`)
  } else {
    for ( let i = a; i <= b; i++ ) {
      if (isPrime(i)) {
        primeNumArray.push(i);
      }
    }
  }

  fs.writeFile(path.join(__dirname, "myFile.txt"), primeNumArray.toString(), (err) => {
    if (err) { throw err }
    console.log( `Prime Numbers between ${a} and ${b} written in myFile.txt` )
  })
};

const getJoke = async () => {
  const { data } = await axios.get(URL);
  return data.joke;
};

module.exports = {
  isPrime,
  writeToFile,
  getJoke,
  URL,
};