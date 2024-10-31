import Game from './index';

export type EnemyProps = {
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  word: string;
  lastLetterIndex: number;
  speed: number;
  damage: number;
  xp: number;
  targeted: boolean;
};

class Enemy {
  game: Game;
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  lastLetterIndex: number;
  word: string;
  speed: number;
  damage: number;
  xp: number;
  targeted: boolean;

  constructor(game: Game, {
    x,
    y,
    health,
    maxHealth,
    word
  }: {
    x: number;
    y: number;
    health: number;
    maxHealth: number;
    word: string;
  }) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.health = health;
    this.maxHealth = maxHealth;
    this.word = word.toLowerCase();
    this.lastLetterIndex = 0;
    this.speed = 1;
    this.damage = 10;
    this.xp = 10;
    this.targeted = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#B0AFA4";

    const textWidth = ctx.measureText(this.word).width;
    const textX = this.x - textWidth / 2;
    const textY = this.y - 30;

    for (let i = 0; i < this.word.length; i++) {
      if (i < this.lastLetterIndex || this.targeted) {
        ctx.fillStyle = "#656566";
      } else {
        ctx.fillStyle = "#B0AFA4";
      }
      ctx.fillText(this.word[i], textX + ctx.measureText(this.word.substring(0, i)).width, textY);
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, 7, 0, 2 * Math.PI);
    ctx.fillStyle = "#9E585F";
    ctx.fill();
    ctx.closePath();
  }

  update () {
    if (this.lastLetterIndex === this.word.length) {
      this.targeted = true
    }

    this.moveTowards(this.game.tower.x, this.game.tower.y);
  }

  moveTowards(targetX: number, targetY: number) {
    const angle = Math.atan2(targetY - this.y, targetX - this.x);
    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;
  }
}

export default Enemy;
