export function checkCollision(a, b) {
  return (
    a.x < b.x + 20 &&
    a.x + a.width > b.x &&
    a.y < b.y + 20 &&
    a.y + a.height > b.y
  );
}

export function checkGoal(player, goal) {
  return (
    player.x < goal.x + goal.width &&
    player.x + player.width > goal.x &&
    player.y < goal.y + goal.height &&
    player.y + player.height > goal.y
  );
}
