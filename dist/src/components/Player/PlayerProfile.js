import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './PlayerProfile.css';
const PlayerProfile = ({ name, level, balance, vipLevel }) => {
    return (_jsxs("div", { className: "player-profile", children: [_jsx("h2", { children: name }), _jsxs("p", { children: ["Level: ", level] }), _jsxs("p", { children: ["Balance: $", balance] }), _jsxs("p", { children: ["VIP Level: ", vipLevel] })] }));
};
export default PlayerProfile;
