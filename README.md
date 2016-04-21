Work in progress

## Why
Modularity is geat but sometime you just need something that works out of the box.

## Goal

+ Removing require functions (so you don't have to memorize things)
+ Forcing a structuration
+ Isomorphic javascript (only for the react components)
+ Monitoring (user, current log, errors, db call ...)
+ Cache
+ Static server (cdn + dev)
+ Hook code integration (event base)
+ Code deploy test (vm.. meteor)
+ jslint
```
npm install yat
```

### Command line

Create a new project

```
node node_modules/.bin/yat 
```

Launch a project

```
node node_modules/ya-framework/index.js

```

+ bootstrap.js  (everything can be set here: route, app, module, model, ...)
+ routes        (group by filename)
+ modules       
+ node_modules/yat
+ models        
+ database      (queries)
+ public        (assets folder)
+ views         (jade only)
+ linter

###  Bootstrap example

```

// DOES NOT NEED ANY REQUIRE

// Optional
App.set({
  DEBUG: true,              // :optional
  port: 9999,               // :optional
  publicFolder: './public'  // :optional
  ssl: {                    // active the https server :optional
     key: './key',  
     cert: './cert'  
  }
});

// Optional
Module.add([
  require('yat-varnish'),   // TODO
  require('yat-auth'),      // TODO
  require('yat-rabbitmq'),  // TODO
  require('yat-socketio'),  // TODO
])

// Optional
Router.get('/', function() {
  this.render('view_name');
})

// ...

```

### Router example

```
// bootstrap.js
// no require need

// Use a react component in a view (seo)
var reactComponent = require("../../public/js/components/app");
Router.get('/react', function() {

  this.render('test', {
    hello: 'world',
    partial: this.react(reactComponent)
  });

});

// Use a partial in a view
Router.get('/partial', function() {

  this.render('test', {
    hello: 'world',
    partial: this.partial('another_view', {
      foo: 'wooow'
    })
  });

});

// Json response
Router.get('/json', function() {
  this.json({
    foo: 'bar'
  });
});

// Of course async stuff are working
Router.get('/async', function() {
  setTimeout(() => {
    this.json({
      message: 'async works'
    })
  }, 100);
});

// If you do want something special
// There is still a possibility to use
// the request and the response object
// sent by node
Router.post('/simple/:uid', function(uid) {
  // console.log('this.req', this.req);
  this.res.end('uid:\n' + uid);
})



// Magical route
// There is no limit to the number of parameter
// http://localhost:9999/foo/2/toto
Router.get('/foo/:uid/:name', function(uid, name) {
  this.json({
    uid: uid,
    name: name
  });
});

// Delete
Router.del('/things/:fooId', function(fooId){
  this.json({
    message: `thing ${fooId} has been deleted`
  });
})

// Post method
// Body will alway be the last parameter
Router.post('/partial', function(body) {
  this.json(body);
});

Router.post('/example/:number/:uid/:foo', function(number, uid, foo, body) {
  this.json(body);
});

```

### View


## Internationalization
