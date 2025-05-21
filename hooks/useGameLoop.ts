import { useEffect } from 'react';

import { checkCollision, checkGoal } from '@/components/Collision';
import { drawGram } from '@/components/Gram';
import { drawHearts } from '@/components/Heart';
import { applyGravity, movePlayer, jump } from '@/components/Movements';

export const useGameLoop = ({
  canvasRef,
  player,
  goal,
  hearts,
  gravity,
  keys,
  jumpForce,
  onNextPhase,
}: {
  canvasRef: any;
  player: any;
  goal: any;
  hearts: any[];
  gravity: number;
  keys: any;
  jumpForce: number;
  onNextPhase: () => void;
}) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawGoal = () => {
      const img = new Image();
      img.src = hearts.every(h => h.collected) ? goal.openSprite : goal.sprite;
      ctx.drawImage(img, goal.x, goal.y, goal.width, goal.height);
    };

    const update = () => {
      movePlayer(player, keys, 5);
      applyGravity(player, gravity, 280);

      hearts.forEach(h => {
        if (!h.collected && checkCollision(player, h)) {
          h.collected = true;
        }
      });

      if (hearts.every(h => h.collected) && checkGoal(player, goal)) {
        onNextPhase();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGram(ctx);
      player.draw(ctx);
      drawHearts(ctx, hearts);
      drawGoal();
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    player.image.onload = () => loop();
  }, [canvasRef, goal, gravity, hearts, keys, onNextPhase, player]);
};
