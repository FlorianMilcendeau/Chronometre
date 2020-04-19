var feature = {
	//Choose theme light or dark
	theme : function  () {
		const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

		function switchTheme(e) {
    		if (e.target.checked) {
        	document.documentElement.setAttribute('data-theme', 'dark');
    		}
    		else {
    		    document.documentElement.setAttribute('data-theme', 'light');
    		}    
		}
		toggleSwitch.addEventListener('change', switchTheme, false);
	},

	timer: {
		stopAndStart: function () {
			timer.addEventListener("click", function() {
				//Initialised start and difference.
				localStorage.start = localStorage.start ? localStorage.start : Date.now()
				localStorage.diff  = localStorage.diff  ? localStorage.diff  : 0
			
				if (launch) {
					//In progress
					tick()
					clearInterval(interval)
					interval = setInterval(tick, 1000)
					launch = false
				}else {
					//Stop
					arrest = Date.now()
					launch = true
				clearInterval(interval)
				}
			})
		},
		reset: function () {
			timer.addEventListener("dblclick", () => {
			clearInterval(interval)
			localStorage.diff  = 0
			localStorage.start = Date.now()
			interval = setInterval(tick, 1000)
			tick()
			})
		}
	}
}

const timer  = document.getElementById("timer"),
	  second = document.getElementById("seconds"),
	  minute = document.getElementById("minute")
		
let interval, launch = false, arrest = 0
		
const tick = () => {
	localStorage.diff = arrest ? (parseInt(Date.now(), 10) - parseInt(arrest, 10)) + parseInt(localStorage.diff, 10) : localStorage.diff

	arrest = 0
	const currentTime = Date.now() - (parseInt(localStorage.start, 10) + parseInt(localStorage.diff, 10))
	minute.textContent = Math.trunc(currentTime / 60000) % 60
	second.textContent = Math.trunc(currentTime / 1000) % 60
}

if (localStorage.start) {
	interval = setInterval(tick, 1000)
	tick()
}

/*Stopwatch event------------------------------------*/
feature.timer.stopAndStart()

/*Reset-----------------------------------------------*/
feature.timer.reset()

/*color scheme----------------------------------------*/
feature.theme()