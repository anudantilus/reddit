// Modified this tutorial:  https://alpscode.com/blog/how-to-use-reddit-api/
// You have to create an app first inside your reddit account.

function getToken() {

  var url = "https://www.reddit.com/api/v1/access_token";
  var grantType = "password"
  var username = "ENTER YOUR USERNAME";
  var password = "ENTER YOUR PASSWORD";
  
  var formData = {
    "grant_type" : "password",
    "username" : username,
    "password" : password
    };
  
  var headers = {    
    'user-agent' : 'appName by username',
    "Authorization" : "Basic " + Utilities.base64Encode("appId" + ':' + "secret")
    };

  var params = {
    'method' : 'POST',
    'headers' : headers,
    'payload' : formData
  };

  var response = JSON.parse(UrlFetchApp.fetch(url, params));
  
  // Return the relevant information for url building
  
  Logger.log(response);
}

function getMe() {

  var url = "https://oauth.reddit.com/api/v1/me";
  
  var token = "bearer " + "FILL ME IN";
  
  var formData = {
//    "grant_type" : "password",
//    "username" : username,
//    "password" : password
    };
  
  var headers = {    
    'user-agent' : 'appName by username',
    "Authorization" : token
    };

  var params = {
    'method' : 'GET',
    'headers' : headers,
    'payload' : formData
  };

  var response = JSON.parse(UrlFetchApp.fetch(url, params));
  
  Logger.log(response);

}
