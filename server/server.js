const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const busboy = require('express-busboy');
const expressJWT = require('express-jwt');

const auctionHandler = require('./controllers/auctions');
const homeHandler = require('./controllers/home');
const loginSignupHandler = require('./controllers/loginSignup');
const userHandler = require('./controllers/user');
const artistHandler = require('./controllers/artist');
const imageHandler = require('./controllers/imageUpload');
const notificationHandler = require('./controllers/notification');
const app = express();
busboy.extend(app, {
  upload: true,
});
// app.use(expressJWT({
//   secret: 'tenacious turtles',
//   exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30) //expires in 30 days
// }).unless({path: ['/', '/assets/semantic/semantic.css', '/image-gallery.css', '/styling.css', '/bundle.js', '/home', '/auth']}));
//unless is excluding which paths
const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('Listening on port ', port);
});
const io = require('./sockets.js').init(server);

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/public')));

app.use('/auctions', auctionHandler);
app.use('/home', homeHandler);
app.use('/auth', loginSignupHandler);
app.use('/user', userHandler);
app.use('/artist', artistHandler);
app.use('/images', imageHandler)
app.use('/notifications', notificationHandler);

module.exports = server;
