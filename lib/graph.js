/*!
 * JSGraph - Graph
 * Copyright(c) 2012 Kurt Eldridge <kilofoxtrotecho@gmail.com>
 * MIT Licensed
 */

var Node = function(key, nodeData){
	this.key = key;
	this.data = nodeData;
	this.outgoingEdgeKeys = [];
	this.incomingEdgeKeys = [];
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
		return new Edge(key, sourceNodeKey, targetNodeKey, edgeData);
	},

	addEdge: function(edge){
		if (this.edges[edge.key] !== void 0){
			return false;
		}

		if (this.nodes[edge.sourceNodeKey] === void 0 ||
			this.nodes[edge.targetNodeKey] === void 0){
				return false;
		}

		this.edges[edge.key] = edge;
		this.nodes[edge.sourceNodeKey].outgoingEdgeKeys.push(edge.key);
		this.nodes[edge.targetNodeKey].incomingEdgeKeys.push(edge.key);
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
		
		var outEdgeKeys  = this.nodes[nodeKey].outgoingEdgeKeys;
		for (var i=0; i<outEdgeKeys.length; i++){
			delete this.edges[outEdgeKeys[i]];
		}

		var inEdgeKeys  = this.nodes[nodeKey].incomingEdgeKeys;
		for (var i=0; i<inEdgeKeys.length; i++){
			delete this.edges[inEdgeKeys[i]];
		}
		
		delete this.nodes[nodeKey];
		return true;
	}
	
};
