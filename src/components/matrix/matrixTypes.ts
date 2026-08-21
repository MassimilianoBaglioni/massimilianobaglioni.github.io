import { CHARACTER_SETS, type MatrixConfig } from './matrixConfig';

export class MatrixPointer {
  position: number;
  trailLenght: number;
  trail: string[];

  constructor(position: number, trailLenght: number) {
    this.position = position;
    this.trailLenght = trailLenght;
    this.trail = new Array(trailLenght).fill(' ');
  }
}

export class MatrixColumn {
  speed: number;
  cooldown: number;
  pointers: MatrixPointer[];
  elapsed: number;

  constructor(speed: number, cooldown: number) {
    this.speed = speed;
    this.cooldown = cooldown;
    this.pointers = [];
    this.elapsed = 0;
  }

  addPointer(pointer: MatrixPointer) {
    this.pointers.unshift(pointer);
  }
}

export class Matrix {
  private ctx: CanvasRenderingContext2D;
  private cellWidth: number;
  private cellHeight: number;
  private columns: MatrixColumn[] = [];
  private rows: number;
  private settings: MatrixConfig;
  private cursorx = 0;
  private cursory = 0;
  private characters = Object.values(CHARACTER_SETS).join('');

  constructor(ctx: CanvasRenderingContext2D, settings: MatrixConfig) {
    console.count('Matrix constructed');
    this.ctx = ctx;
    this.settings = settings;
    this.characters = settings.characters;

    this.setupCanvas();

    this.cellWidth = ctx.measureText('A').width + settings.cellGap;
    this.cellHeight = settings.fontSize + settings.cellGap;

    const columnsNumber = Math.floor(window.innerWidth / this.cellWidth);
    console.log('columnsNumber ' + columnsNumber);

    this.initColumns(columnsNumber);
    this.rows = Math.floor(window.innerHeight / this.cellHeight);

    window.addEventListener('mousemove', (event) => {
      this.setCursorPosition(event.clientX, event.clientY);
    });
  }

  private setupCanvas() {
    const canvas = this.ctx.canvas;
    const dpr = window.devicePixelRatio;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    this.ctx.scale(dpr, dpr);
    this.ctx.font = `${this.settings.fontWeight} ${this.settings.fontSize}px ${this.settings.fontFamily}`;
    this.ctx.fillStyle = this.settings.color;
    this.ctx.globalAlpha = this.settings.alpha;
  }

  resize() {
    this.setupCanvas();

    const columnsNumber = Math.floor(window.innerWidth / this.cellWidth);
    this.rows = Math.floor(window.innerHeight / this.cellHeight);

    if (columnsNumber > this.columns.length) {
      this.initColumns(columnsNumber - this.columns.length);
    } else if (columnsNumber < this.columns.length) {
      this.columns.length = columnsNumber;
    }
  }

  private setCursorPosition(x: number, y: number) {
    this.cursorx = x;
    this.cursory = y;
  }

  private initColumns(columnsNumber: number) {
    for (let i = 0; i < columnsNumber; i++) {
      const speed = this.randomNumberFromRange(this.settings.minSpeed, this.settings.maxSpeed);
      const cooldown = this.randomNumberFromRange(
        this.settings.minCooldown,
        this.settings.maxCooldown,
      );

      const newColumn = new MatrixColumn(speed, cooldown);

      const withPointer = Math.random() < this.settings.density;

      if (withPointer) {
        this.spawnPointer(newColumn);
      }

      this.columns.push(newColumn);
    }
  }

  spawnPointer(newColumn: MatrixColumn) {
    const trailLenght = Math.floor(
      this.randomNumberFromRange(this.settings.minTrailLenght, this.settings.maxTrailLenght),
    );

    newColumn.addPointer(new MatrixPointer(0, trailLenght));

    const gap = Math.floor(
      this.randomNumberFromRange(this.settings.minCooldown, this.settings.maxCooldown),
    );

    newColumn.cooldown = trailLenght + 1 + gap;
  }

  updateSettings(nextSettings: Partial<MatrixConfig>) {
    this.settings = { ...this.settings, ...nextSettings };
    if (nextSettings.characters !== undefined) {
      this.characters = nextSettings.characters;
    }

    if (nextSettings.color !== undefined) {
      this.ctx.fillStyle = this.settings.color;
    }

    if (nextSettings.alpha !== undefined) {
      this.ctx.globalAlpha = this.settings.alpha;
    }

    if (nextSettings.cursorRadius !== undefined) {
      this.cursorx = this.cursorx;
      this.cursory = this.cursory;
    }
  }

  update(deltaTime: number) {
    for (const col of this.columns) {
      col.elapsed += deltaTime;

      while (col.elapsed >= col.speed) {
        col.elapsed -= col.speed;

        for (let i = col.pointers.length - 1; i >= 0; i--) {
          const pointer = col.pointers[i];

          pointer.trail.push(this.randomCharacter());
          pointer.trail.shift();
          pointer.position += 1;

          if (pointer.position - pointer.trailLenght >= this.rows) {
            col.pointers.splice(i, 1);
          }
        }

        if (col.cooldown > 0) {
          col.cooldown -= 1;
        }

        if (col.cooldown <= 0) {
          this.spawnPointer(col);
        }
      }
    }
  }

  draw() {
    // clear first
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // draw now
    for (const [colIndex, col] of this.columns.entries()) {
      for (let pointer of col.pointers) {
        for (const [charIndex, char] of pointer.trail.entries()) {
          this.writeChar(char, colIndex, pointer.position - pointer.trailLenght + charIndex);
        }
      }
    }
  }

  private randomCharacter(): string {
    return this.characters[Math.floor(Math.random() * this.characters.length)];
  }

  writeChar(char: string, x: number, y: number) {
    let calculated_x = x * this.cellWidth;
    let calculated_y = y * this.cellHeight;
    if (this.isInsideCursorRange(calculated_x, calculated_y)) {
      this.ctx.fillStyle = this.settings.accentColor;
      this.ctx.globalAlpha = this.settings.effectAlpha;
      this.ctx.fillText(char, calculated_x, calculated_y);
      this.ctx.fillStyle = this.settings.color;
      this.ctx.globalAlpha = this.settings.alpha;
    } else {
      this.ctx.fillText(char, calculated_x, calculated_y);
    }
  }

  private isInsideCursorRange(x: number, y: number): boolean {
    const dx = x - this.cursorx;
    const dy = y - this.cursory;

    const distanceSquared = dx * dx + dy * dy;

    return distanceSquared <= this.settings.cursorRadius * this.settings.cursorRadius;
  }

  randomNumberFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
