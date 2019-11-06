// TODO: fix labelling of topLine when tracks are reloaded

class AlphaTabAPIUtility {

    constructor(api, currentTracks, totalTracks) {
        this.api = api;
        this.currentTracks = currentTracks;
        this.totalTracks = totalTracks;
    }

    /**
     * Changes which tracks are being rendered by AlphaTab by checking for checkboxes
     * Called when pressing Submit button after selecting checkboxes for which Tracks to render
     */
    changeTracks() {
        // keeps track of the new Tracks to be rendered
        let newTrackList = [];
        // keeps track of the indexes of the Tracks to update our global currentTracks rendered
        let newTrackIndexes = [];

        for(let i = 1; i < this.totalTracks; i++) {
            // Checkboxes for each Track were given IDs starting at t1
            if (document.getElementById("t" + i).checked) {
                // This pushes the actual Track object into newTrackList to call renderTracks below
                newTrackList.push(this.api.score.tracks[i-1]);

                newTrackIndexes.push(i-1);
            }
        }

        // if we have at least one Track to render, then render them and update the currentTracks variable
        if (newTrackList.length !== 0) {
            this.api.renderTracks(newTrackList);
            this.currentTracks = newTrackIndexes;
        } else {
            // Otherwise, they have unchecked all of the checkboxes and AlphaTab won't render 0 tracks
            // Therefore, we go through and recheck the Track checkboxes that were previously checked and ignore the input
            for (let i = 0; i < this.currentTracks.length; i++) {
                let trackIndex = this.currentTracks[i] + 1;
                document.getElementById("t" + trackIndex).checked = true;
            }
        }
    };
}

