import { useEffect, useRef } from 'react';
import { Matrix } from './matrixTypes';
import { MATRIX_CONFIG, MATRIX_RESTART_KEYS, type MatrixConfig } from './matrixConfig';

export default function MatrixBackground({ config = MATRIX_CONFIG }: { config?: MatrixConfig }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixRef = useRef<Matrix | null>(null);
  const frameRef = useRef<number>(0);
  const previousTimeRef = useRef<number | null>(null);
  const lastRestartConfigRef = useRef<MatrixConfig>(config);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cancelled = false;
    let resizeTimeout: number | undefined;

    const start = () => {
      if (cancelled || matrixRef.current) return;

      matrixRef.current = new Matrix(ctx, config);

      const loop = (time: number) => {
        if (cancelled) return;

        if (previousTimeRef.current === null) {
          previousTimeRef.current = time;
        }
        const deltaTime = time - previousTimeRef.current;
        previousTimeRef.current = time;

        matrixRef.current?.update(deltaTime);
        matrixRef.current?.draw();
        frameRef.current = requestAnimationFrame(loop);
      };

      frameRef.current = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        matrixRef.current?.resize();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    document.fonts
      .load(`${config.fontSize}px ${config.fontFamily}`)
      .then(start)
      .catch(start);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      matrixRef.current = null;
    };
  }, []);

  useEffect(() => {
    const shouldRestart = MATRIX_RESTART_KEYS.some(
      (key) => lastRestartConfigRef.current[key] !== config[key],
    );

    lastRestartConfigRef.current = config;

    if (!matrixRef.current) return;

    if (shouldRestart) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx) return;

      cancelAnimationFrame(frameRef.current);
      previousTimeRef.current = null;
      matrixRef.current = null;
      matrixRef.current = new Matrix(ctx, config);

      const loop = (time: number) => {
        if (previousTimeRef.current === null) {
          previousTimeRef.current = time;
        }
        const deltaTime = time - previousTimeRef.current;
        previousTimeRef.current = time;

        matrixRef.current?.update(deltaTime);
        matrixRef.current?.draw();
        frameRef.current = requestAnimationFrame(loop);
      };

      frameRef.current = requestAnimationFrame(loop);
      return;
    }

    matrixRef.current.updateSettings(config);
  }, [config]);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
}
