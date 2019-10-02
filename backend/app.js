const server = require('http').createServer();

const io = require('socket.io')(server, {
    path: '/peerster-list',
    serveClient: false
});

server.listen(8080);

nodes_map = {};
id = 0;
nodes_array = [];

io.on('connection', (socket) =>
    {
        socket.emit("node-number", id);
        id++;

        socket.on('get-list', () => {
            socket.emit('list', nodes_array);
        });
        socket.on("delete", (i) => {
            if(i >= 0){
                delete nodes_map[i];
                nodes_array = Array.from(Object.values(nodes_map));
                io.emit('list', nodes_array);
            }
        });
        socket.on("report", (i) => {
            console.log(i);
            if(i in nodes_map){
                nodes_map[i].reports++;
                if(nodes_map[i].reports >= 5){
                    delete nodes_map[i];
                }

                nodes_array = Array.from(Object.values(nodes_map));
                io.emit('list', nodes_array);
            }
        });
        socket.on("add", ([obj, nodeId]) =>{
            if('ipAndPort' in obj && 'version' in obj){
                obj['reports'] = 0;
                obj['id'] = nodeId;
                nodes_map[nodeId] = obj;
                nodes_array = Array.from(Object.values(nodes_map));
                io.emit('list', nodes_array);
            }
        });
    }
);