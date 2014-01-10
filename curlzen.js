// do a POST request
// create the JSON object
exports.post_text = function (subject,body){
  var posttext = {
    "ticket" : {
        "subject" : subject,
        "comment" : {
             "body" : body
         }
    } 
  };
  var json_posttext = JSON.stringify(posttext);
  return json_posttext;
}
 
// prepare the header
exports.post_authenticator = function (msg){
  var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(msg, 'utf8')
  };
 
// the post options
  var postoptions = {
    auth : 'change_this',
    host : 'change_this',
    path : '/api/v2/tickets.json',
    method : 'POST',
    headers : postheaders
  };
  return postoptions;
}
 
// do the POST call
exports.poster = function post_this(postoptions,text){
  var https = require('https');
  var reqPost = https.request(postoptions, function(res) {
    console.log("statusCode: ", res.statusCode);
    res.on('data', function(output) {
      var data=JSON.parse(output);
      console.log(data);
    });
  });
 
// write the json data
  reqPost.write(text);
  reqPost.end();
  reqPost.on('error', function(e) {
    console.error(e);
  });
}
 
