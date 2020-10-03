const express = require('express');
const fileMiddleware = express();
const {fileRequestErrorHandler} = require('../controllers/errorHandler');

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['jpg','png','mp4'],
    index: false,
    maxAge: '1d',
    redirect: false,
    fallthrough : false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
}

//static middleware for user request for a file
// img and videos are virtual dir
fileMiddleware.use('/img',express.static("public/img",options),fileRequestErrorHandler);
fileMiddleware.use('/video',express.static("public/videos",options),fileRequestErrorHandler);

module.exports = fileMiddleware;