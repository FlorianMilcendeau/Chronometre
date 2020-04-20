var feature = {
	
	display: {
		//Choose theme light or dark
		theme: function  () {
			const toggleSwitchTheme = document.querySelector('.theme-switch input[type="checkbox"]')
		
			function switchTheme(e) {
		    	if (e.target.checked) {
		        document.documentElement.setAttribute('data-theme', 'dark')
		    	}
		    	else {
		    	    document.documentElement.setAttribute('data-theme', 'light')
		    	}    
			}
			toggleSwitchTheme.addEventListener('change', switchTheme, false)
			},
		//Show or hide milliseconds 
		showMilli: function () {
			const toggleSwitchMilli = document.querySelector(".milli-switch input[type=checkbox]")

			function switchMilli(e) {
				if (e.target.checked) {
					milliseconds.style.display = "initial"
				}else{
					milliseconds.style.display = "none"
				}
			}

			toggleSwitchMilli.addEventListener("change", switchMilli)
		} 

		
	},

	timer: {
		stopAndStart: function () {
			//Initialised start and difference.
			localStorage.start = localStorage.start ? localStorage.start : Date.now()
			localStorage.diff  = localStorage.diff  ? localStorage.diff  : 0
			
			if (launch) {
				//In progress
				tick()
				clearInterval(interval)
				interval = setInterval(tick, 1)
				launch = false
			}else {
				//Stop
				arrest = Date.now()
				launch = true
				clearInterval(interval)
			}
		
		},
		reset: function () {
			clearInterval(interval)
			localStorage.diff  = 0
			localStorage.start = Date.now()
			interval = setInterval(tick, 1)
			tick()
		}
	}
}

const timer  = document.getElementById("timer"),
	  second = document.getElementById("seconds"),
	  minute = document.getElementById("minute"),
	  milliseconds = document.getElementById("milliseconds") 
		
let interval, launch = false, arrest = 0
		
const tick = () => {
	localStorage.diff = arrest ? (parseInt(Date.now(), 10) - parseInt(arrest, 10)) + parseInt(localStorage.diff, 10) : localStorage.diff

	arrest = 0
	const currentTime = Date.now() - (parseInt(localStorage.start, 10) + parseInt(localStorage.diff, 10))
	minute.textContent = String(Math.trunc(currentTime / 60000) % 60).padStart(2, '0')
	second.textContent = String(Math.trunc(currentTime / 1000) % 60).padStart(2, '0')
	milliseconds.textContent = "." + String(Math.trunc(currentTime) % 1000).padStart(2, '0').slice(0, 2)
}

if (localStorage.start) {
	interval = setInterval(tick, 1)
	tick()
}

/*Stopwatch event-------------------------------------*/
timer.addEventListener("click", feature.timer.stopAndStart)

/*Reset-----------------------------------------------*/
timer.addEventListener("dblclick", feature.timer.reset)

/*color scheme----------------------------------------*/
feature.display.theme()

/*display milliseconds--------------------------------*/
feature.display.showMilli()