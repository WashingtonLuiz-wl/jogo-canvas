export const drawBricks = (img, ctx, positions) => {
  const brickWidth = 32;
  const brickHeight = 32;

  positions?.forEach(pos => {
    // Desenha a imagem do tijolo na posição e tamanho especificados
    ctx.drawImage(img, pos.x, pos.y, brickWidth, brickHeight);
  });
};
