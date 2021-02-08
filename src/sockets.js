const url = process.env.VUE_APP_WEBSOCKETS_ADDRESS;

export default {
    connect: function () {
        return new Promise(function (resolve, reject) {
            var socket = new WebSocket(url);
            socket.onopen = function () {
                resolve(socket);
            }
            socket.onerror = function (err) {
                reject(err);
            }
        })
    }
}