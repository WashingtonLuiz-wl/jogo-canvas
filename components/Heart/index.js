// Heart.js

let heartScale = 1;
let heartScaleDirection = 1;

export function drawHearts(ctx, hearts) {
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  hearts.forEach(h => {
    if (!h.collected) {
      // Atualiza escala
      heartScale += 0.02 * heartScaleDirection;
      if (heartScale > 1.2) heartScaleDirection = -1;
      else if (heartScale < 1) heartScaleDirection = 1;

      ctx.save();
      ctx.translate(h.x + 10, h.y + 10);
      ctx.scale(heartScale, heartScale);
      ctx.fillStyle = 'red';
      ctx.fillText('❤️', 0, 0);
      ctx.restore();
    }
  });
}
