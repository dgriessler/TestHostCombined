// Pitch variables
let crepe;
const voiceLow = 100;
const voiceHigh = 500;
let audioStream;
let canvas;

// Circle variables
let circleSize = 10;
const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Text variables
let textCoordinates;
let canDraw = false;
let canListen = false;
let drawer = undefined;
let midiNum;
const EXTRA_BAR_VARIANCE = 7;
let noteList = new NoteList(0);


var barCursor = document.getElementById("bC");
var alphaTabSurface = document.getElementById("aTS");

function setup() {
    audioContext = getAudioContext();
    mic = new p5.AudioIn();
    mic.start(startPitch);
}

function setupCanvas() {
    if (alphaTabSurface.clientWidth === 0 || alphaTabSurface.clientHeight === 0 || canDraw) {
        return;
    }
    canvas = createCanvas(alphaTabSurface.clientWidth, alphaTabSurface.clientHeight);
    centerCanvas();
    canvas.parent('sketch-holder');
    textCoordinates = [width / 2, 30];
    canDraw = true;
}

api.addPostRenderFinished(function() {
    setupCanvas();
    const topLine = document.getElementById("rect_0");
    const topLineHeight = topLine.y.animVal.value;
    const nextLine = document.getElementById("rect_1");
    const distanceBetweenLines = (nextLine.y.animVal.value - topLineHeight);
    drawer = new Drawer(topLineHeight + distanceBetweenLines/2, distanceBetweenLines);
});

function centerCanvas() {
    var x = 0;
    var y = 100;
    canvas.position(x, y);
}

function startPitch() {
    pitch = ml5.pitchDetection('js/model/', audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
    select('#status').html('Model Loaded');
    pitch.getPitch(getFrequency);
}

getFrequency = function(err, frequency) {
    if (frequency) {
        midiNum = freqToMidi(frequency);
        noteList.addNote(midiNum);
        if (drawer) {
            drawer.updateNote(noteList.average);
        }
    } else {
        noteList.addNote(0);
        if (drawer) {
            drawer.updateNote(noteList.average);
        }
    }
    pitch.getPitch(getFrequency);
};

function draw() {
    if (!canDraw || !canListen) {
        return;
    }
    // sets the background color to grey
    //background(255, 255, 255, 1);
    //background(140);
    background(255);
    // dont draw the outline of the shape, note: you need to turn stroke on to draw lines as we do below.
    noStroke();

    let currentHeight;
    let sharpPos;
    let lineThroughPos;
    if (drawer) {
        currentHeight = drawer.noteHeight;

        // fills with pink
        fill(255, 0, 255);
        // draws ellipse //barCursor.getClientRects()[0].left.valueOf();
        posX = barCursor.getClientRects()[0].left.valueOf() + window.scrollX;
        sharpPos = [posX - 14, currentHeight + 3.5];
        ellipse(posX, currentHeight, circleSize, circleSize);
        if (drawer.note.midiVal < 0) {
            stroke(0);
            line(posX - EXTRA_BAR_VARIANCE, currentHeight + EXTRA_BAR_VARIANCE, posX + EXTRA_BAR_VARIANCE, currentHeight - EXTRA_BAR_VARIANCE);
            line(posX + EXTRA_BAR_VARIANCE, currentHeight + EXTRA_BAR_VARIANCE, posX - EXTRA_BAR_VARIANCE, currentHeight - EXTRA_BAR_VARIANCE);
            noStroke();
        }
        if (drawer.note.isSharp) {
            text("#", sharpPos[0], sharpPos[1]);
        }

        if (drawer.belowOrAbove !== 0) {
            let isIncreasing = drawer.belowOrAbove > 0;
            stroke(0);
            let height = isIncreasing ? drawer.topLine : drawer.firstLine - drawer.distanceBetweenLines;
            for (let i = 0; i < Math.abs(drawer.belowOrAbove); i++) {
                if (isIncreasing) {
                    height -= drawer.distanceBetweenLines;
                } else {
                    height += drawer.distanceBetweenLines;
                }
                line(posX - EXTRA_BAR_VARIANCE, height, posX + EXTRA_BAR_VARIANCE, height);
            }
            noStroke();
        }

        // fills with white
        fill(255);
        // draws text
        text(drawer.note.charPart + " " + drawer.note.octave, posX - 5, height / 2);
    }
}
