if (typeof feature === "undefined") {
	var feature = {
		display: {
			//Choose theme light or dark
			theme: () => {
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
			showMilli: () => {
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
			tick : () => {
				localStorage.diff = arrest ? (parseInt(Date.now(), 10) - parseInt(arrest, 10)) + parseInt(localStorage.diff, 10) : localStorage.diff

				arrest = 0
				const currentTime = Date.now() - (parseInt(localStorage.start, 10) + parseInt(localStorage.diff, 10))
				hour.textContent = new String(Math.trunc(currentTime / 3600000)).padStart(2, "0")
				minute.textContent = String(Math.trunc(currentTime / 60000) % 60).padStart(2, "0")
				second.textContent = String(Math.trunc(currentTime / 1000) % 60).padStart(2, "0")
				milliseconds.textContent = "." + String(Math.trunc(currentTime) % 1000).padStart(2, "0").slice(0, 2)
			},
			stopAndStart: () => {
				if (localStorage.start == 1) {
					localStorage.start = Date.now()
				}
				//Initialised start and difference.
				localStorage.start = localStorage.start ? localStorage.start : Date.now()
				localStorage.diff  = localStorage.diff  ? localStorage.diff  : 0
				
				if (launch) {
					//In progress
					feature.timer.tick()
					clearInterval(interval)
					interval = setInterval(feature.timer.tick, 1)
					launch = false
				}else {
					//Stop
					arrest = Date.now()
					launch = true
					clearInterval(interval)
				}
			
			},
			reset: () => {
				clearInterval(interval)
				localStorage.diff  = 0
				localStorage.start = Date.now()
				feature.timer.tick()
				localStorage.start = 1
				launch = true
			}
		}
	}
}else {
	alert("Feature already exist.")
}
	

const timer  	   = document.getElementById("timer"),
	  hour   	   = document.getElementById("hour"),
	  minute 	   = document.getElementById("minute"),
	  second 	   = document.getElementById("seconds"),
	  milliseconds = document.getElementById("milliseconds") 
		
let interval, launch = false, arrest = 0

if (localStorage.start) {
	interval = setInterval(feature.timer.tick, 1)
	feature.timer.tick()
}

/*Stopwatch event-------------------------------------*/
timer.addEventListener("click", feature.timer.stopAndStart)

/*Reset-----------------------------------------------*/
timer.addEventListener("dblclick", feature.timer.reset)

/*color scheme----------------------------------------*/
feature.display.theme()

/*display milliseconds--------------------------------*/
feature.display.showMilli()