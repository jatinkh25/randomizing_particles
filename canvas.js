const canvas = document.querySelector('canvas')

canvas.height = window.innerHeight
canvas.width = window.innerWidth

const c = canvas.getContext('2d')

const mousePosition = {}
const MAX_RADIUS = 50

//saving the mouse position in 'mousePosition' Object
window.addEventListener('mousemove', (event) => {
	mousePosition.x = event.x
	mousePosition.y = event.y
})

//resizing the canvas size to current window size
window.addEventListener('resize', () => {
	canvas.height = window.innerHeight
	canvas.width = window.innerWidth
})

//color credits - @Amish Ranpariya for Color Picker Website
const colorArray = [
	'#EA728C',
	'#B6D5E1',
	'#DDDDDD',
	'#65799B',
	'#FC9D9D',
	'#EA728C',
	'#E2EFF1',
	'#FC9D9D',
]

class Circle {
	constructor(x, y, dx, dy, radius) {
		this.x = x
		this.y = y
		this.dx = dx
		this.dy = dy
		this.radius = radius
		this.minRadius = radius
		this.color = colorArray[Math.floor(Math.random() * (colorArray.length - 1))]
	}

	//function for drawing the circle on screen
	draw = function () {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.strokeStyle = this.color
		c.stroke()
		c.fillStyle = this.color
		c.fill()
	}

	//function for updating the circle position
	update = function () {
		//reversing the direction if circle goes out of window boundary in x direction
		if (this.x - this.radius < 0 || this.x + this.radius > window.innerWidth) {
			this.dx = -this.dx
		}

		//same for y direction
		if (this.y - this.radius < 0 || this.y + this.radius > window.innerHeight) {
			this.dy = -this.dy
		}

		this.x += this.dx
		this.y += this.dy

		//increasing the radius of the circle if cursor comes in the radius of 45px
		if (
			Math.abs(this.x - mousePosition.x) < 45 &&
			Math.abs(this.y - mousePosition.y) < 45
		) {
			if (this.radius < MAX_RADIUS) this.radius += 3
		} else if (this.radius > this.minRadius) {
			this.radius -= 1
		}

		this.draw()
	}
}
const circleArray = []

for (let i = 0; i < 300; ++i) {
	const radius = Math.floor(Math.random() * 5 + 2)

	//setting random x and y coordinate values
	const x = Math.random() * (innerWidth - radius) + radius
	const y = Math.random() * (innerHeight - radius) + radius

	//setting random velocities in x and y direction
	let dx = (Math.random() * 0.5 - 0.5) * 10
	let dy = (Math.random() * 0.5 - 0.5) * 10

	circleArray.push(new Circle(x, y, dx, dy, radius))
}

function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0, 0, window.innerWidth, window.innerHeight)
	for (let i = 0; i < circleArray.length; ++i) {
		circleArray[i].update()
	}
}

animate()
