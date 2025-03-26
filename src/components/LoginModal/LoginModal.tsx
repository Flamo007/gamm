import React from 'react';
import './LoginModal.css';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  return (
    <div className="login-modal">
      <div className="modal-content">
        <h2>Login</h2>
        <input type="text" placeholder="Enter your username" className="login-input" />
        <button onClick={onLogin} className="login-button">Login</button>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default LoginModal;