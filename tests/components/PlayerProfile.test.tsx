// tests/components/PlayerProfile.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Justera importvägen baserat på var din komponent är lagrad
import PlayerProfile from '../../src/components/Player/PlayerProfile'; // Korrigerad väg

describe('PlayerProfile', () => {
  it('should display player information', () => {
    // Rendera komponenten med testdata
    render(
      <PlayerProfile
        name="Player123"
        level={10}
        balance={1000}
        vipLevel="Gold"
      />
    );

    // Kontrollera att all information renderas korrekt
    expect(screen.getByText(/Player123/i)).toBeInTheDocument();
    expect(screen.getByText(/Level: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Balance: \$1000/i)).toBeInTheDocument();
    expect(screen.getByText(/VIP Level: Gold/i)).toBeInTheDocument();
  });
});
