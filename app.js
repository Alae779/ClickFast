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
