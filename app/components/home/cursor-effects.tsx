'use client';

import { useEffect } from 'react';

export default function CursorEffects() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update CSS custom properties for mouse position
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);

      // Get all problem and solution cards
      const problemCards = document.querySelectorAll('.problem-card');
      const solutionCards = document.querySelectorAll('.solution-card');
      const allCards = [...problemCards, ...solutionCards];

      allCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to card center
        const distance = Math.sqrt(
          Math.pow(e.clientX - cardCenterX, 2) + Math.pow(e.clientY - cardCenterY, 2)
        );

        // Remove neighbor glow class
        card.classList.remove('neighbor-glow');

        // If mouse is within 200px of card, add neighbor glow
        if (distance < 200) {
          card.classList.add('neighbor-glow');
        }

        // Update the card's own mouse position for internal glow
        const cardRect = card.getBoundingClientRect();
        const relativeX = e.clientX - cardRect.left;
        const relativeY = e.clientY - cardRect.top;
        
        (card as HTMLElement).style.setProperty('--mouse-x', `${relativeX}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${relativeY}px`);
      });
    };

    // Add event listener
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}
