const app = require("express")();
    const http = require("http").Server(app);
   
    app.get("/", function(req, res) {
        res.sendFile(__dirname + "/index.html");
    });
    
    io.on("connection", function(socket) {
        console.log('Nuevo cliente se ha conectado');
        
        socket.on("user_join", function(data) {
            this.username = data;
            socket.broadcast.emit("user_join", data);
        });

        socket.on("chat_message", function(data) {
            data.username = this.username;
            socket.broadcast.emit("chat_message", data);
            console.log( 'message: ' + data.message);
           
        });

        socket.on("disconnect", function(data) {
            socket.broadcast.emit("user_leave", this.username);
        });
    });

        http.listen(3000, () => {
            console.log('listening on *:3000');
        
        }); 
