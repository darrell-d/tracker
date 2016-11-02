var trackedItems = [];
$(document).ready(function () {
    $('#add').click(function (e) {
        e.preventDefault();
        var pTag = document.createElement("p");
        pTag.innerHTML = $("#entry").val();
        trackedItems.push($("#entry").val());
        pTag.setAttribute("id", Math.floor(Date.now() / 1000));
        $("#tracking").prepend(pTag);
        $("#entry").val("")
        localStorage.setItem("tracked", trackedItems);
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