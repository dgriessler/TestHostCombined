const playButton = document.querySelector("#button-play");
const stopButton = document.querySelector("#button-stop");

/**
 * Listen for when the play button is pressed and play/pause the music and change the play/pause image
 */
playButton.addEventListener("click", event => {
    // plays the music if paused and pauses it if played
    AlphaTabRunner.api.playPause();

    // If the play picture, then change to pause picture and vice versa
    if (event.target.src.endsWith("img/Play.png")) {
        event.target.src = "img/Pause.png";
    } else {
        event.target.src = "img/Play.png";
    }

});

/**
 * Listen for when the stop button is pressed and stop the music and change to a play image for the other button
 */
stopButton.addEventListener("click", event => {
    AlphaTabRunner.api.stop();
    document.querySelector("#button-play-img").src = "img/Play.png";
});