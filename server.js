http = require('http');
fs = require('fs');
mongo = require('mongodb');
tix = require('./tix.js');
curlzen = require('./curlzen.js');

server = http.createServer( function(req, res) {
    if (req.method == 'POST') {
      var body = '';
      req.on('data', function (data) {
        body += data;
      req.on('end', function () {
        var obj=JSON.parse(body);
        var hash=obj.messages[0];
        var tbody=tix.ticket_body(hash);
        var tsubject=tix.ticket_subject(hash);
        var ticket_status=tix.get_status(hash);
        console.log(ticket_status, tsubject, tbody);
        if (ticket_status==='triggered') {
          var message = curlzen.post_text(tsubject,tbody);
          var auth = curlzen.post_authenticator(message);
          curlzen.poster(auth,message);
        }
      }); res.writeHead(200, {'Content-Type': 'text/html'}); res.end('post received');
      });
    }
    else
    {
      var endmessage="This page is the index page for the node event listener. Doesn't really do anything, but lets you know it's here.";
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(endmessage);
    }
    });

server.listen(process.env.PORT || 3000);
