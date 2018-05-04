var ws = require("nodejs-websocket")

var PORT = 3028

var clientCount = 0

var server = ws.createServer(function (conn) {
    console.log("A new connection")
    clientCount++
    conn.nickname = "user" + clientCount
    
    broadcast(conn.nickname + "comes in")

    conn.on("text",function(str){
    	broadcast(conn.nickname + ":" + str)
    })
    conn.on("close",function(code,reason){
        broadcast(conn.nickname + "comes out")
    })
}).listen(PORT)

function broadcast(str){
	server.connections.forEach(function(connection){
		connection.sendText(str)
	})
}