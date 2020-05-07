if (typeof feature === "undefined") {
	var feature = {
		initialize: () => {
			//if the start variable does not exist or she is from 0, we initialize from date.now ().
			if (localStorage.getItem("start") === null || localStorage.getItem("start") == 0) {
				localStorage.setItem("start", Date.now())
			}

			//if the launch variable does not exist, we initialize from true.
			if (localStorage.getItem("launch") == null) {
				localStorage.setItem("launch", true)
			}

			//if the timeOut variable don't exist we initialize from 0.
			if (localStorage.getItem("timeOut") === null) {
				localStorage.setItem("timeOut", Date.now())
			}
		},

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
			},
			//In this function I create elements neccesary to add the time captured in our table
			captureTime: () => {
				let table	= document.querySelector("table"),
					tr 		= document.createElement("tr"),
					tdStage = document.createElement("td"),
					tdTime  = document.createElement("td"),
					previousChild = tbody.lastElementChild

				tdStage.textContent = previousChild === null ? tdStage.textContent = 1 : tdStage.textContent = parseInt(previousChild.firstChild.textContent, 10) + 1
				tdTime.textContent  = hour.textContent + "h" + minute.textContent + '"' + second.textContent + milliseconds.textContent

				tr.className = "time"
				tr.appendChild(tdStage)
				tr.appendChild(tdTime)
				tbody.appendChild(tr)
				table.style.display = "table"
			},
			/*In this function, delete the required time and decrement each identifier*/
			deleteTime: (e) => {
				let tr = document.querySelectorAll(".time"),
					nextTime = e.target.parentNode.nextElementSibling
				
				if (nextTime) {
					while (nextTime) {	
						nextTime.firstChild.textContent -= 1
						nextTime = nextTime.nextElementSibling
					}
				}
				tbody.removeChild(e.target.parentNode)
				if (tbody.firstElementChild === null) {
					tbody.parentNode.style.display = "none"
				}
			}
		},

		timer: {
			tick : () => {
				//calulates the difference of the stop.
				localStorage.setItem("diff", localStorage.getItem("timeOut") != 0 ? parseInt(Date.now(), 10) - parseInt(localStorage.getItem("timeOut"), 10) + parseInt(localStorage.getItem("diff"), 10) : localStorage.getItem("diff")) 

				localStorage.setItem("timeOut", 0)
				const currentTime = Date.now() - (parseInt(localStorage.getItem("start"), 10) + parseInt(localStorage.getItem("diff"), 10))
				hour.textContent  = new String(Math.trunc(currentTime / 3600000)).padStart(2, "0")
				minute.textContent = String(Math.trunc(currentTime / 60000) % 60).padStart(2, "0")
				second.textContent = String(Math.trunc(currentTime / 1000) % 60).padStart(2, "0")
				milliseconds.textContent = "." + String(Math.trunc(currentTime) % 1000).padStart(2, "0").slice(0, 2)
			},
			stopAndStart: () => {
				//variable Start initialized if we make reset.
				localStorage.setItem("start",  localStorage.getItem("start") == 0 ? Date.now() : localStorage.getItem("start"))
				
				if (localStorage.getItem("launch") == "true") {
					//In progress
					feature.timer.tick()
					clearInterval(interval)
					interval = setInterval(feature.timer.tick, 1)
					localStorage.setItem("launch", false)
				}else {
					//Stop
					localStorage.setItem("timeOut",  Date.now())
					localStorage.setItem("launch", true)
					clearInterval(interval)
				}
			
			},
			//we set the counters to zero for the difference and start variables and we stop the timer. 
			reset: () => {
				clearInterval(interval)
				localStorage.setItem("diff", 0)
				localStorage.setItem("start", Date.now())
				feature.timer.tick()
				localStorage.setItem("start", 0)
				localStorage.setItem("launch", true)
			}
		}
	}
}else {
	alert("Feature already exist.")
}
	
feature.initialize()

localStorage.setItem("diff", localStorage.getItem("diff")  ? localStorage.getItem("diff")  : 0)

const timer  	   = document.getElementById("timer"),
	  hour   	   = document.getElementById("hour"),
	  minute 	   = document.getElementById("minute"),
	  second 	   = document.getElementById("seconds"),
	  milliseconds = document.getElementById("milliseconds"),
	  sendTime     = document.getElementById("sendTime"),
	  tbody		   = document.getElementsByTagName("tbody")[0]
		
let interval


//if "start"  exists and "launch" is not on paused when the refreshed of the page, the clock continues.
if (localStorage.getItem("start") && localStorage.getItem("launch") == "false") {
	feature.timer.tick()
	interval = setInterval(feature.timer.tick, 1)
}else {
	//i launch the clock and I take timeOut time 
	feature.timer.tick()
	interval = setInterval(feature.timer.tick, 1)
	clearInterval(interval)
	localStorage.setItem("timeOut", Date.now())
}


timer.addEventListener("click", feature.timer.stopAndStart)

timer.addEventListener("dblclick", feature.timer.reset)

feature.display.theme()

feature.display.showMilli()

sendTime.addEventListener("click", feature.display.captureTime)

tbody.addEventListener("click", feature.display.deleteTime)