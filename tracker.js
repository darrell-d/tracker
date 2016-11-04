var trackedItems = [];
$(document).ready(function () {
    //Check if index is already in use
    var localStorageSet = checkLocalStorage("tracked");
    if (localStorageSet) {
        trackedItems = extractTrackedItems("tracked");
        for (i = 0; i < trackedItems.length; i++) {
            var pTag = document.createElement("p");
            var taskName = document.createElement("span");
            var payload = trackedItems[i].split(":");
            taskName.innerHTML = payload[0];
            pTag.appendChild(taskName);
            pTag.setAttribute("startTime", payload[1]);
            $("#tracking").prepend(pTag);
        }
    }
    $('#add').click(function (e) {
        e.preventDefault();
        var pTag = document.createElement("p");
        var currentTime = Math.floor(Date.now() / 1000);
        var taskName = document.createElement("span");
        taskName.innerHTML = $("#entry").val();
        pTag.appendChild(taskName);
        trackedItems.push($("#entry").val() + ":" + currentTime);
        pTag.setAttribute("startTime", currentTime);
        pTag = appendTime(pTag, currentTime);
        $("#tracking").prepend(pTag);
        $("#entry").val("")
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
            appendTime(this, $(this).attr("startTime"))
        });
    }, 1000);
}

function appendTime(pTag, currentTime) {
    var taskTimer = document.createElement("span");
    taskTimer.innerHTML = Math.floor((Date.now() / 1000) - currentTime);
    if (pTag.childElementCount > 1) {
        pTag.removeChild(pTag.lastChild)
        pTag.appendChild(taskTimer);
    }
    else {
        pTag.appendChild(taskTimer);
    }
    return pTag;
}