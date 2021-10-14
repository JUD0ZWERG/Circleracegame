class Player {
  constructor(x, y, color, moveset) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.moveset = moveset;
    this.lastWallhit = -1000; //Wenn man gegen eine Wand fährt soll sich der Speed halbieren.
    this.penalty = 1;
    this.cps = []; //Checkpoints
  }

  draw() {
    fill(this.color);
    stroke("black");
    circle(this.x, this.y, 20);
    
    if (this.lastWallhit + 120 > frameCount) {
      this.penalty = 0.6;
    } else {
      this.penalty = 1;
    }
  }

  move(circles) {
    let counter = 0;
    if (this.moveset == "WASD") {
      //W Taste
      if (keyIsDown(87)) {
        this.y = int(this.y) - 5 * this.penalty;
        for (var cir in circles) {
          if (circles[cir].collide(this)) {
            counter = 1;
            break;
          }
        }
        if (counter != 1) {
          this.y = int(this.y) + 5 * this.penalty;
        }
      }
      //S Taste
      if (keyIsDown(83)) {
        this.y = int(this.y) + 5 * this.penalty;
        for (var cir in circles) {
          if (circles[cir].collide(this)) {
            counter = 1;
            break;
          }
        }
        if (counter != 1) {
          this.y = int(this.y) - 5 * this.penalty;
        }
      }
      //A Taste
      if (keyIsDown(65)) {
        this.x = int(this.x) - 5 * this.penalty;
        for (var cir in circles) {
          if (circles[cir].collide(this)) {
            counter = 1;
            break;
          }
        }
        if (counter != 1) {
          this.x = int(this.x) + 5 * this.penalty;
        }
      }
      //D Taste
      if (keyIsDown(68)) {
        this.x = int(this.x) + 5 * this.penalty;
        for (var cir in circles) {
          if (circles[cir].collide(this)) {
            counter = 1;
            break;
          }
        }
        if (counter != 1) {
          this.x = int(this.x) - 5 * this.penalty;
        }
      }
    } else if (this.moveset == "ARROWS") {
      //Pfeiltaste oben
      if (keyIsDown(38)) {
        this.y = int(this.y) - 5 * this.penalty;
        for (var cir in circles) {
          if (circles[cir].collide(this)) {
            counter = 1;
            break;
          }
        }
        if (counter != 1) {
          this.y = int(this.y) + 5 * this.penalty;
        }
      }
      //Pfeiltaste unten
      if (keyIsDown(40)) {
        this.y = int(this.y) + 5 * this.penalty;
        for (var cir in circles) {
          if (circles[cir].collide(this)) {
            counter = 1;
            break;
          }
        }
        if (counter != 1) {
          this.y = int(this.y) - 5 * this.penalty;
        }
      }
      //Pfeiltaste links
      if (keyIsDown(37)) {
        this.x = int(this.x) - 5 * this.penalty;
        for (var cir in circles) {
          if (circles[cir].collide(this)) {
            counter = 1;
            break;
          }
        }
        if (counter != 1) {
          this.x = int(this.x) + 5 * this.penalty;
        }
      }
      //Pfeiltaste rechts
      if (keyIsDown(39)) {
        this.x = int(this.x) + 5 * this.penalty;
        for (var cir in circles) {
          if (circles[cir].collide(this)) {
            counter = 1;
            break;
          }
        }
        if (counter != 1) {
          this.x = int(this.x) - 5 * this.penalty;
        }
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
      if (circles[cir].collide(this) && circles[cir].color == "#00e5ff") {
        if (!this.cps.includes(circles[cir])) {
          append(this.cps, circles[cir]);
          circles[cir].halfcp();
        }
      } else if (
        circles[cir].collide(this) &&
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
