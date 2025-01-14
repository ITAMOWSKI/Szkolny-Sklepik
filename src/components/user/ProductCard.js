// components/user/ProductCard.js
import {Component} from "react";

/*****************************************************************************************************************************************
 * nazwa klasy:          ProductCard
 * opis klasy:          Komponent wyświetlający pojedynczy produkt
 * komponenty:          Card, Button
 * autor:               Mateusz Szelec 4AP
 ******************************************************************************************************************************************/
class ProductCard extends Component {
    render() {
        const { product } = this.props;
        return (
            <div className="card product-card bg-body-tertiary">
                <div className="card-body shadow">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                        <strong>Cena: {product.price.toFixed(2)} zł</strong>
                    </p>
                    <button
                        className="btn btn-success"
                        onClick={() => this.props.addToCart(this.props.product, 1)}>
                        <i className="bi bi-cart-plus-fill"></i>Dodaj do koszyka
                    </button>
                </div>
            </div>
        );
    }
}

export default ProductCard;