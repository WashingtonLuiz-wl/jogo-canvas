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
  const requestIdRef = useRef<number | null>(null);

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const frasesRomanticas = [
    'Você é minha fase favorita. ❤️',
    'Nosso amor não tem game over.',
    'Você faz meu coração pular mais alto!',
    'A melhor fase da minha vida é com você.',
    'Contigo, até os espinhos viram flores.',
    'Fase nova, amor de sempre. 💖',
    'Somos o melhor time de todos.',
    'Te amo até o último nível.',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 1024;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const phase = phases[currentPhaseIndex];
    const player = new Player(50, 280, 29, 44, '/person.png', 6, 29, 44);
    const gravity = 1;
    const jumpForce = -15;
    const keys = { ArrowRight: false, ArrowLeft: false };

    const hearts = phase.hearts.map(h => ({
      ...h,
      collected: false,
      scale: 1,
      scaleDirection: 1,
    }));

    const goal = {
      ...phase.goal,
      width: 64,
      height: 64,
      sprite: '/door.png',
      openSprite: '/door-open.png',
    };

    let collectedHearts = 0;
    let allCollected = false;

    const brickImg = new Image();
    brickImg.src = '/brick.png';

    const drawGoal = () => {
      const img = new Image();
      img.src = allCollected ? goal.openSprite : goal.sprite;
      ctx.drawImage(img, goal.x, goal.y, goal.width, goal.height);
    };

    const update = () => {
      if (isTransitioning) return; // para atualizar durante transição

      movePlayer(player, keys, 5);
      applyGravity(player, gravity, 300, phases[currentPhaseIndex]?.bricks);

      hearts.forEach(h => {
        if (!h.collected && checkCollision(player, h)) {
          h.collected = true;
          collectedHearts += 1;
        }
      });

      allCollected = hearts.every(h => h.collected);

      if (allCollected && checkGoal(player, goal)) {
        const nextIndex = currentPhaseIndex + 1;

        if (nextIndex < phases.length) {
          setIsTransitioning(true);

          // para o loop antes do setTimeout
          if (requestIdRef.current) {
            cancelAnimationFrame(requestIdRef.current);
            requestIdRef.current = null;
          }

          setTimeout(() => {
            setCurrentPhaseIndex(nextIndex);
            setIsTransitioning(false);
            collectedHearts = 0;
          }, 1000);
        } else {
          setCompleted(true);
          // para o loop porque o jogo acabou
          if (requestIdRef.current) {
            cancelAnimationFrame(requestIdRef.current);
            requestIdRef.current = null;
          }
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

      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`❤️ ${collectedHearts} / ${phase.hearts.length}`, 10, 30);
    };

    const loop = () => {
      update();
      draw();
      if (!isTransitioning && !completed) {
        requestIdRef.current = requestAnimationFrame(loop);
      }
    };

    player.image.onload = () => {
      loop();
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

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [currentPhaseIndex, isTransitioning, completed]);

  return (
    <div className="bg-accent-foreground relative flex h-screen flex-col items-center justify-center gap-4 text-white">
      {!completed ? (
        <>
          <h1 className="text-5xl text-white">
            ❤️ Fase {currentPhaseIndex + 1}❤️
          </h1>
          <canvas
            ref={canvasRef}
            width={1024}
            height={360}
            style={{ border: '3px solid #333', backgroundColor: '#87CEEB' }}
          />

          <div className="flex w-[1024px] flex-col gap-2">
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
        </>
      ) : (
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold text-pink-500">
            🎉 Você venceu o jogo do amor! 💖
          </h1>
          <p className="max-w-xl text-xl">
            Foram 9 fases, cada uma representando um ano de uma linda história a
            dois. Que venham muitos outros níveis pela frente. Te amo! 💕
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-pink-500 px-6 py-2 text-lg font-semibold text-white hover:bg-pink-600"
          >
            Jogar novamente
          </button>
        </div>
      )}

      {isTransitioning && (
        <div className="bg-opacity-80 animate-fade absolute inset-0 z-50 flex items-center justify-center bg-black px-4 text-center text-2xl font-semibold text-white">
          {frasesRomanticas[currentPhaseIndex]}
        </div>
      )}
    </div>
  );
}
