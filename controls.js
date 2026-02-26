class Controls {
        constructor(type) {
                this.forward = false
                this.left = false
                this.right = false
                this.reverse = false

                switch (type) {
                        case 'KEYS': 
                                this.#addKeyboardListener()
                                break
                        case 'DUMMY': 
                                this.forward = true
                                break
                }
        }

        #addKeyboardListener() {
                document.onkeydown = (event) => {
                        switch (event.key) {
                                case 'ArrowUp':
                                        this.forward = true
                                        break
                                case 'w':
                                        this.forward = true
                                        break
                                case 'ArrowLeft':
                                        this.left = true
                                        break
                                case 'a':
                                        this.left = true
                                        break
                                case 'ArrowRight':
                                        this.right = true
                                        break
                                case 'd':
                                        this.right = true
                                        break
                                case 'ArrowDown':
                                        this.reverse = true
                                        break
                                case 's':
                                        this.reverse = true
                                        break
                        }
                        // console.table(this)
                }
                
                document.onkeyup = (event) => {
                        switch (event.key) {
                                case 'ArrowUp':
                                        this.forward = false
                                        break
                                case 'w':
                                        this.forward = false
                                        break
                                case 'ArrowLeft':
                                        this.left = false
                                        break
                                case 'a':
                                        this.left = false
                                        break
                                case 'ArrowRight':
                                        this.right = false
                                        break
                                case 'd':
                                        this.right = false
                                        break
                                case 'ArrowDown':
                                        this.reverse = false
                                        break
                                case 's':
                                        this.reverse = false
                                        break
                        }
                        // console.table(this)
                }

        }
}