import shipImage from "../images/ship.png";
import { Entity } from "./Entity";
import "./style/Ship.css";

export class Ship extends Entity {
  constructor({ removeLife, removeBullet, getOverlappingBullet }) {
    super({ tag: "img", className: "ship" });
    this.el.src = shipImage;

    this.canFire = true;
    this.speed = 5;
    this.SPRITE_WIDTH = 70;
    this.spawn();
    this.removeBullet = removeBullet;
    this.removeLife = removeLife;
    this.getOverlappingBullet = getOverlappingBullet;
  }

  spawn() {
    this.isAlive = true;
    this.el.style.opacity = 1;
    this.setX(window.innerWidth / 2 - this.SPRITE_WIDTH / 2);
    this.setY(window.innerHeight - 100);
  }

  moveRight() {
    if (!this.isAlive) {
      return;
    }
    let x = this.x + this.speed;
    this.setX(x);
  }

  moveLeft() {
    if (!this.isAlive) {
      return;
    }
    let x = this.x - this.speed;
    this.setX(x);
  }

  fire({ createBullet }) {
    if (this.canFire && this.isAlive) {
      this.canFire = false;
      createBullet({ x: this.x + this.SPRITE_WIDTH / 2 - 3, y: this.y });
      setTimeout(() => {
        this.canFire = true;
      }, 200);
    }
  }

  touchByABullet() {
    this.isAlive = false;
    this.el.style.opacity = 0.5;

    setTimeout(() => {
      this.spawn();
    }, 1000);
  }

  update() {
    const bullet = this.getOverlappingBullet(this);
    if (bullet && bullet.isAlien && this.isAlive) {
      this.removeLife();
      this.removeBullet(bullet);
      this.touchByABullet();
    }
  }
}
