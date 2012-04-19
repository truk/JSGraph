/*!
 * JSGraph - Graph
 * Copyright(c) 2012 Kurt Eldridge <kilofoxtrotecho@gmail.com>
 * MIT Licensed
 */

var Node = function(key, nodeData){
	this.key = key;
	this.data = nodeData;
};

var Edge = function(key, sourceNodeKey, targetNodeKey, edgeData){
	this.key = key;
	this.sourceNodeKey = sourceNodeKey;
	this.targetNodeKey = targetNodeKey;
	this.data = edgeData;
};

var Graph = module.exports = function Graph(){
	this.nodes = {};
	this.edges = {};
};

Graph.prototype = {
	
	createNode: function(key, nodeData){
		return new Node(key, nodeData);
	},

	addNode: function(node){
		this.nodes[node.key] = node;
	},
	
	createEdge: function(key, sourceNodeKey, targetNodeKey, edgeData){
		if (this.nodes[sourceNodeKey] === "undefined" &&
			this.nodes[targetNodeKey] === "undefined"){
				return false;
			}
		return new Edge(key, sourceNodeKey, targetNodeKey, edgeData);
	},

	addEdge: function(edge){
		this.edges[edge.key] = edge;
	}
	
};
