import {
  forestButton,
  rainButton,
  coffeButton,
  campfireButton
} from './elements.js'

const coffeAudio = new Audio('./sources/cafeteria.wav')
const rainAudio = new Audio('./sources/chuva.wav')
const forestAudio = new Audio('./sources/floresta.wav')
const campfireAudio = new Audio('./sources/lareira.wav')

const coffeVolume = coffeButton.querySelector('input')
const rainVolume = rainButton.querySelector('input')
const forestVolume = forestButton.querySelector('input')
const campfireVolume = campfireButton.querySelector('input')

export {
  coffeAudio,
  rainAudio,
  forestAudio,
  campfireAudio,
  coffeVolume,
  rainVolume,
  forestVolume,
  campfireVolume
}
