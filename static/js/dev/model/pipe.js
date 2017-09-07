/**
 * Created by hckrmoon on 7/30/17.
 */

import { rectsColliding } from '../global/helper'

export default class Pipe {
  constructor() {
    this.hasPassed = false
    this.minSpace = 30
    this.holeSize = random(100, 220)
    this.top = random(this.minSpace, height - this.holeSize - this.minSpace)
    this.bottom = height - this.holeSize - this.top

    this.x = width
    this.w = 20
    this.speed = 5

    this.topPipe = {
      x: this.x,
      y: 0,
      w: this.w,
      h: this.top
    }

    this.bottomPipe = {
      x: this.x,
      y: height - this.bottom,
      w: this.w,
      h: this.bottom
    }
  }

  show() {
    stroke(0)
    fill(255)
    rect(this.x, 0, this.w, this.top)
    rect(this.x, this.bottomPipe.y, this.w, this.bottom)
  }

  update() {
    this.x -= this.speed
    this.topPipe.x = this.x
    this.bottomPipe.x = this.x
  }

  hits(bird) {
    return rectsColliding(bird, this.topPipe) || rectsColliding(bird, this.bottomPipe)
  }

  isPassed(bird) {
    if (this.hasPassed) {
      return false
    }

    if (bird.x > this.x + this.w) {
      this.hasPassed = true
      return true
    }

    return false
  }
}
