// components/admin/OrderManager.js
import {Component} from "react";

/*****************************************************************************************************************************************
 * nazwa klasy:          OrderManager
 * opis klasy:          Zarządzanie zamówieniami w systemie
 * komponenty:          Table, Button
 * autor:               Mateusz Szelec 4AP
 ******************************************************************************************************************************************/

class OrderManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            filterStatus: 'all'
        };
    }

    componentDidMount() {

    }

    /*****************************************************************************************************************************************
     * nazwa funkcji:        handleStatusChange
     * opis funkcji:         Obsługuje zmianę statusu zamówienia
     * parametry:           orderId - id zamówienia, newStatus - nowy status
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    handleStatusChange = (orderId, newStatus) => {
        this.setState(prevState => ({
            orders: prevState.orders.map(order =>
                order.id === orderId
                    ? { ...order, status: newStatus }
                    : order
            )
        }));
    }

    /*****************************************************************************************************************************************
     * nazwa funkcji:        getStatusBadgeClass
     * opis funkcji:         Zwraca odpowiednią klasę CSS dla oznaczenia statusu zamówienia
     * parametry:           status - status zamówienia
     * zwracany typ:        string (klasa CSS)
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    getStatusBadgeClass = (status) => {
        const classes = {
            new: 'text-bg-primary',
            processing: 'text-bg-warning',
            completed: 'text-bg-success',
            cancelled: 'text-bg-danger'
        };
        return `badge ${classes[status] || 'badge-secondary'}`;
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        getStatusDisplayName
     * opis funkcji:         Zwraca nazwę wyświetlaną dla danego statusu zamówienia
     * parametry:           status - status zamówienia
     * zwracany typ:        string (nazwa statusu)
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    getStatusDisplayName = (status) => {
        const names = {
            new: 'Nowe',
            processing: 'W realizacji',
            completed: 'Zrealizowane',
            cancelled: 'Anulowane'
        };
        return names[status] || 'Nieznany';
    };

    render() {
        const { orders } = this.props;
        const { filterStatus } = this.state;
        const filteredOrders = filterStatus === 'all'
            ? orders
            : orders.filter(order => order.status === filterStatus);

        return (
            <div>
                <h3>Zarządzanie Zamówieniami</h3>
                <div className="mb-3">
                    <select
                        className="form-select w-auto"
                        value={filterStatus}
                        onChange={(e) => this.setState({ filterStatus: e.target.value })}
                    >
                        <option value="all">Wszystkie zamówienia</option>
                        <option value="new">Nowe</option>
                        <option value="processing">W realizacji</option>
                        <option value="completed">Zrealizowane</option>
                        <option value="cancelled">Anulowane</option>
                    </select>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Klient</th>
                            <th>Produkty</th>
                            <th>Suma</th>
                            <th>Godzina odbioru</th>
                            <th>Status</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.user}</td>
                                <td>
                                    {order.items.map(item => (
                                        <div key={item.name}>
                                            {item.name} x {item.quantity}
                                        </div>
                                    ))}
                                </td>
                                <td>{order.total.toFixed(2)} zł</td>
                                <td>{order.pickupTime}</td>
                                <td>
                <span className={this.getStatusBadgeClass(order.status)}>
                    {this.getStatusDisplayName(order.status)}
                </span>
                                </td>
                                <td>
                                    <div className="btn-group">
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => this.handleStatusChange(order.id, 'completed')}
                                        >
                                            Zrealizuj
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => this.handleStatusChange(order.id, 'cancelled')}
                                        >
                                            Anuluj
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default OrderManager;