import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance } from "../../store/slices/playerSlice";
import "./SlotMachine.css";

const SYMBOLS = [
    { symbol: "🍒", weight: 30, payout: 5 },
    { symbol: "🍋", weight: 25, payout: 8 },
    { symbol: "🍉", weight: 20, payout: 10 },
    { symbol: "⭐", weight: 15, payout: 15 },
    { symbol: "🍇", weight: 12, payout: 20 },
    { symbol: "🔔", weight: 10, payout: 30 },
    { symbol: "💎", weight: 5, payout: 50 },
    { symbol: "🎁", weight: 4, payout: 0 },
    { symbol: "🌈", weight: 4, payout: 0 }, // Wild-symbol
];

const getRandomSymbol = () => {
    const totalWeight = SYMBOLS.reduce((acc, sym) => acc + sym.weight, 0);
    let rand = Math.floor(Math.random() * totalWeight);
    for (let sym of SYMBOLS) {
        if (rand < sym.weight)
            return sym.symbol;
        rand -= sym.weight;
    }
    return "🍒";
};

const SlotMachine = () => {
    const dispatch = useDispatch();
    const balance = useSelector((state) => state.player.balance);
    const [result, setResult] = useState(Array(5).fill("🍒"));  // 1x5 hjul
    const [message, setMessage] = useState("");
    const [freeSpins, setFreeSpins] = useState(0);
    const [bet, setBet] = useState(10);
    const [isSpinning, setIsSpinning] = useState(false);
    const [jackpot, setJackpot] = useState(500);

    const spin = () => {
        if (isSpinning) return;
        if (balance < bet && freeSpins === 0) {
            setMessage("💰 Not enough balance to spin!");
            return;
        }
        setIsSpinning(true);
        if (freeSpins > 0) {
            setFreeSpins(freeSpins - 1);
        } else {
            dispatch(updateBalance(-bet));
            setJackpot((prev) => prev + bet * 0.1);
        }
        const newResult = Array.from({ length: 5 }, () => getRandomSymbol());  // 1x5 hjul
        setResult(newResult);  // Direkt sätt resultatet till det nya
        setTimeout(() => {
            const winnings = calculateWinnings(newResult);
            dispatch(updateBalance(winnings));
            if (winnings > 0) {
                setMessage(`🎉 You won $${winnings}!`);
            } else {
                setMessage("😢 No win. Try again!");
            }
            setIsSpinning(false);
        }, 1500);  // Animationens varaktighet
    };

    const calculateWinnings = (grid) => {
        let payout = 0;
        let multiplier = 1;
        // Kontrollera horisontella vinster
        const firstSymbol = grid[0];
        if (grid.every((s) => s === firstSymbol || s === "🌈")) {
            const sym = SYMBOLS.find((s) => s.symbol === firstSymbol);
            if (sym) {
                payout += bet * sym.payout;
                multiplier += sym.payout / 100;
            }
        }
        // Bonus för 🎁
        const bonusCount = grid.filter((s) => s === "🎁").length;
        if (bonusCount >= 3) {
            setFreeSpins((prevFreeSpins) => prevFreeSpins + 3);
            setMessage((prevMessage) =>
                `${prevMessage} 🎁 Bonus unlocked! 3 free spins awarded!`
            );
            payout += bet * 5;
        }
        if (bonusCount >= 4) {
            setFreeSpins((prevFreeSpins) => prevFreeSpins + 5);
            setMessage((prevMessage) =>
                `${prevMessage} 🎁 Mega Bonus! 5 extra free spins!`
            );
            payout += bet * 10;
        }
        // Jackpot
        const isJackpot = grid.every((s) => s === "💎");
        if (isJackpot) {
            setMessage((prevMessage) =>
                `${prevMessage} 💎 JACKPOT! You won the jackpot!`
            );
            payout += jackpot;
            setJackpot(500); // Återställ jackpotten
        }
        return Math.floor(payout * multiplier);
    };

    return (
        <div className="slot-machine">
            <header>
                <h1>Lucky Empire 🎰</h1>
                <p>Spin the reels and try your luck!</p>
            </header>
            <div className="balance-section">
                <h3>Your Balance: ${balance}</h3>
                <p>Free Spins: {freeSpins}</p>
                <p>Bet Amount: ${bet}</p>
                <p>💎 Jackpot: ${jackpot}</p>
                <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={bet}
                    onChange={(e) => setBet(Number(e.target.value))}
                />
            </div>
            <div className="reels">
                <div className={`reel-row ${isSpinning ? "spinning" : ""}`}>
                    {result.map((symbol, colIndex) => (
                        <div
                            className={`reel ${isSpinning ? "spinning" : ""}`}
                            key={colIndex}
                        >
                            {symbol}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={spin} className="spin-button" disabled={isSpinning}>
                {isSpinning ? "Spinning..." : "Spin"}
            </button>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default SlotMachine;
