const User = require('../models/User');
const { users } = require('./data');

class FakeDB {
  // Delete any existing data in DB
  async delete() {
    try {
      await User.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }

  //   Create new users
  async add() {
    try {
      await User.create(users);
    } catch (error) {
      console.log(error);
    }
  }

  //   Populate DB with data
  async populate() {
    await this.delete();
    await this.add();
  }
}

const fakeDB = new FakeDB();
module.exports = fakeDB;
