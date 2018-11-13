const Client = function (socket, { name, img }, state = 'searching') {
    this.name = name;
    this.img = img;
    this.id = socket.id;
    this.state = state;
    this.clientSocket = socket;

    this.setState = newState => {
        this.state = newState;
    }
};

module.exports = Client;