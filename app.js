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