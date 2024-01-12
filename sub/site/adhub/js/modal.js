var agreemodal = document.getElementById('policy_pop');
var agreebtn = document.getElementById("policy_btn");
var agreespan = document.getElementById('policy_pop').querySelector('.close');
console.log(agreespan)

agreebtn.onclick = function () {
    agreemodal.style.display = "block";
}

agreespan.onclick = function () {
    agreemodal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == agreemodal) {
        agreemodal.style.display = "none";
    }
};