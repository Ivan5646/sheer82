// modal
var modal = document.getElementById('modal');

var btn = document.getElementsByClassName("contacts__order")[0];

var span = document.getElementsByClassName("modal__close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        console.log("modal clikded");
        modal.style.display = "none";
    }
}