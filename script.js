const timer  = document.getElementById("timer"),
	  second = document.getElementById("seconds"),
	  minute = document.getElementById("minute")
		
let interval, launch = false, arrest = 0
		
const tick = () => {	
	if (arrest !== 0) {
		localStorage.diff = (parseInt(Date.now(), 10) - parseInt(arrest, 10)) + parseInt(localStorage.diff, 10)
	}
	arrest = 0
	const currentTime = Date.now() - (parseInt(localStorage.start, 10) + parseInt(localStorage.diff, 10))
	minute.textContent = Math.trunc(currentTime / 60000) % 60
	second.textContent = Math.trunc(currentTime / 1000) % 60
}

/*Stopwatch event------------------------------------*/
timer.addEventListener("click", function() {
	//Initialised start and difference.
	if (localStorage.start === undefined) {
		localStorage.start = Date.now()
	}else if (localStorage.diff === undefined) {
		localStorage.diff = 0
	}
			
	if (launch) {
		//In progress
		tick()
		clearInterval(interval)
		interval = setInterval(tick, 1000)
		launch = false
	}else {
		//Stop
		clearInterval(interval)
		arrest = Date.now()
		launch = true
	}
})

/*Reset-----------------------------------------------*/
timer.addEventListener("dblclick", () => {
	localStorage.diff = 0
	localStorage.start = Date.now()
	interval = setInterval(tick, 1000)
	tick()
})

if (localStorage.start) {
	interval = setInterval(tick, 1000)
	tick()
}