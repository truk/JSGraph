var Graph = require('../')
	, util = require('util');

describe('Graph', function(){
	var graph;
	
	beforeEach(function(){
		graph = new Graph();
	})
	
	describe('.createNode()', function(){
		it('should create a node with key "K"', function(){
			graph.createNode("K","").key.should.equal("K");
		})
	})
	
	describe('.addNode()', function(){
		it('should add a node to the graph', function(){
			var node = graph.createNode("K","");
			graph.addNode(node).should.equal(node);
			graph.getNode("K").should.equal(node);
		})
		
		it('should not add a node whose key already exists', function(){
			graph.addNode(graph.createNode("K",""));
			graph.addNode(graph.createNode("K","")).should.be.false;
		})
	})

	describe('.createEdge()', function(){
		it('should create an edge', function(){
			graph.addNode(graph.createNode("N1",""));
			graph.addNode(graph.createNode("N2",""));
			graph.createEdge("E","N1","N2","").key.should.equal("E");
		})
		
		it('should return false if the target or source is undefined', function(){
			graph.createEdge("E","N1","N2","").should.be.false;
			graph.addNode(graph.createNode("N1",""));
			graph.createEdge("E","N1","N2","").should.be.false;
			graph.createEdge("E","N2","N1","").should.be.false;
		})
	})
	
	describe('.addEdge()', function(){
		it('should add an edge to the graph', function(){
			graph.addNode(graph.createNode("N1",""));
			graph.addNode(graph.createNode("N2",""));
			var edge = graph.createEdge("E","N1","N2","");
			graph.addEdge(edge).should.equal(edge);
		})
		
		it('should not add an edge if the edge key already exists', function(){
			graph.addNode(graph.createNode("N1",""));
			graph.addNode(graph.createNode("N2",""));
			var edge = graph.createEdge("E","N1","N2","");
			graph.addEdge(edge);
			graph.addEdge(edge).should.be.false;
		})
	})
	
})