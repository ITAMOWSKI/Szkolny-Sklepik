// components/user/OrderHistory.js
import React, { Component } from 'react';

class OrderHistory extends Component {
    state = {
        orders: [],
        loading: true,
        error: null,
        filterStatus: 'all'
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                orders: [
                    {
                        id: 1,
                        date: '2024-01-13',
                        items: [
                            { name: 'Kanapka', quantity: 2, price: 5.00 },
                            { name: 'Sok', quantity: 1, price: 3.50 }
                        ],
                        status: 'completed',
                        totalAmount: 13.50,
                        deliveryTime: '8:45',
                        paymentMethod: 'cash'
                    }
                ],
                loading: false
            });
        }, 1000);
    }

    getStatusBadgeClass = (status) => {
        const classes = {
            new: 'badge-primary',
            inProgress: 'badge-warning',
            completed: 'badge-success',
            cancelled: 'badge-danger'
        };
        return `badge ${classes[status] || 'badge-secondary'}`;
    };

    getStatusText = (status) => {
        const texts = {
            new: 'Nowe',
            inProgress: 'W realizacji',
            completed: 'Zrealizowane',
            cancelled: 'Anulowane'
        };
        return texts[status] || status;
    };

    handleFilterChange = (e) => {
        this.setState({ filterStatus: e.target.value });
    };

    render() {
        const { orders, loading, error, filterStatus } = this.state;

        if (loading) {
            return <div className="text-center">Ładowanie historii zamówień...</div>;
        }

        if (error) {
            return <div className="alert alert-danger">{error}</div>;
        }

        const filteredOrders = filterStatus === 'all'
            ? orders
            : orders.filter(order => order.status === filterStatus);

        return (
            <div>
                <h3>Historia zamówień</h3>
                <div className="mb-3">
                    <select
                        className="form-select w-auto"
                        value={filterStatus}
                        onChange={this.handleFilterChange}
                    >
                        <option value="all">Wszystkie zamówienia</option>
                        <option value="new">Nowe</option>
                        <option value="inProgress">W realizacji</option>
                        <option value="completed">Zrealizowane</option>
                        <option value="cancelled">Anulowane</option>
                    </select>
                </div>

                {filteredOrders.length === 0 ? (
                    <p>Brak zamówień do wyświetlenia</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Nr zamówienia</th>
                                <th>Data</th>
                                <th>Produkty</th>
                                <th>Kwota</th>
                                <th>Status</th>
                                <th>Szczegóły</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>
                                        <ul className="list-unstyled mb-0">
                                            {order.items.map((item, index) => (
                                                <li key={index}>
                                                    {item.name} x {item.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{order.totalAmount.toFixed(2)} zł</td>
                                    <td>
                      <span className={this.getStatusBadgeClass(order.status)} className="badge rounded-pill text-bg-success">
                        {this.getStatusText(order.status)}
                      </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={() => this.props.onShowDetails(order)}
                                        >
                                            Pokaż
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}

export default OrderHistory;