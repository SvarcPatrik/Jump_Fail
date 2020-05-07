import Player from "./player";
import InputHandler from "./input";
import Background from "./bg";
import Old from "./old";
import Coin from "./coin";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;
    this.player = new Player(this);
    this.bg = new Background();
    this.old = new Old();
    this.coin = new Coin();
    new InputHandler(this.player, this);
  }

  start() {
    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU
    ) {
      return;
    }
    this.player.update(deltaTime);
  }

  draw(ctx) {
    this.bg.draw(ctx);
    this.coin.draw(ctx);
    this.old.draw(ctx);
    this.player.draw(ctx);

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to start game",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
  }

  tooglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
