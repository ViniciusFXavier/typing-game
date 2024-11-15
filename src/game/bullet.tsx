import Game from './index';

export type BulletProps = {
  x: number;
  y: number;
  direction: { x: number, y: number };
  speed: number;
  damage: number;
  trailLength: number;
  targetIndex?: number;
};

class Bullet {
  game: Game;
  x: number;
  y: number;
  direction: { x: number, y: number };
  speed: number;
  damage: number;
  trail: { x: number, y: number }[];
  trailLength: number;
  targetIndex?: number;

  constructor(game: Game, {
    x,
    y,
    direction,
    targetIndex,
  }: {
    x: number;
    y: number;
    direction: { x: number, y: number };
    targetIndex: number;
  }) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = 5;
    this.damage = 100;
    this.trail = [];
    this.trailLength = 20;
    this.targetIndex = targetIndex;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.trail.forEach((pos, index) => {
      const opacity = 1 - index / this.trail.length;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(101, 101, 102, ${opacity})`;
      ctx.fill();
    });

    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "#656566";
    ctx.fill();
  }

  update() {
    this.trail.unshift({ x: this.x, y: this.y });
    if (this.trail.length > this.trailLength) {
      this.trail.pop();
    }

    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;

    const distanceMax = this.game.canvas.width > this.game.canvas.height ? this.game.canvas.width : this.game.canvas.height
    if (this.x < 0 || this.x > distanceMax || this.y < 0 || this.y > distanceMax) {
      this.game.bullets = this.game.bullets.filter(bullet => bullet !== this);
    }
  }
}

export default Bullet;