let musics = ["Péricles - Se eu largar o freio", "Grupo Revelação - Deixa Acontecer  Coração Radiante  Compasso Do Amor", "Arlindo Cruz - Meu Lugar"];
let player = document.getElementById("player");
let slower = document.getElementById("slower");
let backward = document.getElementById("backward");
let before = document.getElementById("before");
let playPause = document.getElementById("playPause");
let next = document.getElementById("next");
let stoper = document.getElementById("stop");
let forward = document.getElementById("forward");
let faster = document.getElementById("faster");
let volume = document.getElementById("volume");
let musicImage = document.getElementById("musicImage");
let musicName = document.getElementById("musicName");
let progressBar = document.getElementById("progressBar");
let volumeBar = document.getElementById("volumeBar");

slower.addEventListener("click", diminuir);
backward.addEventListener("click", retroceder);
before.addEventListener("click", anterior);
playPause.addEventListener("click", tocar);
next.addEventListener("click", proxima);
stoper.addEventListener("click", toStop);
forward.addEventListener("click", avancar);
faster.addEventListener("click", acelerar);
volume.addEventListener("click", mutarDesmutar);
progressBar.addEventListener("change", posicionar)
volumeBar.addEventListener("change", changeVolume);

let musicIndex = 0;

function diminuir(){
    player.playbackRate -= 0.1;
} 
function retroceder(){
    player.currentTime -= 5;
}
function anterior(){
    if(musicIndex == 0){
        player.currentTime = 0;
        musicName.innerHTML = musics[musicIndex];
    }
    else{
        musicIndex -= 1;
        player.src = "musics/" + musics[musicIndex] + ".mp3";
        musicName.innerHTML = musics[musicIndex];
    }
}
function tocar(){
    if(player.paused){
        player.play();
        playPause.src="./assets/pause.png";
    }
    else{
        player.pause();
        playPause.src="./assets/play.png";
    }
}
function proxima(){
    if(musicIndex == 2){
        musicIndex = 0;
        player.src = "./musics/" + musics[musicIndex] + ".mp3";
        musicImage.src = "./assets/musicImage/" + musics[musicIndex] + ".jpg";
        musicName.innerHTML = musics[musicIndex];
    }
    else{
        musicIndex += 1;
        player.src= "./musics/" + musics[musicIndex] + ".mp3";
        musicImage.src = "./assets/musicImage/" + musics[musicIndex] + ".jpg";
        musicName.innerHTML = musics[musicIndex];
    }
    player.play();
}
function toStop(){
    musicIndex = 0;
    player.src= "./musics/" + musics[musicIndex] + ".mp3";
    playPause.src= "./assets/play.png";
    musicImage.src= "./assets/musicImage/" + musics[musicIndex] + ".jpg";
    musicName.innerHTML = musics[musicIndex];
}
function avancar(){
    player.currentTime += 5;
}
function acelerar(){
    player.playbackRate += 0.1;
}
function mutarDesmutar(){
    if(player.volume == 0){
        player.volume = 0.5;
        volumeBar.value = 0.5;
        volume.src="./assets/volume.png";
    }
    else{
        player.volume = 0;
        volumeBar.value = 0;
        volume.src="./assets/mute.png";
    }
}
function posicionar(){
    player.currentTime = progressBar.value;
}
function atualizarTempo(){
    progressBar.value = player.currentTime;
    progressBar.max = player.duration;
}
window.setInterval(atualizarTempo, 1000);

function time(){
    let musicDuration = player.duration;
    let minutosTotal = Math.floor(player.duration/60);
    let segundosTotal = Math.floor(player.duration - minutosTotal * 60);
    let minutos = Math.floor(player.currentTime/60);
    let segundos = Math.floor(player.currentTime - minutos * 60);

    timeDisplay.innerHTML = minutos + ":" + segundos + " / " + minutosTotal + ":" + segundosTotal;

    if(player.currentTime == musicDuration){
        proxima();
    }
    
}
window.setInterval(time, 250);

function changeVolume(){
    player.volume = volumeBar.value;  

    if (volumeBar.value == 0){
        volume.src= "./assets/mute.png";
    }
    else{
        volume.src= "./assets/volume.png";
    }
}