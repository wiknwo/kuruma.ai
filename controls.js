class Controls {
    constructor() {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
        this.#addKeyBoardListeners();
    }

    #addKeyBoardListeners() {
        // Private methods in JS are preceded by the '#' symbol
        document.onkeydown = (event) => {
            // Arrow function makes the this keyword refer
            // to the scope of the Controls class instead 
            // of referring to the scope of the function which
            // defines it.
            switch(event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        }

        document.onkeyup = (event) => {
            switch(event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
        }
    }
}