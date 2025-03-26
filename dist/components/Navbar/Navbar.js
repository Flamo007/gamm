import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
    const navigate = useNavigate();
    return (_jsxs("nav", { className: "navbar", children: [_jsx("div", { className: "navbar-logo", onClick: () => navigate('/'), children: "Lucky Empire" }), _jsxs("ul", { className: "navbar-links", children: [_jsx("li", { children: _jsx(Link, { to: "/games", children: "Games" }) }), _jsx("li", { children: _jsx(Link, { to: "/profile", children: "Profile" }) }), _jsx("li", { children: _jsx(Link, { to: "/rewards", children: "Rewards" }) }), _jsx("li", { children: _jsx(Link, { to: "/news", children: "News" }) })] })] }));
};
export default Navbar;
