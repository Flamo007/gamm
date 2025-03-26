import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerProfile from '../../src/components/Player/PlayerProfile';
describe('PlayerProfile', () => {
    it('should display player information', () => {
        render(_jsx(PlayerProfile, { name: "Player123", level: 10, balance: 1000, vipLevel: "Gold" }));
        expect(screen.getByText(/Player123/i)).toBeInTheDocument();
        expect(screen.getByText(/Level: 10/i)).toBeInTheDocument();
        expect(screen.getByText(/Balance: \$1000/i)).toBeInTheDocument();
        expect(screen.getByText(/VIP Level: Gold/i)).toBeInTheDocument();
    });
});
