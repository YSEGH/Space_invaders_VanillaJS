import Alien from "./Alien";
import Bullet from "./Bullet";
import Score from "./Score";
import { Ship } from "./Ship";
import "./style/index.css";

const ship = new Ship();
let scoreBoard = new Score({ x: 0, y: window.innerHeight - 200 });
let totalScore = 0;
const bullets = [];
const numbRows = 5; // Nombre de lignes d'aliens
const numCols = 9; // Nombre de colonnes d'aliens
const alienWidth = 60; // La largeur d'un alien
const colWidth = 80; // La largeur pour chaque colonne d'aliens
const rowHeight = 80; // La hauteur pour chaque ligne d'aliens
const aliens = [];
const key = {
  ArrowRight: false,
  ArrowLeft: false,
  Space: false,
};

document.addEventListener("keydown", ({ code }) => {
  key[code] = true;
});

document.addEventListener("keyup", ({ code }) => {
  key[code] = false;
});

const addToScore = (points) => {
  scoreBoard.setScore(points);
};

const removeAlien = (alien) => {
  aliens.splice(aliens.indexOf(alien), 1);
  alien.remove();
};
const removeBullet = (bullet) => {
  bullets.splice(bullets.indexOf(bullet), 1);
  bullet.remove();
};

const createBullet = ({ x, y }) => {
  bullets.push(new Bullet({ x, y }));
};

const isOverlapping = (entity, bullet) => {
  const rect1 = entity.el.getBoundingClientRect();
  const rect2 = bullet.el.getBoundingClientRect();
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

const getOverlappingBullet = (entity) => {
  for (let bullet of bullets) {
    if (isOverlapping(entity, bullet)) {
      return bullet;
    }
  }
  return null;
};

for (let row = 0; row < numbRows; row++) {
  for (let col = 0; col < numCols; col++) {
    const alien = new Alien({
      x: col * colWidth + (window.innerWidth / 2 - (numCols * colWidth) / 2),
      y: row * rowHeight + 10,
      getOverlappingBullet,
      removeAlien,
      removeBullet,
      addToScore,
    });
    aliens.push(alien);
  }
}

const getLeftMostAlien = () => {
  return aliens.reduce((minimumAlien, currentAlien) => {
    return minimumAlien.x > currentAlien.x ? currentAlien : minimumAlien;
  });
};

const getRightMostAlien = () => {
  return aliens.reduce((minimumAlien, currentAlien) => {
    return minimumAlien.x < currentAlien.x ? currentAlien : minimumAlien;
  });
};

const update = () => {
  if (key["ArrowRight"] && ship.x < window.innerWidth - ship.SPRITE_WIDTH) {
    ship.moveRight();
  } else if (key["ArrowLeft"] && ship.x > 0) {
    ship.moveLeft();
  }
  if (key["Space"]) {
    ship.fire({ createBullet });
  }
  bullets.map((bullet, i) => {
    bullet.update();
    if (bullet.y < 0) {
      bullets.splice(i, 1);
      bullet.remove();
    }
  });

  aliens.map((alien, i) => {
    alien.update();
  });

  const leftMostAlien = getLeftMostAlien();
  if (leftMostAlien.x <= 0) {
    aliens.map((alien) => {
      alien.setDirectionRight();
    });
  }
  const rightMostAlien = getRightMostAlien();
  if (rightMostAlien.x > window.innerWidth - alienWidth) {
    aliens.map((alien) => {
      alien.setDirectionLeft();
      alien.moveDown();
    });
  }
};

setInterval(update, 20);
