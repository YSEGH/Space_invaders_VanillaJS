import { Entity } from "./Entity";
import "./style/Bullet.css";

class Bullet extends Entity {
  constructor({ x, y }) {
    super({ className: "bullet" });
    this.speed = 5;
    this.BULLET_WIDTH = 6;
    this.setX(x);
    this.setY(y);
  }

  update() {
    this.setY(this.y - this.speed);
  }
}

export default Bullet;
