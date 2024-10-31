import Game from './index';

export type TowerProps = {
  x: number
  y: number
  health: number
  maxHealth: number
  level: number;
  xp: number;
  xpToNextLevel: number;
}

class Tower {
  health: number
  maxHealth: number
  game: Game
  x: number;
  y: number;
  level: number;
  xp: number;
  xpToNextLevel: number;

  constructor(
    game: Game,
    {
      health = 100,
      maxHealth = 100,
      level = 1,
      xp = 0,
      xpToNextLevel = 50,
    }: {
      health?: number
      maxHealth?: number
      level?: number
      xp?: number
      xpToNextLevel?: number
    }
  ) {
    this.x = 0
    this.y = 0
    this.health = health
    this.maxHealth = maxHealth
    this.game = game
    this.level = level
    this.xp = xp
    this.xpToNextLevel = xpToNextLevel
  }

  update() {
    const { width, height } = this.game.viewSize;
    this.x = width / 2
    this.y = height / 2

    if (this.xp >= this.xpToNextLevel) {
      this.level += 1;
      this.xp = 0;
      this.xpToNextLevel = this.xpToNextLevel * 2;
      this.maxHealth = this.maxHealth * 2;
      this.health = this.maxHealth;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { tower } = this.game;
    const levelProgress = Math.min((tower.xp / tower.xpToNextLevel) * 100, 100);
    const endAngle = (levelProgress / 100) * (Math.PI * 2); // 360 graus = 2 * PI radianos

    ctx.beginPath()
    ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI)
    ctx.lineWidth = 5
    ctx.strokeStyle = "#656566"
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI)
    ctx.lineWidth = 2
    ctx.strokeStyle = "#EBECE3"
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(this.x, this.y, 10, 0, endAngle)
    ctx.lineWidth = 2
    ctx.strokeStyle = "#656566"
    ctx.stroke()
    ctx.closePath()

    const barWidth = 100;
    const barHeight = 6;

    ctx.beginPath();
    ctx.rect(this.x - barWidth / 2, this.y + 50, barWidth, barHeight);
    ctx.lineWidth = 2;
    ctx.fillStyle = "#EBECE3";
    ctx.fill();
    ctx.closePath();

    const healthWidth = (this.health / this.maxHealth) * barWidth;

    ctx.beginPath();
    ctx.rect(this.x - barWidth / 2, this.y + 50, healthWidth, barHeight);
    ctx.lineWidth = 2;
    ctx.fillStyle = "#656566";
    ctx.fill();
    ctx.closePath();

    const lifeText = `${this.health}/${this.maxHealth}`
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#B0AFA4";

    const textWidth = ctx.measureText(lifeText).width;
    const textX = this.x - textWidth / 2;
    const textY = this.y + 80;

    ctx.fillText(lifeText, textX, textY);
  }
}

export default Tower
