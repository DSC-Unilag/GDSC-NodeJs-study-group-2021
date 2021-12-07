const chai = require('chai');
const axios = require('axios');
const { URL, getJoke, writeToFile } = require('./task');
const assert = chai.assert;
const fs = require('fs');

let data;
let joke;

describe('Tests for beginner week 2 tasks', () => {
  before(async () => {
    data = await axios.get(URL);
    data = data.data;
    joke = await getJoke();
  });
  it('Get correct joke from the joke api', (done) => {
    assert.equal(data.joke, joke, 'your joke doesnt match the api response');
    done();
  });

  it('Check that prime numbers are added to file successfully', (done) => {
    const correct = `
3
5
7
11
13
17
19
23
29
31
37
41
43
47
53
59
61
67
71
73
79
83
89
97`;
    writeToFile(3, 100);
    fs.readFile('./myFile.txt', (err, data) => {
      assert.equal(correct.trim(), String(data).trim());
      done();
    });
  });
});
