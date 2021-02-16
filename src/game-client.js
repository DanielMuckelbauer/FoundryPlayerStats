import { statsCollectorUrl } from "../data/endpoints.js";

export class GameClient {
    globalsProvider;

    constructor(globalsProvider) {
        this.globalsProvider = globalsProvider;
    }

    postCreateGame() {
        const requestOptions = { method: 'POST' };
        const gameName = this.globalsProvider.gameName;
        fetch(`${statsCollectorUrl}/api/games/${gameName}`, requestOptions)
            .then(response => {
                console.log('response', response.json());
            })
            .catch(error => console.log('error', error));
    }
}