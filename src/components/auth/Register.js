// components/auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Register = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Hasła nie są identyczne');
            return;
        }

        const newUser = {
            email,
            password,
            name,
            class: className,
            isAdmin: false
        };

        onRegister(newUser);

        navigate('/login');
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Rejestracja</h3>
                        <div className="d-flex mb-3">
                            Masz już konto?
                            <Link className="icon-link icon-link-hover mx-1" to="/Login">
                                Zaloguj się
                                <i className="bi bi-arrow-right p-0"></i>
                            </Link>
                        </div>
                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-9">
                                    <label>Imię i nazwisko</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-3">
                                    <label>Klasa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={className}
                                        onChange={(e) => setClassName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Hasło</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label>Potwierdź hasło</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success btn-block">
                                Zarejestruj się
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;