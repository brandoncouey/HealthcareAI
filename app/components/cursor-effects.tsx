'use client';

import { useEffect } from 'react';

export default function CursorEffects() {
  useEffect(() => {
    const problemCards = document.querySelectorAll('.problem-card');
    const solutionCards = document.querySelectorAll('.solution-card');

    if (!problemCards.length && !solutionCards.length) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Update CSS variables for cursor position
      document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);

      // Handle neighbor glow effects
      let hasNeighborGlow = false;

      // Check problem cards
      problemCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX - cardCenterX, 2) + Math.pow(mouseY - cardCenterY, 2)
        );

        // Remove existing neighbor glow
        card.classList.remove('neighbor-glow');

        // Add neighbor glow if mouse is within 200px of card center
        if (distance < 200) {
          card.classList.add('neighbor-glow');
          hasNeighborGlow = true;
        }
      });

      // Check solution cards
      solutionCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX - cardCenterX, 2) + Math.pow(mouseY - cardCenterY, 2)
        );

        // Remove existing neighbor glow
        card.classList.remove('neighbor-glow');

        // Add neighbor glow if mouse is within 200px of card center
        if (distance < 200) {
          card.classList.add('neighbor-glow');
          hasNeighborGlow = true;
        }
      });
    };

    // Throttle mouse move events for better performance
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

    document.addEventListener('mousemove', throttledMouseMove);

    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
    };
  }, []);

  return null;
}
