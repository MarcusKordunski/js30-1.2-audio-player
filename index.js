const currentAudio = document.querySelector(".audio")
const playBtn = document.querySelector(".button-play img")
const backwardBtn = document.querySelector(".button-backward img")
const forwardBtn = document.querySelector(".button-forward img")
const author = document.querySelector(".author")
const song = document.querySelector(".song")
const audioImage = document.querySelector(".audio-image")
const htmlBackground = document.getElementById("html")
const slider = document.getElementById("slider")
const songDuration = document.querySelector(".song-duration")
const timeline = document.querySelector(".timeline");

let flag = false
let music = ['beyonce.mp3', 'dontstartnow.mp3']
let musicPics = ['lemonade.png', 'dontstartnow.png']
let authorNames = ['Beyonce', 'Dua Lipa']
let musicNames = ['Don\'t hurt yourself', 'Don\'t start now']

playNum = 0

function getTimeCodeFromNum(num) {
	let seconds = parseInt(num);
	let minutes = parseInt(seconds / 60);
	seconds -= minutes * 60;
	const hours = parseInt(minutes / 60);
	minutes -= hours * 60;

	if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
	return `${String(hours).padStart(2, 0)}:${minutes}:${String(
		seconds % 60
	).padStart(2, 0)}`;
}

const playNumUp = () => {
	playNum++
	if (playNum >= music.length) {
		playNum = 0
	}
}

const playNumDown = () => {
	playNum--
	if (playNum < 0) {
		playNum = music.length - 1
	}
}


const changeSong = (playNum) => {
	currentAudio.src = `assets/audio/${music[playNum]}`
	author.textContent = `${authorNames[playNum]}`
	song.textContent = `${musicNames[playNum]}`
	audioImage.src = `assets/img/${musicPics[playNum]}`
	htmlBackground.style.background = "url('assets/img/" + musicPics[playNum] + "')"
	htmlBackground.style.backgroundRepeat = "no-repeat"
	htmlBackground.style.backgroundSize = "100% 100%"
	currentAudio.onloadedmetadata = function () {
		songDuration.textContent = getTimeCodeFromNum(parseInt(currentAudio.duration))
	};
}


document.addEventListener("load", changeSong(playNum));


const delay = () => {
	setInterval(() => {
		slider.style.left = currentAudio.currentTime / currentAudio.duration * 100 + "%";
		document.querySelector(".time-current").textContent = getTimeCodeFromNum(
			currentAudio.currentTime
		);
	}, 10)
}


const playFunc = () => {
	if (flag === false) {
		currentAudio.play()
		playBtn.src = 'assets/svg/pause.png'
		flag = true
		document.getElementById("audio-image").style.transform = "scale(1.2)"
		let duration = 0
		currentAudio.onloadedmetadata = function () {
			duration = currentAudio.duration
		};
		for (let i = 0; i <= duration; i++) {
			delay()
		}
	} else if (flag === true) {
		currentAudio.pause()
		playBtn.src = 'assets/svg/play.png'
		flag = false
		document.getElementById("audio-image").style.transform = "scale(1)"
	}
}


const toNext = () => {
	playNumUp()
	changeSong(playNum)
	flag = false
	playFunc()
}

const toPrevious = () => {
	playNumDown()
	changeSong(playNum)
	flag = false
	playFunc()
}


let skipping = false;
let mousedown = false

timeline.addEventListener('mousedown', mouseDown, false);
document.documentElement.addEventListener('mouseup', mouseUp, false);
timeline.addEventListener('mousemove', moveMe, false);

function mouseDown(event) {
	skipping = true;
	currentAudio.pause()
	moveMe(event)
	mousedown = true
}
function mouseUp(event) {
	skipping = false;
	if (mousedown == true) { currentAudio.play() }
	mousedown = false
}

function moveMe(event) {
	if (skipping && !event.target.classList.contains("slider")) {
		const timelineWidth = window.getComputedStyle(timeline).width;
		let number = parseInt(event.offsetX / parseInt(timelineWidth) * currentAudio.duration);
		slider.style.left = number;
		currentAudio.currentTime = number;
	}
}
// function clickMe(event) {
// 	if (moving == false) {
// 		const timelineWidth = window.getComputedStyle(timeline).width;
// 		let number = parseInt(event.offsetX / parseInt(timelineWidth) * currentAudio.duration);
// 		slider.style.left = number;
// 		currentAudio.currentTime = number;
// 	}
// }


playBtn.addEventListener('click', playFunc)
backwardBtn.addEventListener('click', toPrevious)
forwardBtn.addEventListener('click', toNext)

console.log("60/60")