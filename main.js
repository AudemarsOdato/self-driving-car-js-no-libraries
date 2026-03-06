const canvas = document.getElementById('canvas')
canvas.width = 200

// const networkCanvas = document.getElementById('network-canvas')
// networkCanvas.width = 300

const ctx = canvas.getContext('2d')
// const networkCtx = networkCanvas.getContext('2d')

const road = new Road(canvas.width / 2, canvas.width * 0.9, 4)
const N = 1000
const mutationRatio = 0.06
const carsMaxSpeed = 8
const carsAcceleration = 0.5
const cars = generateCars(N)
let bestCar = cars[0]
if (localStorage.getItem('bestBrain')) {
        for (let i = 0; i < cars.length; i++) {
                cars[i].brain = JSON.parse(localStorage.getItem('bestBrain'))
                if (i != 0) {
                        NeuralNetwork.mutate(cars[i].brain, mutationRatio)
                }
        }
}
const traffic = generateTraffic(50, 'random')

animate()

function save() {
        localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain))
}

function discard() {
        localStorage.removeItem('bestBrain')
}

function generateTraffic(waves, style) {
        let traffic = []
        const startingPosition = -100
        const spaceBetweenWaves = 200
        for (let i = 0; i < waves; i++) {
                switch (style) {
                        case 'inOut':
                                if (i % 2 == 0) {
                                        traffic.push(new Car(road.getlaneCenter(0), startingPosition - spaceBetweenWaves * i, 30, 50, 'DUMMY'))
                                        traffic.push(new Car(road.getlaneCenter(2), startingPosition - spaceBetweenWaves * i, 30, 50, 'DUMMY'))
                                }
                                else {
                                        traffic.push(new Car(road.getlaneCenter(1), startingPosition - spaceBetweenWaves * i, 30, 50, 'DUMMY'))
                                }
                                break
                        case 'zigzag':
                                traffic.push(new Car(road.getlaneCenter(1), startingPosition - spaceBetweenWaves * i, 30, 50, 'DUMMY'))
                                traffic.push(new Car(road.getlaneCenter(i % 2 == 1 ? 2 : 0), startingPosition - spaceBetweenWaves * i, 30, 50, 'DUMMY'))
                                break
                        case 'random':
                                traffic.push(new Car(road.getlaneCenter(Math.floor(Math.random() * (Math.floor(road.laneCount - 1) - Math.ceil(0) + 1)) + Math.ceil(0)), startingPosition - spaceBetweenWaves * i, 30, 50, 'DUMMY'))
                                break
                }
        }
        return traffic
}

function generateCars(N) {
        const cars = []
        for (let i = 0; i < N; i++) {
                cars.push(new Car(road.getlaneCenter(1), 100, 30, 50, 'AI', carsMaxSpeed, carsAcceleration))
        }
        return cars
}

function animate() {
        for (let i = 0; i < traffic.length; i++) {
                traffic[i].update(road.borders, [])
        }

        for (let i = 0; i < cars.length; i++) {
                cars[i].update(road.borders, traffic)
        }

        bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y)))

        canvas.height = window.innerHeight
        // networkCanvas.height = window.innerHeight
        
        ctx.save()
        ctx.translate(0, -bestCar.y + canvas.height * 0.7)
        road.draw(ctx)
        for (let i = 0; i < traffic.length; i++) {
                // console.log(bestCar.y, traffic[i].y)
                // if (canvas.height * 0.7 + bestCar.y < traffic[i].y) {
                // }
                traffic[i].draw(ctx, 'orange')
        }
        ctx.globalAlpha = 0.2
        for (let i = 0; i < cars.length; i++) {
                cars[i].draw(ctx, 'blue')
        }
        ctx.globalAlpha = 1
        bestCar.draw(ctx, 'blue')
        ctx.restore()
        // Visualizer.drawNetwork(networkCtx, car.brain)
        requestAnimationFrame(animate)
}