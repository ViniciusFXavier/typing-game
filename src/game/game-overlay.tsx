import Game from './index';

class GameOverlay {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10); // Pega os dois primeiros dígitos de milissegundos

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(ms).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { tower, viewSize, elapsedTime } = this.game;
    const { width, height } = viewSize;
    const centerX = width / 2;
    const centerY = height / 2;
    const overlayHeight = 15;
    const rectangleWidth = 150;

    this.drawRectangle(ctx, centerX - rectangleWidth / 2, 0, rectangleWidth, overlayHeight, "#656566");

    this.drawCenteredText(ctx, "Boss Incoming In:", centerX, 12, "15px Arial", "#B0AFA4");

    this.drawCenteredText(ctx, `Level ${tower.level}`, centerX, 80, "25px Arial", "#656566");

    const levelProgress = Math.min((tower.xp / tower.xpToNextLevel) * 100, 100);
    this.drawRectangle(ctx, centerX - rectangleWidth / 2, 90, rectangleWidth, 8, "#B0AFA4");
    this.drawRectangle(ctx, centerX - rectangleWidth / 2, 90, (levelProgress / 100) * rectangleWidth, 8, "#656566");

    const timeUntilBoss = Math.max(3 * 60 * 1000 - elapsedTime, 0);
    const formattedTime = this.formatTime(timeUntilBoss);
    this.drawCenteredText(ctx, formattedTime, centerX, 50, "bold 35px Arial", "#656566");

    this.drawCenteredText(ctx, 'Perfect Inputs x176', centerX, centerY + 130, "25px Arial", "#656566");
  }

  private drawRectangle(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string): void {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  private drawCenteredText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, font: string, color: string): void {
    ctx.font = font;
    ctx.fillStyle = color;
    const textWidth = ctx.measureText(text).width;
    ctx.fillText(text, x - textWidth / 2, y);
  }
}

export default GameOverlay;
