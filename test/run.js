var Graph = require('../')
	, util = require('util');

var g = new Graph();
g.addNode(g.createNode("k","Data"));
util.log(util.inspect(g));