import {
  coffeAudio,
  rainAudio,
  forestAudio,
  campfireAudio,
  coffeVolume,
  rainVolume,
  forestVolume,
  campfireVolume
} from './sounds.js'

import {
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonPlus,
  buttonMinus,
  minutesDisplay,
  secondsDisplay,
  forestButton,
  rainButton,
  coffeButton,
  campfireButton,
  buttonLightIcon,
  buttonDarkIcon
} from './elements.js'

let minutes = Number(minutesDisplay.textContent)
let timerTimeOut

function resetControls() {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
  resetTimer()
}

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function resetTimer() {
  updateTimerDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function countdown() {
  timerTimeOut = setTimeout(function () {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let isFinished = minutes <= 0 && seconds == 0

    updateTimerDisplay(minutes, 0)

    if (isFinished) {
      resetControls()
      return
    }

    if (seconds <= 0) {
      seconds = 60
      --minutes
    }

    updateTimerDisplay(minutes, String(seconds - 1))

    countdown()
  }, 1000)
}

function togglePlay(audio) {
  return audio.paused ? audio.play() : audio.pause()
}

function changeBackgroundButtonColor(button) {
  var currentTheme = document.documentElement.getAttribute('data-theme')
  if (button.classList.contains('on')) {
  } else
    currentTheme === 'light'
      ? (button.style.backgroundColor = '#e1e1e6')
      : (button.style.backgroundColor = '#29292e')
}

function toggleButtonState(button) {
  if (button.classList.contains('on')) {
    button.classList.remove('on')
    button.classList.add('off')
    changeBackgroundButtonColor(button)
  } else if (button.classList.contains('off')) {
    button.classList.remove('off')
    button.classList.add('on')
    button.style.backgroundColor = '#02799d'
  }
}

function switchButtons(button1, button2) {
  button1.classList.add('hide')
  button2.classList.remove('hide')
}

function adjustVolume(sound, volume) {
  sound.volume = volume
}

buttonLightIcon.addEventListener('click', () => {
  switchButtons(buttonLightIcon, buttonDarkIcon)
})

buttonDarkIcon.addEventListener('click', () => {
  switchButtons(buttonDarkIcon, buttonLightIcon)
})

buttonPlay.addEventListener('click', () => {
  switchButtons(buttonPlay, buttonPause)
  countdown()
})

buttonPause.addEventListener('click', () => {
  switchButtons(buttonPause, buttonPlay)
  clearTimeout(timerTimeOut)
})

buttonStop.addEventListener('click', () => {
  resetControls()
  resetTimer()
})

buttonPlus.addEventListener('click', () => {
  minutes = minutes + 5
  minutesDisplay.textContent = String(minutes).padStart(2, '0')
})

buttonMinus.addEventListener('click', () => {
  let newMinutes = minutes - 5
  if (newMinutes < 0) {
    resetTimer()
    return
  }

  minutes = newMinutes
  minutesDisplay.textContent = String(minutes).padStart(2, '0')
})

forestButton.addEventListener('click', () => {
  toggleButtonState(forestButton)
  togglePlay(forestAudio)
  forestAudio.loop = true
})

forestVolume.addEventListener('input', function () {
  adjustVolume(forestAudio, forestVolume.value)
})

rainButton.addEventListener('click', () => {
  toggleButtonState(rainButton)
  togglePlay(rainAudio)
  rainAudio.loop = true
})

rainVolume.addEventListener('input', function () {
  adjustVolume(rainAudio, rainVolume.value)
})

coffeButton.addEventListener('click', () => {
  toggleButtonState(coffeButton)
  togglePlay(coffeAudio)
  coffeAudio.loop = true
})

coffeVolume.addEventListener('input', function () {
  adjustVolume(coffeAudio, coffeVolume.value)
})

campfireButton.addEventListener('click', () => {
  toggleButtonState(campfireButton)
  togglePlay(campfireAudio)
  campfireAudio.loop = true
})

campfireVolume.addEventListener('input', function () {
  adjustVolume(campfireAudio, campfireVolume.value)
})

document.addEventListener('DOMContentLoaded', function (event) {
  document.documentElement.setAttribute('data-theme', 'light')

  let themeSwitcher = document.getElementById('light-dark-icon')

  themeSwitcher.onclick = function () {
    let currentTheme = document.documentElement.getAttribute('data-theme')

    let switchToTheme = currentTheme === 'dark' ? 'light' : 'dark'

    document.documentElement.setAttribute('data-theme', switchToTheme)

    changeBackgroundButtonColor(forestButton)
    changeBackgroundButtonColor(rainButton)
    changeBackgroundButtonColor(coffeButton)
    changeBackgroundButtonColor(campfireButton)
  }
})
