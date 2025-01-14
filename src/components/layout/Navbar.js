// components/layout/Navbar.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        const { isAuthenticated, isAdmin, onLogout } = this.props;

        return (
            <nav className="navbar navbar-expand-lg bg-success shadow-lg sticky-top" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><i class="bi bi-bag-check-fill"></i>Szkolny Sklepik</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i className="bi bi-grid-3x3-gap-fill"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/"><i class="bi bi-house-door-fill"></i>Produkty</Link>
                            </li>
                            {isAuthenticated && !isAdmin && (
                                <>
                                    <li className="nav-item position-relative">
                                        <Link className="nav-link active" to="/cart"><i class="bi bi-basket3-fill"></i>Koszyk</Link>
                                        <span
                                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {this.props.cart.length}
                                                <span className="visually-hidden">unread messages</span>
                                          </span>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/order-history"><i class="bi bi-clock-history"></i>Historia zamówień</Link>
                                    </li>
                                </>
                            )}
                            {isAdmin && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/admin"><i className="bi bi-clipboard2-data-fill"></i>Panel administratora</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/admin/orders"><i className="bi bi-list-ul"></i>Zarządzanie zamówieniami</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/admin/products"><i className="bi bi-bag-plus-fill"></i>Zarządzanie produktami</Link>
                                    </li>

                                </>
                            )}
                        </ul>
                        <span className="navbar-text">
                            {!isAuthenticated ? (
                                <>
                                    <Link className="nav-link d-inline" to="/login"><i class="bi bi-box-arrow-in-right"></i>Logowanie</Link>
                                    <Link className="nav-link d-inline mx-2" to="/register"><i class="bi bi-person-plus-fill"></i>Rejestracja</Link>
                                </>
                            ) : (
                                <Link className="nav-link d-inline" onClick={onLogout}><i className="bi bi-box-arrow-right"></i>Wyloguj się</Link>
                            )}
                        </span>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;