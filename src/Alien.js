import { Entity } from "./Entity";
import alienImage from "../images/alien.png";
import "./style/Alien.css";

const LEFT = "left";
const RIGHT = "right";

class Alien extends Entity {
  constructor({
    x,
    y,
    getOverlappingBullet,
    removeAlien,
    removeBullet,
    addToScore,
  }) {
    super({ tag: "img", className: "alien" });
    this.el.src = alienImage;

    this.getOverlappingBullet = getOverlappingBullet;
    this.removeAlien = removeAlien;
    this.removeBullet = removeBullet;
    this.addToScore = addToScore;

    this.SPEED = 2;
    this.DOWN_SPEED = 10;
    this.direction = LEFT;
    this.setX(x);
    this.setY(y);
  }

  setDirectionRight() {
    this.direction = RIGHT;
  }

  setDirectionLeft() {
    this.direction = LEFT;
  }

  moveDown() {
    this.setY(this.y + this.DOWN_SPEED);
  }

  update() {
    if (this.direction === LEFT) {
      this.setX(this.x - this.SPEED);
    } else {
      this.setX(this.x + this.SPEED);
    }

    const bullet = this.getOverlappingBullet(this);
    if (bullet && !bullet.isAlien) {
      this.removeAlien(this);
      this.removeBullet(bullet);
      this.addToScore(20);
    }
  }

  fire({ createBullet }) {
    createBullet({
      x: this.x + 60 / 2,
      y: this.y + 60,
      isAlien: true,
    });
  }
}

export default Alien;
