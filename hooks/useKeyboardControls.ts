import { useEffect } from 'react';

import { jump } from '@/components/Movements';

export const useKeyboardControls = ({
  keys,
  player,
  jumpForce,
}: {
  keys: any;
  player: any;
  jumpForce: number;
}) => {
  useEffect(() => {
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
    };
  }, []);
};
