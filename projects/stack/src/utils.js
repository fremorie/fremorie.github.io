// @flow

class Stack {
    constructor() {
        this.count = 0;
        this.storage = {};
    }

    push(value) {
        this.storage[this.count] = value;
        this.count++;
    }

    pop() {
        if (this.count === 0) {
            return;
        }

        this.count--;
        const result = this.storage[this.count];
        delete this.storage[this.count];
        return result;
    }

    get size() {
        return this.count;
    }

    get peek() {
        return this.storage[this.count-1];
    }
}

export default Stack;
