import { Entity } from "./Entity";
import "./style/Score.css";

class Score extends Entity {
  constructor({ x, y }) {
    super({ className: "score" });
    this.scoreH1 = document.createElement("h1");
    this.el.appendChild(this.scoreH1);
    this.score = 0;
    this.setScore(this.score);
    this.setX(x);
    this.setY(y);
  }

  setScore(points) {
    this.score += points;
    this.scoreH1.innerText = `Score : ${this.score}`;
  }

  resetScore() {
    this.score = 0;
    this.setScore(this.score);
  }
}

export default Score;
