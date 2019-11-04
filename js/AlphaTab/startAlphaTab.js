// https://docs.alphatab.net/develop/  for development Documentation

// specify what tracks to render on load
let currentTracks = [0,1,2,3,4];
// specify the total number of tracks that could be rendered
let totalTracks = 5;

// set the settings for AlphaTab
// player: specifies the sounds which will be used for playback
// cursor: when set to true, it will draw a cursor
// tracks: sets what tracks to be drawn
// layout: alters the look of the sheet music when rendered
// var settings = {
//     player: 'default.sf2',
//     cursor: true,
//     tracks: currentTracks,
//     layout: 'horizontal',
// };
//
// // runs AlphaTab on the element with the ID "alphaTab" with the settings specified in settings
// const api = new alphaTab.platform.javaScript.AlphaTabApi(document.querySelector('#alphaTab'), settings);

var settings = {
    player: 'default.sf2',
    cursor: true,
    tracks: currentTracks,
    layout: 'horizontal',
};

const api = new window.alphaTab.platform.javaScript.AlphaTabApi(document.querySelector('#alphaTab'), settings);


const utilAPI = new AlphaTabAPIUtility(api, currentTracks, totalTracks);

api.addPlayerStateChanged(function() {
    utilAPI.handlePlayerStateChanged();
});