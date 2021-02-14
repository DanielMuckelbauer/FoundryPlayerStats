import { statsCollectorUrl } from "../data/endpoints.js";

export class PlayerstatsClient {
    globalsProvider;

    constructor(globalsProvider) {
        this.globalsProvider = globalsProvider;
    }

    sendPlayerstats(playerstats) {
        var requestOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerstats)
        };

        fetch(`${statsCollectorUrl}/api/playerstatistics/`, requestOptions)
            .then(response => {
                console.log('response', response.json());
            })
            .catch(error => console.log('error', error));
    }
}