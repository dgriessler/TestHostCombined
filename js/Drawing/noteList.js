const MAX_SIZE = 3;

class NoteList {
    constructor (element) {
        this.elements = [element];
        this.pointer = 0;
        this.total = element;
        this.average = element;
        this.lowerPitchBound = 21;
        this.upperPitchBound = 127;
    }

    addNote(element) {

        if (this.elements.length < MAX_SIZE) {
            this.elements.push(element);
        } else {
            this.total -= this.elements[this.pointer];
            this.elements[this.pointer] = element;
            this.pointer = (this.pointer + 1) % MAX_SIZE;
        }
        this.total += element;
        this.average = Math.floor(this.total / this.elements.length);

        if (element === 0 || this.average < this.lowerPitchBound || this.average > this.upperPitchBound) {
            this.average = -1;
        }
    }

    updateBounds(lowerBound, upperBound) {
        this.lowerPitchBound = lowerBound;
        this.upperPitchBound = upperBound;
    }
}