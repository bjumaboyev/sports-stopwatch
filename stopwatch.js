document.addEventListener("DOMContentLoaded", () => {
    let start_stopwatch = false;
    const start_button = document.getElementById("start_button");
    const reset_button = document.getElementById("reset_button");
    const lap_button = document.getElementById("lap_button");
    const lap_times = document.getElementById("lap_times");
    const millisecondSpan = document.getElementById("milli_seconds");
    const secondSpan = document.getElementById("seconds");
    const minuteSpan = document.getElementById("minutes");
    const title = document.getElementById("title");
    let intervalId;
    let milliseconds = 0;
    let start;
    let stopmilli = 0;

    function loadStoredValues () {
        if (localStorage.getItem("milliseconds")) {
            millisecondSpan.textContent = localStorage.getItem("milliseconds");
        };
        if (localStorage.getItem("seconds")) {
            secondSpan.textContent = localStorage.getItem("seconds");
        };
        if (localStorage.getItem("minutes")) {
            minuteSpan.textContent = localStorage.getItem("minutes");
        };
        if (localStorage.getItem("laps")) {
            lap_times.innerHTML = localStorage.getItem("laps");
        };
        if (localStorage.getItem("title")) {
            title.innerHTML = localStorage.getItem("title");
        };
        if (parseInt(localStorage.getItem("stopmilli"))) {
            stopmilli = parseInt(localStorage.getItem("stopmilli"));
        };
        milliseconds = stopmilli;
        start_stopwatch = localStorage.getItem("start") === 'true';
        if (start_stopwatch) {
            start_button.click();
            start_button.click();
        };
    };

    function storeValues () {
        localStorage.setItem("milliseconds", millisecondSpan.textContent);
        localStorage.setItem("seconds", secondSpan.textContent);
        localStorage.setItem("minutes", minuteSpan.textContent);
        localStorage.setItem("laps", lap_times.innerHTML);
        localStorage.setItem("start", start_stopwatch);
        localStorage.setItem("title", title.innerHTML);
        localStorage.setItem("stopmilli", milliseconds);
    };

    window.onload = loadStoredValues;

    start_button.addEventListener("click", () => {
        start_stopwatch = !start_stopwatch;
        start = Date.now()
        if (start_stopwatch) {
            intervalId = setInterval(() => {
                milliseconds = stopmilli + Date.now() - start;
                millisecondSpan.textContent = (milliseconds % 1000).toString().padStart(3, '0');
                secondSpan.textContent = (Math.floor(milliseconds / 1000) % 60).toString().padStart(2, '0');
                minuteSpan.textContent = Math.floor(milliseconds / 60000).toString().padStart(2, '0');
                title.innerHTML = "Stopwatch - " + minuteSpan.textContent + ":" + secondSpan.textContent;
                start_button.textContent = "Stop";
                storeValues();
            }, 1);
        } else {
            stopmilli = milliseconds;
            clearInterval(intervalId);
            start_button.textContent = "Start";
            storeValues();
        };
    });

    reset_button.addEventListener("click", () => {
        start_stopwatch = false;
        stopmilli = 0;
        milliseconds = 0;
        clearInterval(intervalId);
        millisecondSpan.textContent = "000";
        secondSpan.textContent = "00";
        minuteSpan.textContent = "00";
        title.innerHTML = "Stopwatch";
        while (lap_times.firstChild) lap_times.removeChild(lap_times.firstChild);
        start_button.textContent = "Start";
        storeValues();
    });

    lap_button.addEventListener("click", () => {
        if (start_stopwatch) {
            let lap_li = document.createElement('li');
            lap_li.style.padding = "2px";
            lap_li.textContent = "Lap " + (lap_times.getElementsByTagName("li").length + 1) + ": " + minuteSpan.textContent + ":" + secondSpan.textContent + ":" + millisecondSpan.textContent;
            lap_times.appendChild(lap_li);
            storeValues();
        };
    });

    document.addEventListener("keyup", function(event) {
        if (event.key.toUpperCase() === 'L') lap_button.click();
        if (event.key.toUpperCase() === 'R') reset_button.click();
        if (event.key === ' ') start_button.click();
    });
});