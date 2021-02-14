import { statsCollectorUrl } from "../data/endpoints.js";

export class GameClient {
    globalsProvider;

    constructor(globalsProvider) {
        this.globalsProvider = globalsProvider;
    }

    postCreateGame() {
        const  requestOptions = { method: 'POST' };
        const gameId = this.globalsProvider.gameId;
        fetch(`${statsCollectorUrl}/api/games/${gameId}`, requestOptions)
            .then(response => {
                console.log('response', response.json());
            })
            .catch(error => console.log('error', error));
    }
}