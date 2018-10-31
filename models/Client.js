const Client = function (socket, { name, img }) {
    this.name = name;
    this.img = img;
    this.id = socket.id;
    this.state = 'searching';
    this.clientSocket = socket;

    this.setState = newState => {
        this.state = newState;
    }
};

module.exports = Client;