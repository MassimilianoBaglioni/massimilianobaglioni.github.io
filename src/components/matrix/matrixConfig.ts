export type MatrixConfig = {
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  cellGap: number;
  density: number;
  minSpeed: number;
  maxSpeed: number;
  minCooldown: number;
  maxCooldown: number;
  minTrailLenght: number;
  maxTrailLenght: number;
  characters: string;
  color: string;
  accentColor: string;
  alpha: number;
  effectAlpha: number;
  cursorRadius: number;
};

export const CHARACTER_SETS = {
  latinUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  latinLower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  japanese: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  symbols: '!@#$%^&*+-=<>',
};

export const CHARACTER_SET_OPTIONS = [
  { key: 'latinUpper', label: 'Latin uppercase', value: CHARACTER_SETS.latinUpper },
  { key: 'latinLower', label: 'Latin lowercase', value: CHARACTER_SETS.latinLower },
  { key: 'numbers', label: 'Numbers', value: CHARACTER_SETS.numbers },
  { key: 'japanese', label: 'Japanese', value: CHARACTER_SETS.japanese },
  { key: 'symbols', label: 'Symbols', value: CHARACTER_SETS.symbols },
] as const;

export const DEFAULT_CHARACTER_SET_KEYS = ['latinUpper', 'latinLower', 'numbers'] as const;

export function buildCharacterSet(selectedKeys: Iterable<string>): string {
  const selected = Array.from(new Set(selectedKeys));

  if (selected.length === 0) {
    return DEFAULT_MATRIX_CONFIG.characters;
  }

  return CHARACTER_SET_OPTIONS.filter((option) => selected.includes(option.key)).reduce(
    (result, option) => result + option.value,
    '',
  );
}

export const DEFAULT_MATRIX_CONFIG: MatrixConfig = {
  fontSize: 16,
  fontFamily: 'JetBrains Mono',
  fontWeight: 'bold',
  cellGap: 2,
  density: 0.4,
  minSpeed: 100,
  maxSpeed: 400,
  minCooldown: 15,
  maxCooldown: 30,
  minTrailLenght: 1,
  maxTrailLenght: 30,
  characters: buildCharacterSet(DEFAULT_CHARACTER_SET_KEYS),
  color: '#9ec7b5',
  accentColor: '#7ee7a8',
  alpha: 0.18,
  effectAlpha: 0.8,
  cursorRadius: 100,
};

export const MATRIX_CONFIG = DEFAULT_MATRIX_CONFIG;

export const MATRIX_RESTART_KEYS: Array<keyof Pick<
  MatrixConfig,
  | 'fontSize'
  | 'fontFamily'
  | 'fontWeight'
  | 'cellGap'
  | 'density'
  | 'minSpeed'
  | 'maxSpeed'
  | 'minCooldown'
  | 'maxCooldown'
  | 'minTrailLenght'
  | 'maxTrailLenght'
  | 'characters'
>> = [
  'fontSize',
  'fontFamily',
  'fontWeight',
  'cellGap',
  'density',
  'minSpeed',
  'maxSpeed',
  'minCooldown',
  'maxCooldown',
  'minTrailLenght',
  'maxTrailLenght',
  'characters',
];
