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
	this.childNodeKeys = {};
	this.parentKey;
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
	
	clear: function(){
		this.nodes = {};
		this.edges = {};
	},

	getNodeCount: function(){
		var size = 0, key;
		for (key in this.nodes) {
			if (this.nodes.hasOwnProperty(key)){
				size++;
			} 
		}
		return size;
	},

	getEdgeCount: function(){
		var size = 0, key;
		for (key in this.edges) {
			if (this.edges.hasOwnProperty(key)){
				size++;
			} 
		}
		return size;
	},
	
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

	getChildNodeKeys: function(nodeKey){
		if (this.nodes[nodeKey] === void 0){
			return false;
		}
		var keys = [];
		for (var k in this.nodes[nodeKey].childNodeKeys){
			keys.push(k);
		}
		
		return keys;
	},
	
	getOutgoingEdgeKeys: function(nodeKey){
		if (this.nodes[nodeKey] === void 0){
			return false;
		}
		return this.nodes[nodeKey].outgoingEdgeKeys;
	},

	getIncomingEdgeKeys: function(nodeKey){
		if (this.nodes[nodeKey] === void 0){
			return false;
		}
		return this.nodes[nodeKey].incomingEdgeKeys;
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
	},
	
	removeEdge: function(edgeKey){
		if (this.edges[edgeKey] === void 0){
			return false;
		}
		
		var sourceNode = this.nodes[this.edges[edgeKey].sourceNodeKey];
		var targetNode = this.nodes[this.edges[edgeKey].targetNodeKey];
		
		for (var i=0; i<sourceNode.outgoingEdgeKeys.length; i++){
			if (sourceNode.outgoingEdgeKeys[i] == edgeKey){
				sourceNode.outgoingEdgeKeys.splice(i, 1);
			}
		}

		for (var i=0; i<targetNode.incomingEdgeKeys.length; i++){
			if (targetNode.incomingEdgeKeys[i] == edgeKey){
				targetNode.incomingEdgeKeys.splice(i, 1);
			}
		}
		
		delete this.edges[edgeKey];
		return true;
	},
	
	setParent: function(childKey, parentKey){
		if (this.nodes[childKey] == void 0 || 
			this.nodes[parentKey] == void 0){
			return false;
		}

		if (this.nodes[childKey].parentKey != void 0){
			delete this.nodes[this.nodes[childKey].parentKey];
		}
		
		this.nodes[parentKey].childNodeKeys[childKey] = 1;
		this.nodes[childKey].parentKey = parentKey;
		return true;
	},
	
	getParentKey: function(childKey){
		if (this.nodes[childKey] === void 0){
			return false;
		}
		
		if (this.nodes[childKey].parentKey === void 0){
			return false;
		}
		debugger;
		return this.nodes[childKey].parentKey;
	}
	
};
