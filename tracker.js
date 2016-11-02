var trackedItems = [];
$(document).ready(function () {
    //Check if index is already in use
    var localStorageSet = checkLocalStorage("tracked");
    if (localStorageSet) {
        trackedItems = extractTrackedItems("tracked");
        for (i = 0; i < trackedItems.length; i++) {
            var pTag = document.createElement("p");
            var payload = trackedItems[i].split(":");
            pTag.innerHTML = payload[0];
            pTag.setAttribute("startTime", payload[1]);
            $("#tracking").prepend(pTag);
        }
    }
    $('#add').click(function (e) {
        e.preventDefault();
        var pTag = document.createElement("p");
        var currentTime = Math.floor(Date.now() / 1000);
        pTag.innerHTML = $("#entry").val();
        trackedItems.push($("#entry").val());
        pTag.setAttribute("startTime", currentTime);
        $("#tracking").prepend(pTag);
        $("#entry").val("")
        localStorage.setItem("tracked", trackedItems + ":" + currentTime);
    });
    $("#clear").click(function () {
        localStorage.clear();
        $("#tracking").html("");
        trackedItems = [];
    });
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