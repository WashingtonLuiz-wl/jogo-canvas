export function applyGravity(player, gravity, groundLevel, bricks) {
  player.dy += gravity;
  player.y += player.dy;

  player.onGround = false;

  // Colisão chão do cenário
  if (player.y + player.height >= groundLevel) {
    player.y = groundLevel - player.height;
    player.dy = 0;
    player.onGround = true;
  }

  if (bricks) {
    // Colisão com tijolos (blocos)
    bricks?.forEach(brick => {
      const brickTop = brick.y;
      const brickLeft = brick.x;
      const brickRight = brick.x + 50;
      const brickBottom = brick.y + 50;

      const playerBottom = player.y + player.height;
      const playerLeft = player.x;
      const playerRight = player.x + player.width;

      // Se o player estiver caindo e encostando no topo do tijolo
      if (
        player.dy >= 0 && // caindo ou parado verticalmente
        playerBottom > brickTop &&
        playerBottom < brickBottom && // só colide no topo do bloco
        playerRight > brickLeft &&
        playerLeft < brickRight
      ) {
        player.y = brickTop - player.height;
        player.dy = 0;
        player.onGround = true;
      }
    });
  }
}

export function movePlayer(player, keys, speed) {
  const canvasWidth = 1024;
  const minX = 0;
  const maxX = canvasWidth - player.width;

  if (keys.ArrowRight && player.x + speed <= maxX) {
    player.x += speed;
  }

  if (keys.ArrowLeft && player.x - speed >= minX) {
    player.x -= speed;
  }
}

export function jump(player, jumpForce) {
  if (player.onGround) {
    player.dy = jumpForce;
    player.onGround = false;
  }
}
