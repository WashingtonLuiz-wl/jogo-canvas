export function drawHearts(ctx, hearts) {
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  hearts.forEach(h => {
    if (!h.collected) {
      // Atualiza escala individual
      h.scale += 0.02 * h.scaleDirection;
      if (h.scale > 1.2) h.scaleDirection = -1;
      else if (h.scale < 1) h.scaleDirection = 1;

      ctx.save();
      ctx.translate(h.x + 10, h.y + 10);
      ctx.scale(h.scale, h.scale);
      ctx.fillStyle = 'red';
      ctx.fillText('❤️', 0, 0);
      ctx.restore();
    }
  });
}
