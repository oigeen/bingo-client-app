const axios = require('axios');
const url = process.env.VUE_APP_BACKEND_ADDRESS;
axios.defaults.baseURL = url;

export default {
    getAllGames: async function () {
        try {
            const response = await axios.get();
            return response.data.result;
        }
        catch (error) {
            console.log(error)
        }
    },

    getGameById: async function (id) {
        try {
            const response = await axios.get('/' + id);
            return response.data.result;
        }
        catch (error) {
            console.log(error)
        }
    },

    getCardById: async function (gameId, playerId) {
        try {
            const response = await axios.get('/' + gameId + '/play/' + playerId)
            return response.data.result;
        }
        catch {
            (error) => console.log(error)
        }
    },

    createGame: async function (name, game, creatorId, customCells) {
        try {
            const response = await axios.post('/createGame', {
                name: name,
                game: game,
                creatorId: creatorId,
                customCells: customCells
            })
            return response.data;
        }
        catch { error => console.log(error) }
    },

    createCard: async function (playerId, gameId) {
        try {
            const response = await axios.post('/createCard', {
                playerId: playerId,
                gameId: gameId
            })
            return response.data;
        }
        catch { error => console.log(error) }
    },
    deleteGame: async function(gameId) {
        try {
            const response = await axios.post('/deleteCard', {
                gameId: gameId
            })
            return response.data;
        }
        catch { error => console.log(error) }
    }
}
