const URL = 'https://v2.jokeapi.dev/joke/Any?idRange=180';
const isPrime = (num) => {
  //complete the function to return true or false if a numnber is prime or not.
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
};

const getJoke = async () => {
  // Using axios or any other method of your preference
  // make a get request to https://v2.jokeapi.dev/joke/Any?idRange=180
  // it returns a json object.
  // get the "joke" parameter in the json object.
  //return that value.
  // you might need to use async await.
};

module.exports = {
  isPrime,
  writeToFile,
  getJoke,
  URL,
};
