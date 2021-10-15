class Player {
  constructor(x, y, color, moveset) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.moveset = moveset;
    this.lastWallhit = -1000; //Wenn man gegen eine Wand fährt soll sich der Speed halbieren.
    this.lastBoost = -1000; //Wenn man einen Booster einsetzt soll sich der Speed verdoppeln.
    this.penalty = 1;
    this.cps = []; //Checkpoints
    this.item = false;
  }

  draw() {
    fill(this.color);
    stroke("black");
    circle(this.x, this.y, 20);

    if (this.item) {
      fill("yellow");
      stroke("black");
      triangle(int(this.x) - 5, int(this.y) + 4.33, int(this.x) + 5, int(this.y) + 4.33, int(this.x), int(this.y) - 4.33)
    }

    if (this.lastWallhit + 120 > frameCount) {
      this.penalty = 0.6;
    } else {
      if (this.penalty == 2 && this.lastBoost + 120 > frameCount) {
        this.penalty = this.penalty;
      } else {
        this.penalty = 1;
      }
    }

  }

  move(circles) {
    let counter = 0;
    if (this.moveset == "WASD") {
      //W Taste
      if (keyIsDown(87)) {
        for (var cir in circles) {
          if (circles[cir].collide(this.x, int(this.y) - 5 * this.penalty)) {
            this.y = int(this.y) - 5 * this.penalty
            counter = 1;
            break;
          }
        }
      }
      //S Taste
      if (keyIsDown(83)) {
        for (var cir in circles) {
          if (circles[cir].collide(this.x, int(this.y) + 5 * this.penalty)) {
            this.y = int(this.y) + 5 * this.penalty
            counter = 1;
            break;
          }
        }
      }
      //A Taste
      if (keyIsDown(65)) {
        for (var cir in circles) {
          if (circles[cir].collide(int(this.x) - 5 * this.penalty, this.y)) {
            this.x = int(this.x) - 5 * this.penalty
            counter = 1;
            break;
          }
        }
      }
      //D Taste
      if (keyIsDown(68)) {
        for (var cir in circles) {
          if (circles[cir].collide(int(this.x) + 5 * this.penalty, this.y)) {
            this.x = int(this.x) + 5 * this.penalty;
            counter = 1;
            break;
          }
        }
      }
      //Shift Taste 
      if (keyIsDown(16) && this.item && this.penalty != 0.6) {
        this.penalty = 2;
        this.lastBoost = frameCount;
        this.item = false;
      }
    } else if (this.moveset == "ARROWS") {
      //Pfeiltaste oben
      if (keyIsDown(38)) {
        for (var cir in circles) {
          if (circles[cir].collide(this.x, int(this.y) - 5 * this.penalty)) {
            this.y = int(this.y) - 5 * this.penalty
            counter = 1;
            break;
          }
        }
      }
      //Pfeiltaste unten
      if (keyIsDown(40)) {
        for (var cir in circles) {
          if (circles[cir].collide(this.x, int(this.y) + 5 * this.penalty)) {
            this.y = int(this.y) + 5 * this.penalty
            counter = 1;
            break;
          }
        }
      }
      //Pfeiltaste links
      if (keyIsDown(37)) {
        for (var cir in circles) {
          if (circles[cir].collide(int(this.x) - 5 * this.penalty, this.y)) {
            this.x = int(this.x) - 5 * this.penalty
            counter = 1;
            break;
          }
        }
      }
      //Pfeiltaste rechts
      if (keyIsDown(39)) {
        for (var cir in circles) {
          if (circles[cir].collide(int(this.x) + 5 * this.penalty, this.y)) {
            this.x = int(this.x) + 5 * this.penalty;
            counter = 1;
            break;
          }
        }
      }
      //Numpad0
      if (keyIsDown(96) && this.item && this.penalty != 0.6) {
        this.penalty = 2;
        this.lastBoost = frameCount;
        this.item = false;
      }
    }




    if (this.moveset == "WASD") {
      if (keyIsPressed) {
        if (keyCode == 87 || keyCode == 65 || keyCode == 83 || keyCode == 68) {
          if (counter == 0) {
            this.lastWallhit = frameCount;
          }
        }
      }
    }

    if (this.moveset == "ARROWS") {
      if (keyIsPressed) {
        if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40) {
          if (counter == 0) {
            this.lastWallhit = frameCount;
          }
        }
      }
    }

    for (var cir in circles) {
      if (circles[cir].collide(this.x, this.y) && circles[cir].color == "#00e5ff") {
        if (!this.cps.includes(circles[cir])) {
          append(this.cps, circles[cir]);
          circles[cir].halfcp();
        }
      } else if (
        circles[cir].collide(this.x, this.y) &&
        circles[cir].color == "#ccffff"
      ) {
        if (!this.cps.includes(circles[cir])) {
          append(this.cps, circles[cir]);
          circles[cir].nocp();
        }
      }
    }
  }
}
