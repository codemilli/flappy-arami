/**
 * Created by hckrmoon on 7/30/17.
 */

export default class Bird {

  constructor(img, sound) {
    this.y = height / 2
    this.x = 64
    this.w = 25 // 38 - 13
    this.h = 20 // 47 - 27
    this.img = img
    this.jumpSound = sound
    this.jumpSound.setVolume(0.1)

    this.jumpStatus = false
    this.gravity = 0.7
    this.upwardSpeed = 11
    this.velocity = 0
    this.status = "live"
    this.bounceTo = "up"
  }


  show() {
    image(this.img, this.x - 7, this.y - 13)
  }


  update() {
    if (this.jumpStatus) {
      this.velocity = -this.upwardSpeed
      this.jumpStatus = false
    }

    this.velocity += this.gravity
    this.y += this.velocity

    if (this.y + this.h > height) {
      this.y = height - this.h
      this.velocity = 0
      this.die()
    }

    if (this.y <= 0) {
      this.y = 0
    }
  }


  bounce() {
    if (this.bounceTo === "down") {
      this.y += 0.8
    } else {
      this.y -= 0.8
    }

    if (this.y < (height / 2) - 20) {
      this.bounceTo = "down"
    } else if (this.y > (height / 2) + 20) {
      this.bounceTo = "up"
    }
  }


  jump(active, score) {
    if (!active) {
      return
    }

    this.jumpStatus = true

    if (score) {
      score.jumped += 1
    }

    if (this.jumpSound.isPlaying()) {
      this.jumpSound.stop()
    }

    this.jumpSound.play()
  }


  die() {
    this.status = "dead"
  }
}
