let settings = {
    mode: "Classic",
    duration: 10,
    difficulty: "Medium"
};

let resultsSub = document.getElementById("results-sub");
let fieldHint = document.querySelector(".field__hint");
let saved = localStorage.getItem("clickFast.settings");
let recordBadge = document.getElementById("recordBadge");
let homeClassicRecord = document.getElementById("home-classic-record");
let homePrecisionRecord = document.getElementById("home-precision-record");
let recordDisplay = document.getElementById("record-display");

const difficultyMultiplier = { Easy: 1, Medium: 1.5, Hard: 2 };
const durationMultiplier = { 10: 1.5, 20: 1.2, 30: 1 };

let records = { classic: 0, precision: 0 };

let savedRecords = localStorage.getItem("clickFast.records");
if (savedRecords) {
    records = JSON.parse(savedRecords);
}

homeClassicRecord.textContent = records.classic;
homePrecisionRecord.textContent = records.precision;

if(saved){
    settings = JSON.parse(saved);
}
syncPillsFromSettings();
hintInfos();


let score = 0;

let timeLeft = 10;

let gameInProgress = false;

let misses = 0;

let accuracy = 0;

const difficultySizes = {
    Easy: 80,
    Medium: 60,
    Hard: 40
};

let sections = document.querySelectorAll(".view");

function showView(viewId){
    if (gameInProgress && (viewId === "view-config" || viewId === "view-history")) {
        return;
    }
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
const btnResults = document.getElementById("view-results");

let scoreDisplay = document.getElementById("score-display");
let resultsScoreDisplay = document.getElementById("results-score");

let resultsMissesDisplay = document.getElementById("results-misses");
let missesDisplay = document.getElementById("misses-display");

let accuracyDisplay = document.getElementById("accuracy-display");
let resultsAccuracyDisplay = document.getElementById("results-accuracy");

let missesDisplayGame = document.getElementById("misses-display-game");
let accuracyDisplayGame = document.getElementById("accuracy-display-game");

let timeDisplay = document.getElementById("time-display");

let pseudoInput = document.getElementById("pseudo");
let pseudoError = document.getElementById("pseudo-error");




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
        if(settings.mode === "classic"){
            recordDisplay.textContent = records.classic;
        }else{
            recordDisplay.textContent = records.precision;
        }
        let pseudoValue = pseudoInput.value.trim();
        if(!pseudoValue || pseudoValue.length > 20 || pseudoValue.length < 2){
            pseudoError.classList.remove("hidden");
            return;
        }
        if(settings.mode === "Precision") {
            missesDisplayGame.classList.remove("hidden");
            accuracyDisplayGame.classList.remove("hidden");
        }else {
            missesDisplayGame.classList.add("hidden");
            accuracyDisplayGame.classList.add("hidden");
        }
        pseudoError.classList.add("hidden");
        score = 0;
        misses = 0;
        accuracy = 0;
        scoreDisplay.textContent = score;
        missesDisplay.textContent = misses;
        timeLeft = settings.duration;
        accuracyDisplay.textContent = "0%";
        timeDisplay.textContent = timeLeft;
        moveTarget();
        showView("view-game");
        gameInProgress = true;
        let timerID = setInterval(() => {
                timeLeft--;
                timeDisplay.textContent = timeLeft;
                if(timeLeft === 0){
                    let weightedScore = 0
                    weightedScore = score * difficultyMultiplier[settings.difficulty] * durationMultiplier[settings.duration];
                    if(settings.mode === "Precision"){
                        let accuracy = score / (score + misses);
                        weightedScore = weightedScore * accuracy;
                    }
                    weightedScore = Math.round(weightedScore);
                    let recordKey;
                    gameInProgress = false;
                    resultsScoreDisplay.textContent = score;
                    if(settings.mode === "Precision"){
                        resultsMissesDisplay.textContent = misses;
                        resultsAccuracyDisplay.textContent = `${Math.round(accuracy)}%`;
                    }
                    resultsSub.textContent = `${settings.mode} · ${settings.difficulty} · ${settings.duration}s — played as ${pseudoValue}`;
                    showView("view-results");
                    if(settings.mode === "Classic"){
                        recordKey = "classic";
                    }else {
                        recordKey = "precision";
                    }
                    let isNewRecord = false;
                    if(weightedScore > records[recordKey]){
                        records[recordKey] = weightedScore;
                        localStorage.setItem("clickFast.records", JSON.stringify(records));
                        isNewRecord = true;
                    }
                    if(isNewRecord){
                        homeClassicRecord.textContent = records.classic;
                        homePrecisionRecord.textContent = records.precision;
                        recordBadge.classList.remove("hidden");
                    }else{
                        recordBadge.classList.add("hidden");
                    }
                    let session = {
                        name: pseudoValue,
                        mode: settings.mode,
                        difficulty: settings.difficulty,
                        duration: settings.duration,
                        score: score,
                        accuracy: settings.mode === "Precision" ? `${Math.round(accuracy)}%` : "Not measured"
                    }
                    localStorage.setItem
                    clearInterval(timerID);

                };
            }, 1000);
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
            if(key === "duration"){
                settings[key] = parseInt(clickedPill.textContent);
            }else{
                settings[key] = clickedPill.textContent;
            }
        }
        localStorage.setItem("clickFast.settings", JSON.stringify(settings));
        if(key === "difficulty"){
            hintInfos();
        }
    }

function hintInfos(){
    if(settings.difficulty === "Easy") fieldHint.textContent = "Easy targets are 80×80px — the standard calibration.";
    if(settings.difficulty === "Medium") fieldHint.textContent = "Medium targets are 60×60px — the standard calibration.";
    if(settings.difficulty === "Hard") fieldHint.textContent = "Hard targets are 40×40px — the standard calibration.";
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
    let targetSize = difficultySizes[settings.difficulty];
    let maxPosition = arenaSize - targetSize;

    target.style.height = `${targetSize}px`;
    target.style.width = `${targetSize}px`;

    let randomX = Math.floor(Math.random() * maxPosition);
    let randomY = Math.floor(Math.random() * maxPosition);

    target.style.top = `${randomY}px`;
    target.style.left = `${randomX}px`;
}

target.addEventListener("click", (e) => {
    score++;
    scoreDisplay.textContent = score;
    updateAccuracy();
    moveTarget();
})

const arena = document.querySelector(".arena");

arena.addEventListener("click", (e) =>{
    if(settings.mode === "Precision"){
        if(e.target !== target){
            misses++;
            missesDisplay.textContent = misses;
            updateAccuracy();
            moveTarget();
        }
    }
})

function updateAccuracy(){
    if(settings.mode === "Precision"){
        accuracy = (score / (score + misses)) * 100;
        accuracyDisplay.textContent = `${Math.round(accuracy)}%`;
    }
}


function syncPillsFromSettings() {
    const allPills = document.querySelectorAll(".pill");

    allPills.forEach(pill => {
        const group = pill.parentElement;
        const settingName = group.dataset.setting;

        let pillValue = pill.textContent;
        let settingValue = settings[settingName];

        if (settingName === "duration") {
            pillValue = parseInt(pillValue);
        }

        if (pillValue === settingValue) {
            pill.classList.add("pill--selected");
        } else {
            pill.classList.remove("pill--selected");
        }
    });
}

