// components/user/Cart.js
import React, { Component } from 'react';
import {Link} from "react-router-dom";

/*****************************************************************************************************************************************
 * nazwa klasy:          Cart
 * opis klasy:          Koszyk zakupowy użytkownika
 * komponenty:          Table, Link
 * autor:               Mateusz Szelec 4AP
 ******************************************************************************************************************************************/
class Cart extends Component {
    /*****************************************************************************************************************************************
     * nazwa funkcji:        calculateTotal
     * opis funkcji:         Oblicza łączną wartość produktów w koszyku
     * parametry:           brak
     * zwracany typ:        number - suma wartości produktów
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    calculateTotal = () => {
        return this.props.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    render() {
        const { cart, onRemoveItem } = this.props;

        return (
            <div>
                <h3>Koszyk</h3>
                {cart.length === 0 ? (
                    <p>Twój koszyk jest pusty</p>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Produkt</th>
                                    <th>Cena</th>
                                    <th>Ilość</th>
                                    <th>Suma</th>
                                    <th>Akcje</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cart.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.price.toFixed(2)} zł</td>
                                        <td>{item.quantity}</td>
                                        <td>{(item.price * item.quantity).toFixed(2)} zł</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => onRemoveItem(item.id)}
                                            >
                                                Usuń
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="cart-summary">
                            <h4>Podsumowanie</h4>
                            <p><strong>Suma całkowita: {this.calculateTotal().toFixed(2)} zł</strong></p>
                            <button className="btn btn-success">
                                <Link to="/order" className="text-white text-decoration-none">
                                    Przejdź do zamówienia
                                </Link>
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }
}


export default Cart;