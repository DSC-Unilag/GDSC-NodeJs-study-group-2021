const URL = 'https://v2.jokeapi.dev/joke/Any?idRange=180';
const fs = require('fs');
const axios = require('axios');

const isPrime = (num) => {
  //complete the function to return true or false if a numnber is prime or not.
  let i = 2;
  while (i * i < num * 2) {
    if (num % i == 0) {
      return false;
    }
    i++;
  }
  return true;
};

const writeToFile = (a, b) => {
  //write a function to check for all prime numbers between a and b (both inclusive) and write them to the file "myFile.txt"
  // e.g if a = 3 and b = 17
  // The content of myFile.txt will be
  // 3
  // 5
  // 7
  // 11
  // 13
  // 17
  // You will likely use the isPrime function above.

  let data = '';

  for (let i = a; i <= b; i++) {
    if (isPrime(i)) {
      data = data + i + '\n';
    }
  }

  fs.writeFile('myFile.txt', data, (err) => {
    console.log(err);
  });
};

const getJoke = async () => {
  // Using axios or any other method of your preference
  // make a get request to https://v2.jokeapi.dev/joke/Any?idRange=180
  // it returns a json object.
  // get the "joke" parameter in the json object.
  //return that value.

  const { data } = await axios.get(URL);
  return data.joke;
};

module.exports = {
  isPrime,
  writeToFile,
  getJoke,
  URL,
};
