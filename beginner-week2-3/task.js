const URL = 'https://v2.jokeapi.dev/joke/Any?idRange=180';
const fs = require('fs');
const axios = require('axios');
const isPrime = (num) => {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;

    //complete the function to return true or false if a numnber is prime or not.
};

const writeToFile = (a, b) => {
    let array = []
    for (let i = a; i <= b; i++) {
        if (isPrime(i)) {
            array.push(i)
        }
    }

    array.sort(function (a, b) {
        return a - b;
    })

    let string = array.join('\n')
    fs.appendFile('./myFile.txt', string, (err) => {
        if (err) throw err;
    })
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
    const result = await axios.get(URL);
    return result.data.joke;
    // make a get request to https://v2.jokeapi.dev/joke/Any?idRange=180

};

module.exports = {
    isPrime,
    writeToFile,
    getJoke,
    URL,
};
