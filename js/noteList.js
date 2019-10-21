const MAX_SIZE = 5;
const MINIMUM_MIDI_VALUE = 20;

class NoteList {
    constructor (element) {
        this.elements = [element];
        this.pointer = 0;
        this.total = element;
        this.average = element;
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
        if (this.average < MINIMUM_MIDI_VALUE) {
            this.average = -1;
        }
        if (this.average < 48 && this.average > 0) {
            console.log(this.elements);
        }
    }
}