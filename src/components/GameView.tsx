import { useRef, useEffect, useState } from "react";
import Game from "../game";
import './GameView.scss'

const GameView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);

  const [viewSize, setViewSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    gameRef.current = new Game({
      canvas,
      context
    });

    gameRef.current.onGameOver = () => {
      setIsGameOver(true);
    };

    gameRef.current.start();

    return () => {
      gameRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const canvas = canvasRef.current;

      setViewSize({ width, height });
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }

      if (gameRef.current) {
        gameRef.current.handleResize({ width, height });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRestart = () => {
    if (gameRef.current) {
      setIsGameOver(false);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;

      gameRef.current = new Game({
        canvas,
        context
      });

      gameRef.current.onGameOver = () => {
        setIsGameOver(true);
      };

      gameRef.current.start();
    }
  };

  return (
    <>
      {isGameOver && (
        <button className="restart-button" onClick={handleRestart}>Restart</button>
      )}
      <canvas ref={canvasRef} width={viewSize.width} height={viewSize.height} />
    </>
  );
};

export default GameView;
