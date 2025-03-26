import { jsx as _jsx } from "react/jsx-runtime";
import { useDispatch } from 'react-redux';
import { updateBalance } from '../../store/slices/playerSlice';
const WatchAd = () => {
    const dispatch = useDispatch();
    const handleWatchAd = () => {
        fetch('/api/player/watch-ad', {
            method: 'POST',
        })
            .then((res) => res.json())
            .then((data) => {
            alert(`You earned $${data.reward} for watching an ad!`);
            dispatch(updateBalance(data.reward));
        });
    };
    return (_jsx("div", { children: _jsx("button", { onClick: handleWatchAd, className: "watch-ad-button", children: "Watch Ad to Earn $50" }) }));
};
export default WatchAd;
