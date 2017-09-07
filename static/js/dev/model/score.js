/**
 * Created by hckrmoon on 7/30/17.
 */

export default class Score {

  constructor() {
    this.value = 0
    this.jumped = 0
  }

  show() {
    textFont("sans-serif")
    fill(0)
    textSize(30)
    text(this.value, 20, 50)
  }

  up() {
    this.value += 1
  }
}

