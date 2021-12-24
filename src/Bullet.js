import { Entity } from "./Entity";
import "./style/Bullet.css";

class Bullet extends Entity {
  constructor({ x, y, isAlien }) {
    super({ className: "bullet" });
    this.isAlien = isAlien;
    this.speed = 5;
    this.BULLET_WIDTH = 6;
    this.setX(x);
    this.setY(y);
  }

  update() {
    const dirY = this.isAlien ? this.speed : -this.speed;
    this.setY(this.y + dirY);
  }
}

export default Bullet;
