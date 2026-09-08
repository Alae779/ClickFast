let settings = {
  mode: "Classic",
  duration: 10,
  difficulty: "Medium"
};

let score = 0;

let timeLeft = 10;

let sections = document.querySelectorAll(".view");

function showView(viewId){
    sections.forEach(sec => {
        if(sec.id === viewId){
            sec.classList.add("view--active");
        }else{
            sec.classList.remove("view--active");
        }
    })
}

const btnStart = document.getElementById("btn-start");
const btnViewHistory = document.getElementById("btn-view-history");
const btnConfigBack = document.getElementById("btn-config-back");
const btnResultsHome = document.getElementById("btn-results-home");
const btnResultsAgain = document.getElementById("btn-results-again");
const btnConfigStart = document.getElementById("btn-config-start");
const btnHistoryBack = document.getElementById("btn-history-back");

btnStart.addEventListener("click", (e) => {
    showView("view-config");
})
btnViewHistory.addEventListener("click", (e) => {
    showView("view-history");
})
btnConfigBack.addEventListener("click", (e) => {
    showView("view-home");
})
btnResultsHome.addEventListener("click", (e) => {
    showView("view-home");
})
btnResultsAgain.addEventListener("click", (e) => {
    showView("view-config");
})
btnConfigStart.addEventListener("click", (e) => {
    e.preventDefault();
    showView("view-game");
})
btnHistoryBack.addEventListener("click", (e) => {
    showView("view-home");
});


function selectPill(clickedPill){
    const group = clickedPill.parentElement;
    const pillsInGroup = group.querySelectorAll(".pill");

    pillsInGroup.forEach(pill => {
        pill.classList.remove("pill--selected");
    })
    clickedPill.classList.add("pill--selected");

    const key = group.dataset.setting;
    if(key){
        settings[key] = clickedPill.textContent;
    }
}

const allPills = document.querySelectorAll(".pill");
allPills.forEach(pill =>{
    pill.addEventListener("click", (e) => {
        selectPill(pill);
    })
})

let target = document.querySelector(".target");

function moveTarget(){
    let arenaSize = 500;
    let targetSize = 60;
    let maxPosition = arenaSize - targetSize;

    let randomX = Math.floor(Math.random() * maxPosition);
    let randomY = Math.floor(Math.random() * maxPosition);

    target.style.top = `${randomY}px`;
    target.style.left = `${randomX}px`;
}

let scoreDisplay = document.getElementById("score-display");

target.addEventListener("click", (e) => {
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
})
