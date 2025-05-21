'use client';

import { MoveLeft, MoveRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { drawBricks } from '@/components/Bricks';
import { checkCollision, checkGoal } from '@/components/Collision';
import { drawGram } from '@/components/Gram';
import { drawHearts } from '@/components/Heart';
import { applyGravity, movePlayer, jump } from '@/components/Movements';
import { phases } from '@/components/Phases';
import { Player } from '@/components/Player';

export default function Jogo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // evita erro se canvas ainda não estiver disponível

    canvas.width = 1024;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const phase = phases[currentPhaseIndex];
    const player = new Player(50, 280, 29, 44, '/person.png', 6, 29, 44);
    const gravity = 1;
    const jumpForce = -15;
    const keys = { ArrowRight: false, ArrowLeft: false };

    // Copia profunda dos corações da fase atual
    const hearts = phase.hearts.map(h => ({ ...h, collected: false }));
    const goal = {
      ...phase.goal,
      width: 64,
      height: 64,
      sprite: '/door.png',
      openSprite: '/door-open.png',
    };

    let allCollected = false;

    const drawGoal = () => {
      const img = new Image();
      img.src = allCollected ? goal.openSprite : goal.sprite;
      ctx.drawImage(img, goal.x, goal.y, goal.width, goal.height);
    };

    const brickImg = new Image();
    brickImg.src = '/brick.png'; // seu arquivo pixel art de tijolo

    const update = () => {
      movePlayer(player, keys, 5);
      applyGravity(player, gravity, 300, phases[currentPhaseIndex]?.bricks);

      // Verifica colisões com os corações
      hearts.forEach(h => {
        if (!h.collected && checkCollision(player, h)) {
          h.collected = true;
        }
      });

      allCollected = hearts.every(h => h.collected);

      if (allCollected && checkGoal(player, goal)) {
        const nextIndex = currentPhaseIndex + 1;

        if (nextIndex < phases.length) {
          // alert(phases[nextIndex].message);
          setCurrentPhaseIndex(nextIndex);
        } else {
          alert('🎉 Parabéns pelos 9 anos! Você venceu o jogo do amor! 💖');
          window.location.reload();
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGram(ctx);

      drawBricks(brickImg, ctx, phases[currentPhaseIndex]?.bricks);

      player.draw(ctx);
      drawHearts(ctx, hearts);
      drawGoal();
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    player.image.onload = () => {
      loop(); // só começa o loop quando a imagem estiver pronta
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight') keys.ArrowRight = true;
      if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
      if (e.code === 'Space' && player.onGround) jump(player, jumpForce);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight') keys.ArrowRight = false;
      if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    player.image.onload = () => {
      loop();
    };

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentPhaseIndex]);

  return (
    <div className="bg-accent-foreground flex h-screen flex-col items-center justify-center gap-4 text-white">
      <h1 className="text-5xl text-white">❤️ 9 Anos Jogando ao Seu Lado ❤️</h1>
      <canvas
        ref={canvasRef}
        width={1024}
        height={360}
        style={{ border: '3px solid #333', backgroundColor: '#87CEEB' }}
      />

      <div className="flex w-[640px] flex-col gap-2">
        <h2 className="text-lg font-bold">Controles:</h2>

        <div className="flex flex-row gap-16">
          <div className="flex flex-col justify-between">
            <span className="text-base font-medium">Movimentar:</span>
            <div className="flex flex-row gap-8">
              <MoveLeft /> <MoveRight />
            </div>
            <span className="text-sm">Setas esquerda/direita</span>
          </div>

          <div className="flex flex-col justify-between">
            <span className="text-base font-medium">Pular:</span>
            <div className="h-[10px] w-[50px] rounded-xs bg-white"></div>{' '}
            <span className="text-sm">Barra de espaço</span>
          </div>
        </div>
      </div>
    </div>
  );
}
