var trackedItems = [];

$(document).ready(function () {

    localStorageSetup();
    initTimer();

    $('#add').click(function (e) {
        e.preventDefault();

        //capture time of click
        var currentTime = Math.floor(Date.now() / 1000);
        var taskName = $("#entry").val().trim();
        trackedItems.push(taskName + ":" + currentTime);

        var taskHolder = addTask(currentTime, taskName);

        $("#tracking").prepend(taskHolder);
        $("#entry").val("");

        localStorage.setItem("tracked", trackedItems);
    });
    $("#clear").click(function () {
        localStorage.clear();
        $("#tracking").html("");
        trackedItems = [];
    });

});


/***Functions***/
function padZero(number) {
    number = number.toString();
    if (number.length == 1) {
        return "0" + number;
    } else {
        return number;
    }
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

function checkLocalStorage(itemName)
/*Checks localstorage to see if data already exists*/
{
    if (localStorage.getItem(itemName)) {
        return true;
    } else {
        return false;
    }
}

function extractTrackedItems(itemName) {
    var rawList = localStorage.getItem(itemName);
    return rawList.split(",")
}

function calculateTimeDifference(startTime, currentTime) {
    return currentTime - startTime;

}

function initTimer() {
    var intervalID = setInterval(function () {
        $('p').each(function () {
            appendTime(this, $(this).attr("startTime"));

        });
    }, 1000);
}

function appendTime(htmlTag, startTime) {

    var secondsElapsed = Math.floor(calculateTimeDifference(startTime, Date.now() / 1000));
    var humanReadableTimeElapsed = ""

    var time = {
        years: "00",
        months: "00",
        weeks: "00",
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    };

    time.seconds = padZero(secondsElapsed % 60);

    time.minutes = padZero(Math.floor(secondsElapsed % (60 * 60) / 60));

    time.hours = padZero(Math.floor(secondsElapsed / (60 * 60) % 24));

    time.days = padZero(Math.floor(secondsElapsed / (60 * 60 * 24) % 7));

    time.weeks = padZero(Math.floor(secondsElapsed / (60 * 60 * 24 * 7) % 4));

    time.months = padZero(Math.floor(secondsElapsed / (60 * 60 * 24 * 7 * 4) % 12));

    time.years = padZero(Math.floor(secondsElapsed / (60 * 60 * 24 * 365)));


    humanReadableTimeElapsed = time.years + ":" + time.months + ":" + time.weeks + ":" + time.days + ":" + time.hours + ":" + time.minutes + ":" + time.seconds;

    htmlTag.lastChild.innerHTML = humanReadableTimeElapsed;
}

function addTask(currentTime, taskName) {
    //New item HTML
    var taskHolder = document.createElement("p");
    taskHolder.setAttribute("class", "taskHolder");
    taskHolder.setAttribute("startTime", currentTime);

    var close = document.createElement("i");
    close.setAttribute("class", "fa fa-times-circle close");
    close.setAttribute("aria-hidden", "true");

    var options = document.createElement("i");
    options.setAttribute("class", "fa fa-bars options");
    options.setAttribute("aria-hidden", "true");

    var trackerName = document.createElement("span");
    trackerName.setAttribute("class", "trackerName");
    trackerName.innerHTML = taskName;

    var timeElapsed = document.createElement("span");
    timeElapsed.setAttribute("class", "timeElapsed");

    taskHolder.appendChild(close);
    taskHolder.appendChild(options);
    taskHolder.appendChild(trackerName);
    taskHolder.appendChild(timeElapsed);

    return taskHolder;
}

function localStorageSetup() {
    //Check if index is already in use
    var localStorageSet = checkLocalStorage("tracked");

    if (localStorageSet) {

        trackedItems = extractTrackedItems("tracked");

        for (i = 0; i < trackedItems.length; i++) {
            var payload = trackedItems[i].split(":");

            var task = addTask(payload[1], payload[0]);


            $("#tracking").prepend(task);
        }
    }
}