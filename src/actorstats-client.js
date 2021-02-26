import { statsCollectorUrl } from "../data/endpoints.js";

export class ActorstatsClient {
    globalsProvider;

    constructor(globalsProvider) {
        this.globalsProvider = globalsProvider;
    }

    sendActorStats(actorstats) {
        var requestOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actorstats)
        };

        fetch(`${statsCollectorUrl}/api/playerstatistics/`, requestOptions)
            .then(response => {
                console.log('response', response.json());
            })
            .catch(error => console.log('error', error));
    }
}