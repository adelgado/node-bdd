/* :set ts=2
 * :set tw=2
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.post('/:n1', function (req, res) {
	var n1 = req.params.n1
	var n2 = req.query.n2
  console.log(n1)
  console.log(n2)
	res.json({content: Number(n1) + Number(n2)})
})

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
