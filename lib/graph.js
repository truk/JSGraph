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
		if (this.nodes[node.key] !== void 0){
			return false;
		}
		this.nodes[node.key] = node;
		return node;
	},

	getNode: function(nodeKey){
		if (this.nodes[nodeKey] === void 0){
			return false;
		}
		return this.nodes[nodeKey];
	},
	
	createEdge: function(key, sourceNodeKey, targetNodeKey, edgeData){
		if (this.nodes[sourceNodeKey] === void 0 ||
			this.nodes[targetNodeKey] === void 0){
				return false;
		}
		return new Edge(key, sourceNodeKey, targetNodeKey, edgeData);
	},

	addEdge: function(edge){
		if (this.edges[edge.key] !== void 0){
			return false;
		}
		this.edges[edge.key] = edge;
		return edge;
	},

	getEdge: function(edgeKey){
		if (this.edges[edgeKey] === void 0){
			return false;
		}
		return this.edges[edgeKey];
	},

	removeNode: function(nodeKey){
		if (this.nodes[nodeKey] === void 0){
			return false;
		}
		delete this.nodes[nodeKey];
		return true;
	}
	
};
