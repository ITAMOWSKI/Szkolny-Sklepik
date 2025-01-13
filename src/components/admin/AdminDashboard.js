// components/admin/AdminDashboard.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*****************************************************************************************************************************************
 * nazwa klasy:          AdminDashboard
 * opis klasy:          Panel administratora wyświetlający statystyki i zarządzanie sklepem
 * komponenty:          Card, Link
 * autor:               Mateusz Szelec 4AP
 ******************************************************************************************************************************************/
class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalOrders: 0,
            totalProducts: 0,
            recentOrders: [],
            recentProducts: [],
        };
    }

    /*****************************************************************************************************************************************
     * nazwa funkcji:        componentDidMount
     * opis funkcji:         Inicjalizuje dane panelu administratora
     * parametry:           brak
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    componentDidMount() {
        const { products, orders } = this.props;

        const sortedOrders = orders ? [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)) : [];
        const recentOrders = sortedOrders.slice(0, 3);

        const sortedProducts = products ? [...products].sort((a, b) => b.id - a.id) : [];
        const recentProducts = sortedProducts.slice(0, 3);

        this.setState({
            totalProducts: products ? products.length : 0,
            totalOrders: orders ? orders.length : 0,
            recentOrders,
            recentProducts,
        });
    }

    render() {
        const { totalOrders, totalProducts, recentOrders, recentProducts } = this.state;

        return (
            <div className="admin-dashboard">
                <h2>Panel Administratora</h2>
                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card mb-3 bg-body-tertiary">
                            <div className="card-body">
                                <h5 className="card-title">Zamówienia</h5>
                                <p className="card-text">Liczba zamówień: {totalOrders}</p>
                                <h6>Ostatnio dodane zamówienia:</h6>
                                <ul>
                                    {recentOrders.map(order => (
                                        <li key={order.id}>
                                            {order.user} - {order.date} - {order.total.toFixed(2)} zł
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/admin/orders" className="btn btn-success">
                                    Zarządzaj zamówieniami
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-3 bg-body-tertiary">
                            <div className="card-body">
                                <h5 className="card-title">Produkty</h5>
                                <p className="card-text">Liczba produktów: {totalProducts}</p>
                                <h6>Ostatnio dodane produkty:</h6>
                                <ul>
                                    {recentProducts.map(product => (
                                        <li key={product.id}>
                                            {product.name} - {product.price.toFixed(2)} zł
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/admin/products" className="btn btn-success">
                                    Zarządzaj produktami
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;