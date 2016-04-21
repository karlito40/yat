const Forge = require('forge-struct');

Forge.create([
    'routes',
    'public/js',
    'modules',
    'models',
    'database',
    
    { path: 'views/test.jade', content: `
doctype html  
html(lang="en")
head
    title Yat
body
    h1 Jade - node template engine #{hello}
    #container.col
    if youAreUsingJade
        p You are amazing
    else
        p Get on it!
    p.
        Jade is a terse and simple
        templating language with a
        strong focus on performance
        and powerful features.

  ` },
  { path: 'bootstrap.js', content: `    
App.set({
    DEBUG: true,
    port: 9999,
});

Router.get('/', function() {
    this.render('test', {
        hello: 'world'
    });
});

  ` } 
])