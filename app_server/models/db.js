const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
 console.log(`mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
 console.log(`mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
 console.log('Mongoose disconnected');
});
const gracefulShutdown = (msg, callback) => {
 mongoose.connection.close( () => {
 console.log(`mongoose disconnected through ${msg}`);
 callback();
 });
};
// For nodemon restarts
process.once('SIGUSR2', () => {
 gracefulShutdown('nodemon restart', () => {
 process.kill(process.pid, 'SIGUSR2');
 });
 });
// For app termination
process.on('SIGINT', () => {
 gracefulShutdown('app termination', () => {
 process.exit(0);
 });
});
// For Heroku app termination
process.on('SIGTERM', () => {
 gracefulShutdown('Heroku app shutdown', () => {
 process.exit(0);
 });
});
require('./locations');
require('./users');