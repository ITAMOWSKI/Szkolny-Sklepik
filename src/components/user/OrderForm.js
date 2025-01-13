// components/user/OrderForm.js
import React, { Component } from 'react';
import {Link} from "react-router-dom";

/*****************************************************************************************************************************************
 * nazwa klasy:          OrderForm
 * opis klasy:          Formularz składania zamówienia
 * komponenty:          Form, Table
 * autor:               Mateusz Szelec 4AP
 ******************************************************************************************************************************************/
class OrderForm extends Component {
    state = {
        deliveryTime: '',
        paymentMethod: 'cash',
        notes: '',
        termsAccepted: false,
        error: null
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        handleSubmit
     * opis funkcji:         Obsługuje wysłanie formularza zamówienia
     * parametry:           e - obiekt zdarzenia
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    handleSubmit = (e) => {
        e.preventDefault();
        const { deliveryTime, paymentMethod, notes, termsAccepted } = this.state;
        const { onSubmit } = this.props;

        if (!termsAccepted) {
            this.setState({ error: 'Proszę zaakceptować regulamin' });
            return;
        }

        if (!deliveryTime) {
            this.setState({ error: 'Proszę wybrać godzinę odbioru' });
            return;
        }

        const orderData = {
            deliveryTime,
            paymentMethod,
            notes,
            items: this.props.items,
            totalAmount: this.props.totalAmount,
            orderDate: new Date().toISOString()
        };

        onSubmit(orderData);

        this.setState({ cart: [] }, () => {
            alert('Zamówienie zostało złożone pomyślnie!');
        });
    };

    handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        this.setState({
            [name]: type === 'checkbox' ? checked : value,
            error: null
        });
    };

    render() {
        const { items, totalAmount } = this.props;
        const { error } = this.state;

        if (items.length === 0) {
            return <p>Twój koszyk jest pusty. Wróć do <Link to="/">strony głównej</Link>.</p>;
        }

        return (
            <div className="card">
                <div className="card-body bg-body-tertiary">
                    <h3 className="card-title">Formularz zamówienia</h3>
                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Godzina odbioru</label>
                            <select
                                name="deliveryTime"
                                className="form-select"
                                onChange={this.handleInputChange}
                                value={this.state.deliveryTime}
                            >
                                <option value="">Wybierz godzinę</option>
                                <option value="8:45">8:45 - Pierwsza przerwa</option>
                                <option value="9:40">9:40 - Druga przerwa</option>
                                <option value="10:35">10:35 - Trzecia przerwa</option>
                                <option value="11:20">10:35 - Czwarta przerwa</option>
                                <option value="12:15">10:35 - Piąta przerwa</option>
                                <option value="13:15">10:35 - Szósta przerwa</option>
                                <option value="14:10">10:35 - Siódma przerwa</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Metoda płatności</label>
                            <select
                                name="paymentMethod"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.paymentMethod}
                            >
                                <option value="cash">Gotówka</option>
                                <option value="card">Karta płatnicza</option>
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label>Uwagi do zamówienia</label>
                            <textarea
                                name="notes"
                                className="form-control"
                                rows="3"
                                onChange={this.handleInputChange}
                                placeholder="(Opcionalne)"
                                value={this.state.notes}
                            ></textarea>
                        </div>

                        <div className="table-responsive mb-3">
                            <table className="table table-striped border">
                                <thead>
                                <tr>
                                    <th>Produkt</th>
                                    <th>Ilość</th>
                                    <th>Cena</th>
                                </tr>
                                </thead>
                                <tbody>
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{(item.price * item.quantity).toFixed(2)} zł</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="2"><strong>Razem:</strong></td>
                                    <td><strong>{totalAmount.toFixed(2)} zł</strong></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="form-group mb-3">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="termsAccepted"
                                    name="termsAccepted"
                                    checked={this.state.termsAccepted}
                                    onChange={this.handleInputChange}
                                />
                                <label className="form-check-label" for="termsAccepted">
                                    Akceptuję regulamin sklepiku
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success btn-lg btn-block">
                            <i class="bi bi-cart-check-fill"></i>Złóż zamówienie
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default OrderForm;