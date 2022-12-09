import * as storage from "./storage";
import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("iframe");
const player = new Player(iframe);
const KEY = "videoplayer-current-time";

try {
    const actualMovieTime = storage.load(KEY);
    player.setCurrentTime(JSON.parse(actualMovieTime));
}
catch (error) {
    console.log("Something goes wrong...", error);
    console.log("Can't load actual time...");
}

player.on("timeupdate", throttle(() => {

    player.getCurrentTime().then((seconds) => {
        console.log(seconds);

        storage.save(KEY, seconds);

    }).catch(function (error) {
        console.log("Something goes wrong...", error.name)
    });

    player.getEnded().then((ended) => {
        if (ended) {
            storage.save(KEY, 0);
            console.log("end...")
        }
    });

}, 1000));