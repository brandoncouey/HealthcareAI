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

      // Debug logging
      if (allCards.length === 0) {
        console.log('No cards found!');
        return;
      }

      console.log(`Found ${problemCards.length} problem cards and ${solutionCards.length} solution cards`);

      allCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to card center
        const distance = Math.sqrt(
          Math.pow(e.clientX - cardCenterX, 2) + Math.pow(e.clientY - cardCenterY, 2)
        );

        // Remove neighbor glow class
        card.classList.remove('neighbor-glow');

        // If mouse is within 300px of card, add neighbor glow (increased range)
        if (distance < 300) {
          card.classList.add('neighbor-glow');
          console.log(`Card ${index} has neighbor glow, distance: ${distance.toFixed(0)}px`);
        }

        // Update the card's own mouse position for internal glow
        const cardRect = card.getBoundingClientRect();
        const relativeX = e.clientX - cardRect.left;
        const relativeY = e.clientY - cardRect.top;
        
        (card as HTMLElement).style.setProperty('--mouse-x', `${relativeX}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${relativeY}px`);
      });
    };

    // Add event listener with throttling for better performance
    let ticking = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    console.log('CursorEffects component mounted, adding mouse listener');
    document.addEventListener('mousemove', throttledMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
    };
  }, []);

  return null;
}
