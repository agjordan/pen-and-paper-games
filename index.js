let gameChomp = document.getElementById("gameChomp")
let gameObstruction = document.getElementById("gameObstruction")
let gameConnect4 = document.getElementById("gameConnect4")

const playChomp =  () => {
    gameChomp.classList.remove("hidden")
    gameObstruction.className = "game hidden"
    gameConnect4.className = "game hidden"
}

const playObstruction =  () => {
    gameObstruction.classList.remove("hidden")
    gameChomp.className = "game hidden"
    gameConnect4.className = "game hidden"
}

const playConnect4 =  () => {
    gameConnect4.classList.remove("hidden")
    gameChomp.className = "game hidden"
    gameObstruction.className = "game hidden"
}