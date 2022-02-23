const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');
const user = db.chousei_user;

module.exports = {
  addUser(newUserName) { 
    return user.create({
      name: newUserName
      , created_at: new Date()
      , updated_at: new Date()
    })
  },
  deleteUser(userId) { 
    return user.destroy({
      where: {
        id: userId
      }
    })
  },
  getUserList() {
    return user.findAll()
  },
}