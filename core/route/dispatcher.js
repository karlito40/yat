var HTTP = require('../constant-list/http');

module.exports = function(req, res) { 
  console.log('handleRequest')
  var lookup = decodeURI(req.url);
  // console.log('req.url', req.url)
  console.log('lookup', lookup);

  res.writeHead(HTTP.CODE.OK, {
    'Content-Type': 'text/html'
  });
  res.end('Yeaaa');
}