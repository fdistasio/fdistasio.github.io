function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Change node color
function colorNode(graph, node) {

    graph.body.data.nodes.update({
        id: node,
        color: { background: '#ff3c38' }
    });

}

// Reset nodes color
function resetColors(graph) {

    let nodes = graph.body.data.nodes.get();

    for (let i = 0; i < nodes.length; i++) {
        graph.body.data.nodes.update({
            id: i,
            color: { background: 'lightblue' }
        });
    }

}

// BFS
async function bfs(graph, start) {

    let sSleep = 60;
    let lSleep = 1000;

    //let nodes = graph.body.data.nodes.get();
    let edges = graph.body.data.edges.get();

    let queue = [start];
    let visited = new Set();
    let result = [];

    colorNode(graph, start);

    while(queue.length != 0) {

        let currentNode = queue.shift();

        if (!visited.has(currentNode)) {

            visited.add(currentNode);
            result.push(currentNode);
            colorNode(graph, currentNode);
            await sleep(sSleep);

            for (let currentEdge of edges) {

                if (currentEdge.from === currentNode && !visited.has(currentEdge.to))
                    queue.push(currentEdge.to);

            }
        }
    }

    await sleep(lSleep);
    resetColors(graph);
    console.log(result);
    return result;

}

// DFS
async function dfs(graph, start) {

    let sSleep = 60;
    let lSleep = 1000;

    //let nodes = graph.body.data.nodes.get();
    let edges = graph.body.data.edges.get();

    let stack = [start];
    let visited = new Set();
    let result = [];

    colorNode(graph, start);

    while(stack.length != 0) {

        let currentNode = stack.pop();

        if (!visited.has(currentNode)) {

            visited.add(currentNode);
            result.push(currentNode);
            colorNode(graph, currentNode);
            await sleep(sSleep);

            for (let currentEdge of edges) {

                if (currentEdge.from === currentNode && !visited.has(currentEdge.to))
                    stack.push(currentEdge.to);

            }

        }

    }

    await sleep(lSleep);
    resetColors(graph);
    console.log(result);
    return result;

}


//Dijkstra
async function dijkstra(graph, start) {

    let sSleep = 60;
    let lSleep = 1000;

    // Get nodes and edges from graph
    let nodes = graph.body.data.nodes.get();
    let edges = graph.body.data.edges.get();

    let distances = [];     // Distances array
    let mpQueue = [start];  // Min Priority Queue
    let result = [];        // Shortest Path Tree (predecessors array, example: result[1] = 0 means that the node 0 is the predecessor of node 1)

    // Set all distances to +inf and the root as the predecessor of all nodes
    for(let currentNode of nodes) {
        distances[currentNode.id] = Infinity;
        result[currentNode.id] = start;
    }

    // Root distance = 0
    distances[start] = 0;

    // While queue is not empty
    while (mpQueue.length != 0) {

        let minDist = Infinity;
        let currentNodeIndex = undefined;

        // Dequeue

        for(let i = 0 ; i < mpQueue.length ; i++) {

            if(distances[mpQueue[i]] < minDist) {
                minDist = distances[mpQueue[i]];
                currentNodeIndex = i;
            }

        }

        let currentNode = mpQueue.splice(currentNodeIndex, 1)[0];

        colorNode(graph, currentNode);
        await sleep(sSleep);

        // For each outgoing edge from the current node
        for(let currentEdge of edges) {

            if (currentEdge.from === currentNode) {

                let newDist = distances[currentNode] + parseInt(currentEdge.label);

                // Check Bellman conditions
                if (newDist < distances[currentEdge.to]) {

                    // Update distances and result
                    distances[currentEdge.to] = newDist;
                    result[currentEdge.to] = currentEdge.from;

                    // Enqueue
                    mpQueue.push(currentEdge.to);

                }

            }
        }
    }

    await sleep(lSleep);
    resetColors(graph);
    console.log(result);
    return result;

}