import shipImage from "../images/ship.png";
import { Entity } from "./Entity";
import "./style/Ship.css";

export class Ship extends Entity {
  constructor() {
    super({ tag: "img", className: "ship" });
    this.el.src = shipImage;

    this.canFire = true;
    this.speed = 5;
    this.SPRITE_WIDTH = 70;
    this.setX(window.innerWidth / 2 - this.SPRITE_WIDTH / 2);
    this.setY(window.innerHeight - 100);
  }

  moveRight() {
    let x = this.x + this.speed;
    this.setX(x);
  }

  moveLeft() {
    let x = this.x - this.speed;
    this.setX(x);
  }

  fire({ createBullet }) {
    if (this.canFire) {
      this.canFire = false;
      createBullet({ x: this.x + this.SPRITE_WIDTH / 2 - 3, y: this.y });
      setTimeout(() => {
        this.canFire = true;
      }, 200);
    }
  }
}
