// components/admin/ProductManager.js
import { Component } from "react";

/*****************************************************************************************************************************************
 * nazwa klasy:          OrderManager
 * opis klasy:          Zarządzanie zamówieniami w systemie
 * komponenty:          Table, Button
 * autor:               Mateusz Szelec 4AP
 ******************************************************************************************************************************************/

class ProductManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newProduct: {
                name: '',
                price: '',
                category: '',
                description: ''
            },
            editProduct: null,
        };
    }

    /*****************************************************************************************************************************************
     * nazwa funkcji:        handleStatusChange
     * opis funkcji:         Obsługuje zmianę statusu zamówienia
     * parametry:           orderId - id zamówienia, newStatus - nowy status
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    handleInputChange = (e) => {
        const { name, value } = e.target;
        if (this.state.editProduct) {
            this.setState((prevState) => ({
                editProduct: { ...prevState.editProduct, [name]: value },
            }));
        } else {
            this.setState((prevState) => ({
                newProduct: { ...prevState.newProduct, [name]: value },
            }));
        }
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        handleSubmit
     * opis funkcji:         Obsługuje dodawanie nowego produktu lub aktualizację istniejącego produktu
     * parametry:           e - obiekt zdarzenia
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.editProduct) {
            this.props.updateProduct(this.state.editProduct);
            this.setState({ editProduct: null });
        } else {
            const newId = this.props.products.length
                ? Math.max(...this.props.products.map((p) => p.id)) + 1
                : 1;
            const newProduct = { ...this.state.newProduct, id: newId };
            this.props.addProduct(newProduct);
            this.setState({
                newProduct: { name: '', price: '', category: '', description: '' },
            });
        }
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        handleEdit
     * opis funkcji:         Inicjuje proces edycji produktu, wczytując dane istniejącego produktu do formularza
     * parametry:           product - obiekt produktu do edycji
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    handleEdit = (product) => {
        this.setState({ editProduct: { ...product } });
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        handleDelete
     * opis funkcji:         Usuwa produkt z listy na podstawie jego identyfikatora
     * parametry:           productId - identyfikator produktu do usunięcia
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    handleDelete = (productId) => {
        this.props.deleteProduct(productId);
    };

    render() {
        const { newProduct, editProduct } = this.state;
        const { products } = this.props;

        return (
            <div className="product-manager">
                <h3>Zarządzanie Produktami</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Nazwa produktu</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={editProduct ? editProduct.name : newProduct.name}
                            placeholder="Kanapka"
                            onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>Cena</label>
                        <div className="input-group mb-3">
                            <input
                                type="number"
                                name="price"
                                className="form-control"
                                value={editProduct ? editProduct.price : newProduct.price}
                                placeholder="2.50"
                                onChange={this.handleInputChange}/>
                            <span className="input-group-text">zł</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Kategoria</label>
                        <select
                            name="category"
                            className="form-control"
                            value={editProduct ? editProduct.category : newProduct.category}
                            onChange={this.handleInputChange}>
                            <option value="">Wybierz kategorię</option>
                            <option value="food">Jedzenie</option>
                            <option value="drinks">Napoje</option>
                            <option value="snacks">Przekąski</option>
                            <option value="fruits">Owoce</option>
                            <option value="dairy">Nabiał</option>
                        </select>
                    </div>
                    <div className="form-group mb-2">
                        <label>Opis</label>
                        <textarea
                            name="description"
                            className="form-control"
                            value={editProduct ? editProduct.description : newProduct.description}
                            placeholder="Krótki opis produktu"
                            onChange={this.handleInputChange}/>
                    </div>
                    <button type="submit" className="btn btn-success">
                        {editProduct ? 'Zaktualizuj produkt' : 'Dodaj produkt'}
                    </button>
                </form>

                <div className="mt-4">
                    <h4>Lista produktów</h4>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Cena</th>
                            <th>Kategoria</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price} zł</td>
                                <td>{product.category}</td>
                                <td>
                                    <div className="btn-group">
                                        <button
                                            className="btn btn-sm btn-warning mr-2"
                                            onClick={() => this.handleEdit(product)}>Edytuj</button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => this.handleDelete(product.id)}>Usuń</button>
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

export default ProductManager;

