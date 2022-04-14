var agreemodal = document.getElementById('agree_pop');
var agreebtn = document.getElementById("agree_btn");
var agreespan = document.getElementById('agree_pop').querySelector('.close');

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

var policymodal = document.getElementById('policy_pop');
var policybtn = document.getElementById("policy_btn");
var policyspan = document.getElementById('policy_pop').querySelector('.close');

policybtn.onclick = function () {
    policymodal.style.display = "block";
}

policyspan.onclick = function () {
    policymodal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == policymodal) {
        policymodal.style.display = "none";
    }
}