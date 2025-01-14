// components/auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

/*****************************************************************************************************************************************
 * nazwa komponentu:     Login
 * opis komponentu:     Komponent obsługujący logowanie użytkowników
 * komponenty:          Form, Link
 * autor:               Mateusz Szelec 4AP
 ******************************************************************************************************************************************/
const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    /*****************************************************************************************************************************************
     * nazwa funkcji:        handleSubmit
     * opis funkcji:         Obsługuje wysłanie formularza logowania
     * parametry:           e - obiekt zdarzenia
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    const handleSubmit = (e) => {
        e.preventDefault();

        const validUsers = [
            { email: 'admin@example.com', password: 'admin123', isAdmin: true },
            { email: 'user@example.com', password: 'user123', isAdmin: false }
        ];

        const user = validUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            setError(null);
            const userData = {
                email: user.email,
                isAdmin: user.isAdmin
            };
            onLogin(userData);
            navigate('/');
        } else {
            setError('Nieprawidłowy email lub hasło');
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Logowanie</h3>
                        <div className="d-flex mb-3">
                            Nie masz konta?
                                <Link className="icon-link icon-link-hover mx-1" to="/Register">Utwórz je<i className="bi bi-arrow-right p-0"></i></Link>
                        </div>
                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    placeholder="jan@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required/>
                            </div>
                            <div className="form-group mb-2">
                                <label>Hasło</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required/>
                            </div>
                            <button type="submit" className="btn btn-success btn-block">Zaloguj się</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;