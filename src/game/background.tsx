import Game from './index';

class Background {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { width, height } = this.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    const maxRadius = Math.sqrt(centerX ** 2 + centerY ** 2);

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
    gradient.addColorStop(0, "#FFFFFA");
    gradient.addColorStop(1, "#B0AEA6");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
}

export default Background;
