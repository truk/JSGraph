var Graph = require('../')
	, util = require('util');

describe('Graph', function(){
	var graph;
	
	beforeEach(function(){
		graph = new Graph();
	})
	
	describe('.createNode()', function(){
		it('should create a node', function(){
			graph.createNode("K","").key.should.equal("K");
		})
	})
	
	describe('.addNode()', function(){
		it('should add a node to the graph', function(){
			var node = graph.createNode("K","");
			graph.addNode(node).should.equal(node);
			graph.getNode("K").should.equal(node);
		})
		
		describe('when a node with this key already exists', function(){
			it('should not add the node', function(){
				graph.addNode(graph.createNode("K",""));
				graph.addNode(graph.createNode("K","")).should.be.false;
			})
		})
	})

	describe('.createEdge()', function(){
		it('should create an edge', function(){
			graph.addNode(graph.createNode("N1",""));
			graph.addNode(graph.createNode("N2",""));
			graph.createEdge("E","N1","N2","").key.should.equal("E");
		})
	})
	
	describe('.addEdge()', function(){
		beforeEach(function(){
			graph.addNode(graph.createNode("N1",""));
			graph.addNode(graph.createNode("N2",""));
		})
		
		it('should add an edge to the graph', function(){
			var edge = graph.createEdge("E","N1","N2","");
			graph.addEdge(edge).should.equal(edge);
		})
		
		describe('when the edge already exists', function(){
			it('should not add the edge', function(){
				var edge = graph.createEdge("E","N1","N2","");
				graph.addEdge(edge);
				graph.addEdge(edge).should.be.false;
			})
		})
		
		describe('when the source or target node do not exist', function(){
			it('should not add the edge', function(){
				graph.addEdge(graph.createEdge("E","N3","N4","")).should.be.false;
				graph.addEdge(graph.createEdge("E","N1","N3","")).should.be.false;
				graph.addEdge(graph.createEdge("E","N3","N1","")).should.be.false;
			})			
		})
	})
	
	describe('.removeNode()', function(){
		beforeEach(function(){
			graph.addNode(graph.createNode("N1",""));
			graph.addNode(graph.createNode("N2",""));
			graph.addEdge(graph.createEdge("E1","N1","N2",""));
			graph.addNode(graph.createNode("N3",""));
		})
		
		describe('when the node does not exist', function(){
			it('should return false', function(){
				graph.removeNode("NonExistantNode").should.be.false;
			})
		})
		
		describe('when the node has no edges', function(){
			it('should remove only the node', function(){
				graph.removeNode("N3").should.be.true;
				graph.getNode("N3").should.be.false;
				graph.getEdge("E1").should.not.be.false;
			})
		})
		
		describe('when the node has one or more edges', function(){
			it('should remove the node and its edges', function(){
				graph.removeNode("N1").should.be.true;
				graph.getNode("N1").should.be.false;
				graph.getEdge("E1").should.be.false;
			})
		})
	})
	
})