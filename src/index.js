import Alien from "./Alien";
import Bullet from "./Bullet";
import Lives from "./Lives";
import Score from "./Score";
import { Ship } from "./Ship";
import "./style/index.css";

const livesBoard = new Lives({
  x: window.innerWidth / 2 - 150,
  y: window.innerHeight - 25,
});
let scoreBoard = new Score({ x: window.innerWidth / 2 - 150, y: 0 });

const bullets = [];
const ALIEN_ROWS = 5; // Nombre de lignes d'aliens
const ALIEN_COLS = 9; // Nombre de colonnes d'aliens
const alienWidth = 60; // La largeur d'un alien
const colWidth = 80; // La largeur pour chaque colonne d'aliens
const rowHeight = 80; // La hauteur pour chaque ligne d'aliens

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

const removeBullet = (bullet) => {
  bullets.splice(bullets.indexOf(bullet), 1);
  bullet.remove();
};

const createBullet = ({ x, y, isAlien = false }) => {
  bullets.push(new Bullet({ x, y, isAlien }));
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

const ship = new Ship({
  getOverlappingBullet,
  removeBullet,
  removeLife: () => livesBoard.removeALife(),
});

const aliens = [];
const aliensGrid = [];

const removeAlien = (alien) => {
  aliens.splice(aliens.indexOf(alien), 1);
  alien.remove();
  console.log(aliensGrid);
  for (let row = 0; row < aliensGrid.length; row++) {
    for (let col = 0; col < aliensGrid.length; col++) {
      if (aliensGrid[row][col] === alien) {
        aliensGrid[row][col] = null;
      }
    }
  }
};

for (let row = 0; row < ALIEN_ROWS; row++) {
  const aliensCol = [];
  for (let col = 0; col < ALIEN_COLS; col++) {
    const alien = new Alien({
      x: col * colWidth + (window.innerWidth / 2 - (ALIEN_COLS * colWidth) / 2),
      y: row * rowHeight + 50,
      getOverlappingBullet,
      removeAlien,
      removeBullet,
      addToScore,
    });
    aliens.push(alien);
    aliensCol.push(alien);
  }
  aliensGrid.push(aliensCol);
}
console.log("first :", aliensGrid);

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

const getAllBottomMostAliens = () => {
  const bottomAliens = [];
  for (let col = 0; col < ALIEN_COLS; col++) {
    for (let row = ALIEN_ROWS - 1; row >= 0; row--) {
      if (aliensGrid[row][col]) {
        console.log(aliensGrid[row][col]);
        bottomAliens.push(aliensGrid[row][col]);
        break;
      }
    }
  }
  return bottomAliens;
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

  ship.update();

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

const fireAlien = () => {
  // Faire tirer aléatoirement un alien de la dernière rangée
  const bottomMostAliens = getAllBottomMostAliens();
  console.log(aliensGrid);
  const random = Math.floor(Math.random() * bottomMostAliens.length);
  if (bottomMostAliens[random].el) {
    bottomMostAliens[random].fire({
      createBullet,
    });
  }
};

setInterval(update, 20);

setInterval(fireAlien, 2000);
