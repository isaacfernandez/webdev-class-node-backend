var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

mongoose.connect('mongodb://heroku_kpt5ftnp:n3r886vrrbi4jlpb1089gqojuu@ds263500.mlab.com:63500/heroku_kpt5ftnp');
var db = mongoose.connection;
db.once('open', function() {
    var admin = new UserModel({
        username: 'admin',
        password: 'admin',
        admin: true
    });
    admin.save();
});

function findUserByCredentials(credentials) {
    var response = userModel.findOne(credentials);
    return response;
}

function findUserByUsername(username) {
    var response = userModel.findOne({username: username});
    return response;
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    user.admin = false; //Set it in the db
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function deleteUser(userId) {
    //this should check session / if admin
    return userModel.remove({_id: userId});
}

function updateUser(user, userId) {
    return userModel.update({_id: userId}, {$set: user});
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    updateUser: updateUser,
    deleteUser: deleteUser
};

module.exports = api;