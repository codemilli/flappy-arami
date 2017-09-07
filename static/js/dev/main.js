/**
 * Created by hckrmoon on 7/30/17.
 */

import CONST from './global/const'

import Bird from './model/bird'
import Score from './model/score'
import Pipe from './model/pipe'
import Background from './model/bg'

import {isMouseInRectangle} from './global/helper'
import {userSvc} from './service/user.service'

const {
  TITLE,
  START_AS_GUEST,
  START_BTN_SIZE,
} = CONST

let retryCount = 0
let score = new Score()
let bird, jumpSound, birdImage, bg, layer1, layer2, layer3, layer4, layer5
let pipes = []
let WINDOW_WIDTH = window.innerWidth > 720 ? 720 : window.innerWidth
let WINDOW_HEIGHT = window.innerHeight > 900 ? 900 : window.innerHeight
let start = false
let startFrame = 0
let START_BTN_POSITION = [0,0,0,0]
let startBTNSize = START_BTN_SIZE

window._frameCount = 0

function onStart() {
  bird.y = height / 2
  startFrame = frameCount
  window._frameCount = frameCount - startFrame
  start = true
}

function onRetry() {
  retryCount += 1

  score.value = 0
  score.jumped = 0
  startFrame = frameCount
  window._frameCount = 0
  bird.y = height / 2
  bird.status = "live"
  pipes = []
}

window.preload = preload
window.setup = setup
window.draw = draw

/**
 * Define things that should be preloaded.
 */
function preload() {
  birdImage = loadImage("/static/images/aramy.png")
  jumpSound = loadSound("/static/sound/jump.wav")

  layer1 = loadImage("/static/images/background_01/layer_01.png")
  layer2 = loadImage("/static/images/background_01/layer_02.png")
  layer3 = loadImage("/static/images/background_01/layer_03.png")
  layer4 = loadImage("/static/images/background_01/layer_04.png")
  layer5 = loadImage("/static/images/background_01/layer_05.png")
}

/**
 * Setup for drawing
 */
function setup() {
  console.log(WINDOW_WIDTH, WINDOW_HEIGHT)
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT)

  bg = new Background(layer1, layer2, layer3, layer4, layer5)
  bird = new Bird(birdImage, jumpSound)
}

/**
 * Drawing function called 60 times per 1sec.
 */
function draw() {
  clear()
  bg.show()
  // drawGrid()

  if (bird.status === "dead") {
    return onDead()
  }

  window._frameCount = frameCount - startFrame

  if (!start) {
    return whenNotyetStarted()
  }

  bird.update()
  bird.show()
  drawPipes()

  if (_frameCount % 80 === 0) {
    pipes.push(new Pipe())
  }

  score.show()
}

function drawPipes() {
  pipes = pipes.filter(function (p) {
    p.show()

    if (bird.status === "dead") {
      return true
    }

    p.update()

    if (p.isPassed(bird)) {
      score.up()
    }

    if (p.x + p.w < 0) {
      return false
    }

    if (p.hits(bird)) {
      bird.die()
      onDead()
    }

    return true
  })
}

window.keyPressed = keyPressed

function keyPressed() {
  if (key === " ") {
    bird.jump(start && bird.status !== "dead", score)
  }
}

if (isMobile.any) {
  let touching = false

  window.touchStarted = touchStarted
  window.touchEnded = touchEnded

  function touchStarted() {
    if (!touching) {
      if (!start || bird.status === "dead") {
        if (isMouseInRectangle(mouseX, mouseY, START_BTN_POSITION)) {
          !start ? onStart() : onRetry()
        }
      }

      bird.jump(start && bird.status !== "dead", score)
      touching = true
    }

    return false
  }

  function touchEnded() {
    touching = false
  }
} else {
  window.mouseClicked = mouseClicked
  window.mousePressed = mousePressed

  function mouseClicked() {
    startBTNSize = START_BTN_SIZE

    if (!start || bird.status === "dead") {
      if (isMouseInRectangle(mouseX, mouseY, START_BTN_POSITION)) {
        !start ? onStart() : onRetry()
      }
    }
  }

  function mousePressed() {
    if (!start || bird.status === "dead") {
      if (isMouseInRectangle(mouseX, mouseY, START_BTN_POSITION)) {
        startBTNSize = START_BTN_SIZE - 5
      }
    }

    bird.jump(start && bird.status !== "dead")
  }
}

function drawGrid() {
  stroke(200)
  fill(120)
  for (let x=-width; x < width; x+=20) {
    line(x, -height, x, height)
    textSize(11)
    textFont("sans-serif")
    text(x, x+1, 12)
  }
  for (let y=-height; y < height; y+=20) {
    line(-width, y, width, y)
    text(y, 1, y+12)
  }
}

function onDead() {
  const halfW = width / 2;
  const halfH = height / 2;

  bird.show()
  drawPipes()

  textFont("sans-serif")
  textSize(45)
  fill(0)

  text(score.value, halfW - (textWidth(score.value) / 2), halfH - 200)

  textFont("Indie Flower")
  textSize(startBTNSize)
  fill(255, 0, 0)
  text("RETRY", halfW - (textWidth("RETRY") / 2), halfH - 70)
  START_BTN_POSITION = [
    halfW - textWidth("RETRY") / 2,
    halfH - 70 - (startBTNSize / 2),
    textWidth("RETRY"),
    startBTNSize
  ]
}

function whenNotyetStarted() {
  const halfW = width / 2;
  const halfH = height / 2;

  bird.show()
  bird.bounce()

  textFont("Indie Flower")
  textSize(55)
  fill(0)
  text(TITLE, halfW - textWidth(TITLE) / 2, halfH - 200)

  /** GUEST */
  textSize(startBTNSize)
  fill(255, 0, 0)
  text(START_AS_GUEST, halfW - (textWidth(START_AS_GUEST) / 2), halfH - 80)
  START_BTN_POSITION = [
    halfW - textWidth(START_AS_GUEST) / 2,
    halfH - 80 - (startBTNSize / 2),
    textWidth(START_AS_GUEST),
    startBTNSize
  ]
}
