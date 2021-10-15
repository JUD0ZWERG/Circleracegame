let circles = [];
let circlecords = [];
let gameWin = false;
let started = false;
let sinceMousePress = 0;
let timer = 3;
let players = [];
let checkpoints = 20; //UNGEFÄHRE Checkpointanzahl
let itemNumber = 3;
let cp = 0; //Zum zählen der tatsächlichen Checkpointanzahl

let gameTimer = 0;
let items = [];

let scoreboard;

let result;
function preload() {
  let randkarte = str(int(random(2, 11)) + 1)
  karte = "cords(" + randkarte + ")";
  result = loadStrings("Spielfelder/" + karte + ".txt");

  url = "https://codeweek-scoreboard-b92vu.ondigitalocean.app/score?q=Circlerace - " + karte + "&_sort=score&_limit=1"
  httpGet(
    url,
    "json",
    false,
    function (response) {
      scoreboard = response;
    }
  );
}

function setup() {
  for (var res in result) {
    if (result[res].split(",").length == 2) {
      append(circlecords, [
        result[res].split(",")[0],
        result[res].split(",")[1],
      ]);
    }
  }

  createCanvas(1000, 500);
  frameRate(30);

  player = new Player(circlecords[0][0], circlecords[0][1], "lime", "WASD");
  append(players, player);
  player = new Player(circlecords[0][0], circlecords[0][1], "orange", "ARROWS");
  append(players, player);

  for (var circlecord in circlecords) {
    createCircle(
      circlecords[circlecord][0],
      circlecords[circlecord][1],
      circles
    );
  }

  //Checkpoints
  for (var cir in circles) {
    if (cir % int(circles.length / checkpoints) == 0) {
      circles[cir].cpcircle();
    }
  }

  circles[0].startcircle();
  circles[circles.length - 1].endcircle();

  //Checkpoints Pt. 2
  for (var cir in circles) {
    if (circles[cir].color == "#00e5ff") {
      cp++;
    }
  }

  for (var i = 0; i < itemNumber; i++) {
    a = int(random(1, circles.length - 1));
    item = new Item(circles[a].x, circles[a].y, "yellow")
    append(items, item)
  }


}

function draw() {
  if (scoreboard[0]["score"] == 0) {
    print(url)
  }

  if (gameWin) {
    return;
  }

  if (!started) {
    background(0, 0, 0);
    textSize(40);
    fill("yellow");
    text("Starte das Spiel, indem du mit der Maus klickst.", 50, height / 2);
    if (mouseIsPressed) {
      sinceMousePress = frameCount;
      started = true;
    }
    return;
  }

  if ((frameCount - sinceMousePress) % 30 == 0) {
    if ((frameCount - sinceMousePress) / 30 < 4) {
      timer -= 1;
    }
  }

  background(255, 255, 255);

  for (var cir in circles) {
    circles[cir].draw();
  }

  for (var cir in circles) {
    //Die Checkpoints müssen herausstechen.
    if (circles[cir].color == "#ccffff") {
      circles[cir].draw();
    }
    if (circles[cir].color == "#00e5ff") {
      circles[cir].draw();
    }
  }
  circles[0].draw(); //Der Anfangskreis muss herausstechen
  circles[circles.length - 1].draw(); //Der Endkreis muss herausstechen

  for (player in players) {
    //if (players[player].color == "lime"){
    //  print(players[player].penalty)
    //}
    if (frameCount - sinceMousePress < 90) {
      //Damit man sich die ersten 3 Sekunden nicht bewegen kann.
      players[player].draw();
      textSize(200);
      fill("black");
      text(timer, width / 2 - 100, height / 2);
      return;
    }
    if (gameTimer == 0) {
      gameTimer = frameCount;
    }

    players[player].move(circles);
    players[player].draw();
    if (
      circles[circles.length - 1].collide(players[player].x, players[player].y) &&
      players[player].cps.length == cp
    ) {
      win(players[player]);
      break;
    }

    for (item in items) {
      items[item].draw()
      if (items[item].collide(players[player].x, players[player].y)) {
        players[player].item = true;
        items.splice(item, 1)
      }
    }


  }
  textSize(30);
  fill("black");
  stroke('black')
  text(
    str(int((((frameCount - gameTimer) / 30) * 10) / 10)) + "s",
    width - 100,
    50
  );
}

function createCircle(x, y, array) {
  curcircle = new Limitationcircle(x, y);
  append(array, curcircle);
}

function win(winner) {
  background((0, 0, 0));
  fill(winner.color);
  textSize(30);
  text(
    "Der Spieler mit der Farbe '" + str(winner.color) + "' hat gewonnen",
    50,
    height / 2
  );
  text(
    "und benötigte dafür " +
    str(int(((frameCount - gameTimer) / 30) * 100) / 100) +
    "s",
    50,
    height / 2 + 30
  );
  gameWin = true;

  if (scoreboard.length != 0) {
    highscore = scoreboard[0]["score"];
    print(highscore)
    if (int(((frameCount - gameTimer) / 30) * 100) / 100 < highscore) {
      text(
        "Herzlichen Glühstrumpf, du den alten Rekord um " +
        str(int((highscore - ((frameCount - gameTimer) / 30)) * 100) / 100) +
        "s geschlagen!",
        50,
        height / 2 + 60
      );
    } else {
      text(
        "Dir hätten noch " +
        str(int(((frameCount - gameTimer) / 30 - highscore) * 100) / 100) +
        "s gefehlt, um die Bestzeit zu schlagen!",
        50,
        height / 2 + 60
      );
    }
  }

  let url = "https://codeweek-scoreboard-b92vu.ondigitalocean.app/score";
  let postData = {
    game: "Circlerace - " + karte,
    userName: winner.color,
    score: int(((frameCount - gameTimer) / 30) * 100) / 100,
  };
  httpPost(url, "json", postData);
}



//Namen eintragen können beim Leaderboard

//https://hackmd.io/BCDS6HauTRq-U8llJTUU5Q

