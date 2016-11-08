var trackedItems = [];

$(document).ready(function () {
    
    //Check if index is already in use
    var localStorageSet = checkLocalStorage("tracked");
    
    if (localStorageSet) {
        
        trackedItems = extractTrackedItems("tracked");
        
        for (i = 0; i < trackedItems.length; i++) {
            var payload = trackedItems[i].split(":");
            
            var task = addTask(payload[1],payload[0]);
            

            $("#tracking").prepend(task);
        }
    }
    $('#add').click(function (e) {
        e.preventDefault();
        
        //capture time of click
        var currentTime = Math.floor(Date.now() / 1000);
        var taskName = $("#entry").val().trim();
        trackedItems.push(taskName + ":" + currentTime);
        
        var taskHolder = addTask(currentTime,taskName);

        $("#tracking").prepend(taskHolder);
        $("#entry").val("");
        
        localStorage.setItem("tracked", trackedItems);
    });
    $("#clear").click(function () {
        localStorage.clear();
        $("#tracking").html("");
        trackedItems = [];
    });
    initTimer();
});


/***Functions***/
function padZero(number)
{
    number = number.toString();
    if(number.length == 1)
    {
        return "0" +  number;
    }
    else
    {
        return number;
    }
}
function storageAvailable(type) {
    try {
        var storage = window[type]
            , x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}

function checkLocalStorage(itemName)
/*Checks localstorage to see if data already exists*/
{
    if (localStorage.getItem(itemName)) {
        return true;
    }
    else {
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
        //Stop loop if no timer exist
        $('p').each(function () {
            appendTime(this, $(this).attr("startTime"));

        });
    }, 1000);
}

function appendTime(htmlTag, startTime) {

    var secondsElapsed = Math.floor(calculateTimeDifference(startTime, Date.now() / 1000));
    var humanReadableTimeElapsed = ""
    var time = [0,0,0,0,0,0]; // Y:M:W:D:H:S

    time[5] = padZero(secondsElapsed % 60);
    time[4] = padZero(Math.floor(secondsElapsed % (60 * 60) / 60 ));
    time[3] = padZero(Math.floor(secondsElapsed / (60 * 60)));
    time[2] = padZero(Math.floor(time[3] / (60 * 60 * 24)));
    
    humanReadableTimeElapsed = time[0] + ":" + time[1] + ":" + time[2] + ":" + time[3] + ":" + time[4] + ":" + time[5];
    
    htmlTag.lastChild.innerHTML =  humanReadableTimeElapsed;
}

function addTask(currentTime,taskName) {
    //New item HTML
    var taskHolder = document.createElement("p");
    taskHolder.setAttribute("class", "taskHolder");
    taskHolder.setAttribute("startTime", currentTime);
    
    var close = document.createElement("i");
    close.setAttribute("class", "close");
    close.innerHTML = '\u2A2F';
    
    var trackerName = document.createElement("span");
    trackerName.setAttribute("class", "trackerName");
    trackerName.innerHTML = taskName;
    
    var timeElapsed = document.createElement("span");
    timeElapsed.setAttribute("class", "timeElapsed");
    
    taskHolder.appendChild(close);
    taskHolder.appendChild(trackerName);
    taskHolder.appendChild(timeElapsed);
    
    return taskHolder;
}
