import { times } from "lodash";
import { Entity } from "./Entity";
import "./style/Lives.css";

class Lives extends Entity {
  constructor({ x, y }) {
    super({ className: "lives" });
    this.lives = 3;

    this.setX(x);
    this.setY(y);
    this.displayLives();
  }

  removeALife() {
    this.lives--;
    this.displayLives();
    return this.lives;
  }

  displayLives() {
    this.el.innerText = new Array(this.lives).fill("❤").join(" ");
  }
}

export default Lives;
