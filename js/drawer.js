class Drawer {
    constructor(topLine, distanceBetweenLines, trebleOrBass) {
        this.topLine = topLine;
        this.distanceBetweenLines = distanceBetweenLines;
        this.firstLine = this.topLine + this.distanceBetweenLines*5;
        this.lowerLimit = 61;
        this.upperLimit = 81;
        this.lowerLimit2 = 40;
        this.upperLimit2 = 60;
        this.note = new Note(60);
        this.belowOrAbove = 0;
        this.noteHeight = 0;
        this.updateNote(this.note.midiVal);
    };

    updateNote(note) {
        this.note.updateNote(note);
        this.getHeightOfNote();
        this.getExtraFeatures();
    }

    getHeightOfNote() {
        let heightMod = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
        let octaveMod = this.note.octave - 4;
        let value = heightMod[this.note.midiVal % heightMod.length];
        let totalMod = value + octaveMod * 7;
        this.noteHeight = this.firstLine - totalMod * this.distanceBetweenLines / 2;
        //this.noteHeight = this.firstLine;
    };

    getExtraFeatures() {
        let aboveBelowMod = [1,1,1,2,2,2,2,3,3,3,4,4,4,4];

        let base = 0;
        if (this.note.midiVal >= this.upperLimit) {
            base = this.upperLimit;
        } else if (this.note.midiVal <= this.lowerLimit) {
            base = -1 *this.lowerLimit;
        }

        if (base !== 0) {
            let difference = Math.abs(Math.abs(base) - this.note.midiVal);
            let loopAdd = 4 * Math.floor(difference / aboveBelowMod.length);
            let modAmount = difference % aboveBelowMod.length;
            modAmount = aboveBelowMod[modAmount];
            this.belowOrAbove = loopAdd + modAmount;
            if (base < 0) {
                this.belowOrAbove *= -1;
            }
        } else {
            this.belowOrAbove = 0;
        }
    }
}

class Note {
    constructor(midiVal) {
        this.updateNote(midiVal);
    }

    updateNote(note) {
        if (this.midiVal && note === this.midiVal) {
            return;
        }
        this.midiVal = note;
        const noteText = this.numToNote();
        this.charPart = noteText.charPart;
        this.octave = noteText.octave;
        this.isSharp = this.charPart.length === 2;
    }

    getOctave() {
        return Math.floor(this.midiVal / 12) - 1;
    };

    numToNote() {
        let letters = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        let charPart = letters[this.midiVal % letters.length];
        let octave = this.getOctave(this.midiVal);
        return {charPart, octave};
    };
}


