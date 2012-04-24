var Graph = require('../')
	, util = require('util');

describe('Graph', function(){
	var graph;
	
	beforeEach(function(){
		graph = new Graph();
	})
	
	describe('.clear()', function(){
		it('should empty the graph', function(){
			graph.addNode(graph.createNode("N1",""));
			graph.addNode(graph.createNode("N2",""));
			graph.addEdge(graph.createEdge("E1","N1","N2",""));
			graph.clear();
			graph.getNodeCount().should.equal(0);
			graph.getEdgeCount().should.equal(0);
		})
	})
	
	describe('.getNodeCount()', function(){
		describe('when the graph is empty', function(){
			it('should return 0', function(){
				graph.getNodeCount().should.equal(0);
			})
		})
		
		describe('when the graph has one or more nodes', function(){
			it('should return the number of nodes', function(){
				graph.addNode(graph.createNode("N1",""));
				graph.getNodeCount().should.equal(1);
				graph.addNode(graph.createNode("N2",""));
				graph.getNodeCount().should.equal(2);
			})
		})
	})

	describe('.getEdgeCount()', function(){
		describe('when the graph is empty', function(){
			it('should return 0', function(){
				graph.getEdgeCount().should.equal(0);
			})
		})
		
		describe('when the graph has one or more edges', function(){
			it('should return the number of edges', function(){
				graph.addNode(graph.createNode("N1",""));
				graph.addNode(graph.createNode("N2",""));
				graph.addEdge(graph.createEdge("E1","N1","N2",""));
				graph.getEdgeCount().should.equal(1);
			})
		})
	})
	
	describe('.getChildKeys()', function(){
		describe('when the node does not exist', function(){
			it('should return false', function(){
				graph.getChildNodeKeys("N1").should.be.false;
			})
		})

		describe('when the node has no children', function(){
			it('should return an empty list', function(){
				graph.addNode(graph.createNode("N1",""));
				graph.getChildNodeKeys("N1").should.be.empty;
			})
		})
		
		describe('when the node has one of more children', function(){
			it('should return the child keys', function(){
				graph.addNode(graph.createNode("Parent",""));
				graph.addNode(graph.createNode("Child1",""));
				graph.addNode(graph.createNode("Child2",""));
				graph.setParent("Child1","Parent");
				graph.setParent("Child2","Parent");
				graph.getChildNodeKeys("Parent").should.eql(["Child1","Child2"]);
			})
		})
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
	
	describe('.removeEdge()', function(){
		beforeEach(function(){
			graph.addNode(graph.createNode("N1",""));
			graph.addNode(graph.createNode("N2",""));
			graph.addEdge(graph.createEdge("E1","N1","N2",""));
			graph.addNode(graph.createNode("N3",""));
		})
		
		describe('when the edge does not exist', function(){
			it('should return false', function(){
				graph.removeEdge("NonExistantEdge").should.be.false;
			})
		})
		
		it('should remove the edge completely', function(){
			graph.removeEdge("E1").should.be.true;
			graph.getOutgoingEdgeKeys("N1").should.be.empty;
			graph.getIncomingEdgeKeys("N2").should.be.empty;
		})
	})
	
	describe('.setParent()', function(){
		beforeEach(function(){
			graph.addNode(graph.createNode("Parent",""));
			graph.addNode(graph.createNode("Child",""));
		})

		it('should make the parent node contain the child node', function(){
			graph.setParent("Child","Parent").should.be.true;
			graph.getParentKey("Child").should.equal("Parent");
			graph.getChildNodeKeys("Parent").should.include("Child");
		})

		describe('when the parent or child does not exist', function(){
			it('should return false', function(){
				graph.setParent("NonExistantChild","NonExistantParent").should.be.false;
				graph.setParent("NonExistantChild","Parent").should.be.false;
				graph.setParent("Child","NonExistantParent").should.be.false;
			})
		})
	})
	
})