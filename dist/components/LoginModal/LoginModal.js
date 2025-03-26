import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './LoginModal.css';
const LoginModal = ({ onClose, onLogin }) => {
    return (_jsx("div", { className: "login-modal", children: _jsxs("div", { className: "modal-content", children: [_jsx("h2", { children: "Login" }), _jsx("input", { type: "text", placeholder: "Enter your username", className: "login-input" }), _jsx("button", { onClick: onLogin, className: "login-button", children: "Login" }), _jsx("button", { onClick: onClose, className: "close-button", children: "Close" })] }) }));
};
export default LoginModal;
