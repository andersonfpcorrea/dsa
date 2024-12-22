class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  /**
   * @param {string} vertexName
   */
  addVertex(vertexName) {
    if (!this.adjacencyList[vertexName])
      this.adjacencyList[vertexName] = new Set();
  }

  /**
   * @param {string} vertexName1
   * @param {string} vertexName2
   * @param {{uniDirection:boolean}} options
   */
  addEdge(vertexName1, vertexName2, options) {
    if (!this.adjacencyList[vertexName1]) this.addVertex(vertexName1);
    this.adjacencyList[vertexName1].add(vertexName2);
    if (!options?.uniDirection) {
      if (!this.adjacencyList[vertexName2]) this.addVertex(vertexName2);
      this.adjacencyList[vertexName2].add(vertexName1);
    }
  }

  /**
   * @param {string} vertexName1
   * @param {string} vertexName2
   * @param {{uniDirection:boolean}} options
   */
  removeEdge(vertexName1, vertexName2, options) {
    if (this.adjacencyList[vertexName1].has(vertexName2))
      this.adjacencyList[vertexName1].delete(vertexName2);
    if (!options?.uniDirection) {
      if (this.adjacencyList[vertexName2].has(vertexName1))
        this.adjacencyList[vertexName2].delete(vertexName1);
    }
  }

  /**
   * @param {string} vertexName
   */
  removeVertex(vertexName) {
    for (let v of this.adjacencyList[vertexName].values()) {
      this.removeEdge(v, vertexName);
    }
    Reflect.deleteProperty(this.adjacencyList, vertexName);
  }

  dfsRecursive(startingVertex) {
    const result = [];
    const vistedVertexes = {};
    const dfsHelper = (vertex) => {
      if (!vertex) return;
      result.push(vertex);
      vistedVertexes[vertex] = true;
      for (let neighbor of this.adjacencyList[vertex].values()) {
        if (!vistedVertexes[neighbor]) {
          dfsHelper(neighbor);
        }
      }
    };
    dfsHelper(startingVertex);
    return result;
  }

  dfsIterative(startingVertex) {
    const result = [];
    const visitedVertexes = { [startingVertex]: true };
    const stack = [startingVertex];
    let vertex;
    while (stack.length) {
      vertex = stack.pop();
      result.push(vertex);
      for (let neighbor of this.adjacencyList[vertex].values()) {
        if (!visitedVertexes[neighbor]) {
          visitedVertexes[neighbor] = true;
          stack.push(neighbor);
        }
      }
    }
    return result;
  }

  bfsIterative(startingVertex) {
    const result = [];
    const queue = [startingVertex];
    const visitedVertexes = { [startingVertex]: true };
    let v;
    while (queue.length) {
      v = queue.shift();
      result.push(v);
      for (let neighbor of this.adjacencyList[v].values()) {
        if (!visitedVertexes[neighbor]) {
          visitedVertexes[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }
    return result;
  }
}

const g = new Graph();
g.addVertex("Brazil");
g.addVertex("Chile");
g.addVertex("Argentina");
g.addVertex("Equador");
g.addVertex("Peru");
g.addVertex("Colombia");
g.addVertex("Venezuela");
g.addVertex("Bolivia");
g.addEdge("Brazil", "Argentina");
g.addEdge("Brazil", "Chile");
g.addEdge("Equador", "Bolivia");
g.addEdge("Equador", "Brazil");
g.addEdge("Brazil", "Peru");
g.addEdge("Chile", "Argentina", { uniDirection: true });
console.log(g);
// g.removeEdge("Brazil", "Argentina");
// g.removeEdge("Chile", "Brazil", { uniDirection: true });
// console.log(g);
// g.removeVertex("Brazil");
// console.log(g);
console.log(g.dfsRecursive("Brazil"));
console.log(g.dfsIterative("Brazil"));
console.log(g.bfsIterative("Brazil"));
