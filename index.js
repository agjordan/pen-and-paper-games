let gameChomp = document.getElementById("gameChomp")
let gameObstruction = document.getElementById("gameObstruction")

const playChomp =  () => {
    gameChomp.classList.remove("hidden")
    gameObstruction.className = "game hidden"
}

const playObstruction =  () => {
    gameObstruction.classList.remove("hidden")
    gameChomp.className = "game hidden"
}