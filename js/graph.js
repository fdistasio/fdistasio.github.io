window.onload = function () {
let nodes = [];
let edges = [];

let nodesNum = 50;
let edgesNum = 110;
let mSleep = 500;

// Create graph
function createGraph(nodes, edges, nodesNum, edgesNum) {

    // Node init
    for (let i = 0; i < nodesNum; i++)
       nodes.push({ id: i, label: i.toString() }); // label: i.toString()

    // Edges init (random)
    for (let i = 0; i < edgesNum; i++) {

        let fromVal = Math.floor(Math.random() * nodesNum);
        let toVal = Math.floor(Math.random() * nodesNum);
        let weight = Math.floor(Math.random() * 10) + 1;

        if (fromVal !== toVal) {
            edges.push({ from: fromVal, to: toVal, label: weight.toString() });
        }

    }

    // Params init

    let data = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges)
    };

    let options = {

        nodes: {
            font: {
                size: 20,
                color: "black",
            },
            shape: "circle",
            borderWidth: 1,
            color: {
                border: "rgb(0, 173, 252)",
                background: "lightblue",
                highlight: {
                    border: "black",
                },
                hover: {
                    border: "rgb(0, 174, 255)",
                }
            }
        },

        edges: {
            font: {
                size: 15,
                color: "black",
            },
            width: 0.5, 
            arrows: {
                to: { 
                    enabled: true, 
                    type: "arrow", scaleFactor: 0.5}
            }
        },

        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -2000,
                centralGravity: 0.3,
                springLength: 95,
                springConstant: 0.04
            }
        },

        interaction: { 
            hover: true
        }
    };

    // Create graph
    let container = document.getElementById("graph");
    let graph = new vis.Network(container, data, options);

    return graph;

}

// Apply graph algorithms
async function applyAlgorithms(graph, start) {

    while (true) {

        await sleep(mSleep);
        await bfs(graph, start);

        await sleep(mSleep);
        await dfs(graph, start);

        await sleep(mSleep);
        await dijkstra(graph, start);

    }
    
}

let graph = createGraph(nodes, edges, nodesNum, edgesNum);
applyAlgorithms(graph, 0);

}

