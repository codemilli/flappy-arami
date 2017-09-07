/**
 * Created by hckrmoon on 7/30/17.
 */

export default class Background {
  constructor(layer1, layer2, layer3, layer4, layer5) {
    this.layerSize = 2048
    this.layerHeight = 1546
    this.wRatio = this.layerSize / width
    this.hRatio = this.layerHeight / height
    this.ratio = height / width
    this.width = this.layerSize / (this.ratio > 1 ?  this.hRatio : this.wRatio)
    this.height = this.layerHeight / (this.ratio > 1 ?  this.hRatio : this.wRatio)

    this.layer1Image = layer1
    this.layer2Image = layer2
    this.layer3Image = layer3
    this.layer4Image = layer4
    this.layer5Image = layer5
  }

  show() {
    this.drawLayer(this.layer1Image, _frameCount / 6, this.width, this.height)
    this.drawLayer(this.layer2Image, _frameCount / 4, this.width, this.height)
    this.drawLayer(this.layer3Image, _frameCount / 2, this.width, this.height)
    this.drawLayer(this.layer4Image, _frameCount / 1, this.width, this.height)
    this.drawLayer(this.layer5Image, _frameCount / 0.5, this.width, this.height)
  }

  drawLayer(layerImage, frame, rWidth, rHeight) {
    push()

    const nextStage = parseInt((frame + width) / rWidth)
    translate(-frame, 0)
    image(layerImage, nextStage < 2 ? 0 : rWidth * (nextStage - 1), 0, rWidth, rHeight)

    if (nextStage > 0) {
      image(layerImage, rWidth * nextStage, 0, rWidth, rHeight)
    }

    pop()
  }
}
