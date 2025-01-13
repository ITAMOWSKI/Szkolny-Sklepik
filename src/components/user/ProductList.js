// components/user/ProductList.js
import React, { Component } from 'react';
import ProductCard from './ProductCard';

/*****************************************************************************************************************************************
 * nazwa klasy:          ProductList
 * opis klasy:          Lista produktów z funkcjami filtrowania
 * komponenty:          ProductCard, Form
 * autor:               Mateusz Szelec 4AP
 ******************************************************************************************************************************************/

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            category: 'all',
        };
    }

    /*****************************************************************************************************************************************
     * nazwa funkcji:        handleSearch
     * opis funkcji:         Obsługuje wyszukiwanie produktów
     * parametry:           e - obiekt zdarzenia
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    handleSearch = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        handleCategoryChange
     * opis funkcji:         Obsługuje filtrowanie produktów po kategorii
     * parametry:           e - obiekt zdarzenia
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    handleCategoryChange = (e) => {
        this.setState({ category: e.target.value });
    };

    render() {
        const { products, addToCart } = this.props;
        const { searchTerm, category } = this.state;

        const filteredProducts = products.filter(
            (product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (category === 'all' || product.category === category)
        );

        return (
            <div>
                <div className="row mb-4">
                    <div className="col-md-8 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Szukaj produktów..."
                            onChange={this.handleSearch}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            onChange={this.handleCategoryChange}
                        >
                            <option value="all">Wszystkie kategorie</option>
                            <option value="food">Jedzenie</option>
                            <option value="drinks">Napoje</option>
                            <option value="snacks">Przekąski</option>
                            <option value="fruits">Owoce</option>
                            <option value="dairy">Nabiał</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <ProductCard product={product} addToCart={addToCart} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ProductList;
