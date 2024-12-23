import Background from "./background"
import Tower from "./tower"
import Bullet from "./bullet"
import Enemy from "./enemy"
import GameOverlay from "./game-overlay"

class Game {
  FPS: number
  MS_PER_UPDATE: number
  MS_ENEMY_SPAWN_INTERVAL: number

  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  isPaused: boolean
  elapsedTime: number
  private _lagInterval: number
  private previousTime: number
  private currentTime: number

  background: Background
  gameOverlay: GameOverlay
  tower: Tower
  enemys: Enemy[] = []
  bullets: Bullet[] = []
  minutsUntilBoss: number
  minutsUntilBossDefault: number
  timeSinceLastEnemySpawn: number
  perfectInputs: number
  onGameOver: () => void
  private _characterTypedCorrectly: boolean

  constructor({
    canvas,
    context
  }: {
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  }) {
    this.FPS = 60
    this.MS_PER_UPDATE = 1000 / this.FPS
    this.MS_ENEMY_SPAWN_INTERVAL = 3000;
    this.canvas = canvas
    this.context = context

    this.isPaused = false
    this._lagInterval = 0
    this.elapsedTime = 0
    this.previousTime = 0
    this.currentTime = 0
    this.timeSinceLastEnemySpawn = 0
    this.perfectInputs = 0
    this._characterTypedCorrectly = false
    this.minutsUntilBoss = 3
    this.minutsUntilBossDefault = 3
    this.onGameOver = () => {}

    this.background = new Background(this)
    this.gameOverlay = new GameOverlay(this)
    this.tower = new Tower(this, {
      health: 100,
      maxHealth: 100
    })
  }

  start() {
    this.handleInputs()
    this.gameLoop()
  }

  handleResize({ width, height }: { width: number, height: number }) {
    this.canvas.width = width
    this.canvas.height = height
  }

  handleInputs() {
    document.addEventListener("keydown", (event) => {
      this._characterTypedCorrectly = false
      if (event.key === "Escape") {
        this.isPaused = !this.isPaused
      }

      const isLetter = /^[A-Za-z]$/.test(event.key);
      if (!isLetter) return;

      if (this.isPaused) return

      for (let i = 0; i < this.enemys.length; i++) {
        const enemy = this.enemys[i];
        if (this.checkCharacter(enemy, event.key)) {
          const dx = enemy.x - this.tower.x;
          const dy = enemy.y - this.tower.y;
          const magnitude = Math.sqrt(dx * dx + dy * dy);
          const direction = { x: dx / magnitude, y: dy / magnitude };
          const bullet = new Bullet(this, {
            x: this.tower.x,
            y: this.tower.y,
            direction,
            targetIndex: i
          })
          this.bullets.push(bullet);
        }
      }

      if (this._characterTypedCorrectly) {
        this.perfectInputs += 1;
        this._characterTypedCorrectly = false;
      } else {
        this.perfectInputs = 0;
      }
    })
  }

  selectWorld (): string {
    const words = ["javascript", "typescript", "react", "node", "express", "mongodb", "mysql", "postgresql", "docker", "kubernetes", "aws", "gcp", "azure", "firebase", "heroku", "netlify", "vercel", "github", "gitlab", "bitbucket", "slack", "discord", "zoom", "google", "apple", "microsoft", "facebook", "twitter", "instagram", "linkedin", "youtube", "tiktok", "snapchat", "whatsapp", "telegram", "signal", "spotify", "netflix", "hulu", "amazon", "ebay", "walmart", "target", "bestbuy", "costco", "starbucks", "mcdonalds", "burgerking", "kfc", "pizzahut", "dominos", "subway", "chipotle", "tacobell", "wendys", "popeyes", "chickfila", "panera"]
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
  }

  timeUntilBoss () {
    return Math.max(this.minutsUntilBoss * 60 * 1000 - this.elapsedTime, 0);
  }

  handleEnemySpawn(deltaTime: number) {
    this.timeSinceLastEnemySpawn += deltaTime;
    const enemySpawTime = this.MS_ENEMY_SPAWN_INTERVAL - ((this.elapsedTime / 1000) * 5);

    const angle = Math.random() * 2 * Math.PI
    const distance = this.canvas.width > this.canvas.height ? this.canvas.width / 2 : this.canvas.height / 2
    const x = (this.canvas.width / 2) + Math.cos(angle) * distance
    const y = (this.canvas.height / 2) + Math.sin(angle) * distance

    if (this.timeUntilBoss() <= 300) {
      this.minutsUntilBoss += this.minutsUntilBossDefault;
      const enemy = new Enemy(this, {
        x,
        y,
        word: this.selectWorld(),
        type: 'boss'
      })
      this.enemys.push(enemy);
    } else if (this.timeSinceLastEnemySpawn >= enemySpawTime) {
      const enemy = new Enemy(this, {
        x,
        y,
        word: this.selectWorld(),
        type: 'normal'
      })
      this.enemys.push(enemy);
      this.timeSinceLastEnemySpawn = 0;
    }
  }

  gameLoop() {
    const loop = () => {
      if (this.isPaused) {
        return requestAnimationFrame(loop);
      }
      if (!document.hasFocus() && document.visibilityState !== "visible") {
        return this.isPaused = true
      }

      this.previousTime = this.currentTime;
      this.currentTime = this.elapsedTime
      const elapsed = this.currentTime - this.previousTime

      this._lagInterval += elapsed

      while (this._lagInterval >= this.MS_PER_UPDATE) {
        this.update(elapsed);
        this._lagInterval -= this.MS_PER_UPDATE
      }

      this.render();
      this.elapsedTime += this.MS_PER_UPDATE

      requestAnimationFrame(loop);
    }
    loop()
  }

  checkCharacter (enemy: Enemy, eventKey: string) {
    const isCorrectChar = enemy.word[enemy.lastLetterIndex] === eventKey;

    if (isCorrectChar) {
      this._characterTypedCorrectly = true;
      enemy.lastLetterIndex += 1;
      if (enemy.word.length === enemy.lastLetterIndex) {
        return true;
      }
    } else {
      enemy.lastLetterIndex = 0;
      if (enemy.word[0] === eventKey) {
        enemy.lastLetterIndex = 1;
      }
    }
    return false;
  };

  update(deltaTime: number) {
    if (this.tower.health <= 0) {
      this.isPaused = true
      this.onGameOver()
      return
    }
    this.handleEnemySpawn(deltaTime)

    for (let enemyIndex = 0; enemyIndex < this.enemys.length; enemyIndex++) {
      const enemy = this.enemys[enemyIndex];
      enemy.moveTowards(this.tower.x, this.tower.y);
      if (Math.abs(enemy.x - this.tower.x) < 20 && Math.abs(enemy.y - this.tower.y) < 20) {
        this.enemys.splice(enemyIndex, 1);
        this.tower.health -= enemy.damage;
        this.perfectInputs = 0;
        continue
      }

      for (let bulletIndex = this.bullets.length - 1; bulletIndex >= 0; bulletIndex--) {
        const bullet = this.bullets[bulletIndex];
        const dx = bullet.x - enemy.x;
        const dy = bullet.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < 10) {
          if (bullet.targetIndex === enemyIndex) {
            if (this.enemys[bullet.targetIndex]) {
              this.enemys[bullet.targetIndex].targeted = false;
            }
          }
          enemy.health -= bullet.damage;
          this.bullets.splice(bulletIndex, 1);
          this.tower.xp += enemy.xp;
          break;
        }
      }

      if (enemy.health <= 0) {
        this.enemys.splice(enemyIndex, 1);
      }

      enemy.update();
    }

    this.bullets.forEach(bullet => {
      bullet.update()
    })

    this.tower.update()
  }

  render() {
    this.background.draw(this.context)

    this.enemys.forEach(enemy => {
      enemy.draw(this.context)
    })

    this.bullets.forEach(bullet => {
      bullet.draw(this.context)
    })

    this.tower.draw(this.context)

    this.gameOverlay.draw(this.context)
  }

  pause() {
    this.isPaused = true
  }

  resume() {
    this.isPaused = false
  }
}

export default Game
