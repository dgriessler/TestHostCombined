// https://docs.alphatab.net/develop/  for development Documentation

class AlphaTabRunner {

    static initializeAPI() {
        // specify what tracks to render on load
        this.currentTracks = [0, 1, 2, 3, 4];
        // specify the total number of tracks that could be rendered
        this.totalTracks = 5;

        let settings = {
            player: 'default.sf2',
            cursor: true,
            tracks: this.currentTracks,
            layout: 'horizontal',
        };
        this.api = new window.alphaTab.platform.javaScript.AlphaTabApi(document.querySelector('#alphaTab'), settings);
    }
}

AlphaTabRunner.initializeAPI();
utilAPI = new AlphaTabAPIUtility(AlphaTabRunner.api, AlphaTabRunner.currentTracks, AlphaTabRunner.totalTracks);
