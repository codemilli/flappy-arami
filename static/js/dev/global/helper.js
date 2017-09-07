/**
 * Created by hckrmoon on 7/30/17.
 */


export const rectsColliding = (r1,r2) => {
  return !(r1.x>r2.x+r2.w || r1.x+r1.w<r2.x || r1.y>r2.y+r2.h || r1.y+r1.h<r2.y);
}

export const isMouseInRectangle = (x, y, rect) => {
  return x > rect[0] &&
         x < rect[0] + rect[2] &&
         y > rect[1] &&
         y < rect[1] + rect[3]
}

