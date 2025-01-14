// app.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProductList from './components/user/ProductList';
import ProductCard from './components/user/ProductCard';
import OrderForm from './components/user/OrderForm';
import OrderHistory from './components/user/OrderHistory';
import AdminDashboard from './components/admin/AdminDashboard';
import ProductManager from './components/admin/ProductManager';
import OrderManager from './components/admin/OrderManager';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Cart from './components/user/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/*****************************************************************************************************************************************
 * nazwa klasy:           App
 * opis klasy:           Główna klasa aplikacji zawierająca routing i zarządzanie stanem globalnym
 * komponenty:           BrowserRouter, Route, Routes, oraz wszystkie komponenty aplikacji
 * autor:                Mateusz Szelec 4AP
 ******************************************************************************************************************************************/

class App extends Component {
    /*****************************************************************************************************************************************
     * nazwa funkcji:        constructor
     * opis funkcji:         Inicjalizuje stan aplikacji z domyślnymi wartościami
     * parametry:           props - właściwości przekazane do komponentu
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isAdmin: false,
            user: null,
            cart: [],
            users: [],
            products: [],
            orders: [],
        };
    }

    /*****************************************************************************************************************************************
     * nazwa funkcji:        componentDidMount
     * opis funkcji:         Inicjalizuje dane aplikacji po zamontowaniu komponentu
     * parametry:           brak
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    componentDidMount() {
        this.setState({
            products: [
                { id: 1, name: 'Kanapka', price: 5.00, category: 'food', description: 'Świeża kanapka z szynką i serem' },
                { id: 2, name: 'Sok pomarańczowy', price: 3.50, category: 'drinks', description: 'Naturalny sok 100%' },
                { id: 3, name: 'Baton czekoladowy', price: 2.00, category: 'snacks', description: 'Słodki baton z mleczną czekoladą' },
                { id: 4, name: 'Woda mineralna', price: 2.50, category: 'drinks', description: 'Czysta woda mineralna, gazowana' },
                { id: 5, name: 'Jabłko', price: 1.50, category: 'fruits', description: 'Świeże, soczyste jabłko' },
                { id: 6, name: 'Muffin czekoladowy', price: 4.00, category: 'snacks', description: 'Puszysta muffinka z kawałkami czekolady' },
                { id: 7, name: 'Herbata mrożona', price: 3.00, category: 'drinks', description: 'Orzeźwiająca mrożona herbata cytrynowa' },
                { id: 8, name: 'Kanapka wegetariańska', price: 5.50, category: 'food', description: 'Kanapka z humusem i świeżymi warzywami' },
                { id: 9, name: 'Jogurt owocowy', price: 3.20, category: 'dairy', description: 'Jogurt naturalny z dodatkiem owoców' },
                { id: 10, name: 'Banan', price: 2.00, category: 'fruits', description: 'Dojrzały, słodki banan' },
                { id: 11, name: 'Chipsy', price: 3.50, category: 'snacks', description: 'Chrupiące chipsy solone' },
                { id: 12, name: 'Czekolada mleczna', price: 4.00, category: 'snacks', description: 'Tabliczka delikatnej mlecznej czekolady' },
                { id: 13, name: 'Kawa na wynos', price: 6.00, category: 'drinks', description: 'Świeżo zaparzona kawa w kubku termicznym' },
                { id: 14, name: 'Sałatka owocowa', price: 7.00, category: 'food', description: 'Lekka sałatka z różnych świeżych owoców' },
                { id: 15, name: 'Bułka z masłem', price: 2.50, category: 'food', description: 'Świeża bułka z masłem' }
            ],
            orders: [
                {
                    id: 1,
                    user: 'Jan Kowalski',
                    items: [
                        { name: 'Kanapka', quantity: 2, price: 5.00 },
                        { name: 'Sok pomarańczowy', quantity: 1, price: 3.50 }
                    ],
                    status: 'new',
                    total: 13.50,
                    date: '2024-01-13',
                    pickupTime: '8:45'
                },
                {
                    id: 2,
                    user: 'Anna Nowak',
                    items: [
                        { name: 'Muffin czekoladowy', quantity: 2, price: 4.00 },
                        { name: 'Kawa na wynos', quantity: 1, price: 6.00 }
                    ],
                    status: 'processing',
                    total: 14.00,
                    date: '2024-01-14',
                    pickupTime: '9:40'
                },
                {
                    id: 3,
                    user: 'Tomasz Wiśniewski',
                    items: [
                        { name: 'Chipsy', quantity: 1, price: 3.50 },
                        { name: 'Woda mineralna', quantity: 2, price: 2.50 }
                    ],
                    status: 'completed',
                    total: 8.50,
                    date: '2024-01-12',
                    pickupTime: '10:25'
                },
                {
                    id: 4,
                    user: 'Katarzyna Zielińska',
                    items: [
                        { name: 'Jabłko', quantity: 3, price: 1.50 },
                        { name: 'Jogurt owocowy', quantity: 1, price: 3.20 }
                    ],
                    status: 'new',
                    total: 7.70,
                    date: '2024-01-13',
                    pickupTime: '11:20'
                },
                {
                    id: 5,
                    user: 'Marek Kwiatkowski',
                    items: [
                        { name: 'Kanapka wegetariańska', quantity: 1, price: 5.50 },
                        { name: 'Herbata mrożona', quantity: 1, price: 3.00 },
                        { name: 'Baton czekoladowy', quantity: 2, price: 2.00 }
                    ],
                    status: 'new',
                    total: 12.50,
                    date: '2024-01-13',
                    pickupTime: '12:15'
                }
            ]
        });
    }

    /*****************************************************************************************************************************************
     * nazwa funkcji:        login
     * opis funkcji:         Obsługuje proces logowania użytkownika
     * parametry:           userData - obiekt zawierający dane użytkownika
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    login = (userData) => {
        this.setState({
            isAuthenticated: true,
            isAdmin: userData.isAdmin,
            user: userData,
        });
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        logout
     * opis funkcji:         Obsługuje proces wylogowania użytkownika
     * parametry:           brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    logout = () => {
        this.setState({
            isAuthenticated: false,
            isAdmin: false,
            user: null,
            cart: [],
        });
        this.props.history.push("/");
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        addToCart
     * opis funkcji:         Dodaje produkt do koszyka
     * parametry:           product - obiekt produktu, quantity - ilość
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    addToCart = (product, quantity) => {

        this.setState((prevState) => {
            const existingItemIndex = prevState.cart.findIndex(item => item.id === product.id);
            if (existingItemIndex >= 0) {
                const updatedCart = [...prevState.cart];
                updatedCart[existingItemIndex].quantity += quantity;
                if (updatedCart[existingItemIndex].quantity >= 10) {
                    alert("Nie można dodać więcej niż 10 sztuk tego produktu.");
                    return prevState;
                }
                return { cart: updatedCart };
            } else {
                return { cart: [...prevState.cart, { ...product, quantity }] };
            }
        });
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        removeFromCart
     * opis funkcji:         Usuwa produkt z koszyka na podstawie jego identyfikatora
     * parametry:           productId - identyfikator produktu do usunięcia
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    removeFromCart = (productId) => {
        this.setState((prevState) => ({
            cart: prevState.cart.filter((item) => item.id !== productId),
        }));
    };

    /*****************************************************************************************************************************************
    * nazwa funkcji:        addProduct
    * opis funkcji:         Dodaje nowy produkt do listy produktów
    * parametry:           newProduct - obiekt nowego produktu
    * zwracany typ:        brak
    * autor:               Mateusz Szelec 4AP
    ******************************************************************************************************************************************/
    addProduct = (newProduct) => {
        this.setState((prevState) => ({
            products: [...prevState.products, newProduct],
        }));
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        updateProduct
     * opis funkcji:         Aktualizuje istniejący produkt na podstawie dostarczonych danych
     * parametry:           updatedProduct - obiekt zaktualizowanego produktu
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    updateProduct = (updatedProduct) => {
        this.setState((prevState) => ({
            products: prevState.products.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            ),
        }));
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        deleteProduct
     * opis funkcji:         Usuwa produkt z listy produktów na podstawie jego identyfikatora
     * parametry:           productId - identyfikator produktu do usunięcia
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    deleteProduct = (productId) => {
        this.setState((prevState) => ({
            products: prevState.products.filter((product) => product.id !== productId),
        }));
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        handleOrderSubmit
     * opis funkcji:         Przetwarza dane zamówienia i dodaje je do listy zamówień
     * parametry:           orderData - obiekt zawierający dane zamówienia
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    handleOrderSubmit = (orderData) => {
        const newOrder = {
            id: this.state.orders.length + 1,
            user: this.state.user ? this.state.user.name : 'Anonimowy użytkownik',
            items: orderData.items,
            status: 'new',
            total: orderData.totalAmount,
            date: new Date().toISOString().split('T')[0],
            pickupTime: orderData.deliveryTime,
            notes: orderData.notes,
        };

        this.setState((prevState) => ({
            orders: [...prevState.orders, newOrder],
            cart: [],
        }));
    };

    /*****************************************************************************************************************************************
     * nazwa funkcji:        handleUpdateQuantity
     * opis funkcji:         Aktualizuje ilość produktu w koszyku (inkrementacja lub dekrementacja)
     * parametry:           itemId - identyfikator produktu, increment - wartość do zmiany ilości (może być dodatnia lub ujemna)
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    handleUpdateQuantity = (itemId, increment) => {
        this.setState((prevState) => ({
            cart: prevState.cart.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, item.quantity + increment) }
                    : item
            )
        }));
    }

    /*****************************************************************************************************************************************
     * nazwa funkcji:        register
     * opis funkcji:         Dodaje nowego użytkownika do listy użytkowników
     * parametry:           newUser - obiekt nowego użytkownika
     * zwracany typ:        brak
     * autor:               Mateusz Szelec 4AP
     ******************************************************************************************************************************************/
    register = (newUser) => {
        this.setState((prevState) => ({
            users: [...prevState.users, newUser],
        }));
    };

    render() {
        return (
            <Router>
                <div className="app bg-body">
                    <Navbar
                        isAuthenticated={this.state.isAuthenticated}
                        isAdmin={this.state.isAdmin}
                        onLogout={this.logout}
                        cart={this.state.cart}
                    />
                    <main className="container py-4">
                        <Routes>
                            <Route path="/" element={
                                    <ProductList
                                        products={this.state.products}
                                        addToCart={this.addToCart}
                                    />
                                }
                            />
                            <Route path="/login" element={<Login onLogin={this.login} />}
                            />
                            <Route path="/register" element={<Register onRegister={this.register} />}
                            />
                            <Route path="/cart" element={
                                    <Cart
                                        cart={this.state.cart}
                                        onRemoveItem={this.removeFromCart}
                                        onUpdateQuantity={this.handleUpdateQuantity}
                                    />
                                }
                            />
                            <Route path="/order" element={
                                    <OrderForm
                                        items={this.state.cart}
                                        totalAmount={this.state.cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                                        onSubmit={this.handleOrderSubmit}
                                    />
                                }
                            />
                            <Route path="/order-history" element={<OrderHistory />} />
                            <Route path="/admin" element={<AdminDashboard orders={this.state.orders} products={this.state.products}/>} />
                            <Route path="/admin/products" element={
                                    <ProductManager
                                        products={this.state.products}
                                        addProduct={this.addProduct}
                                        updateProduct={this.updateProduct}
                                        deleteProduct={this.deleteProduct}
                                    />
                                }
                            />
                            <Route path="/admin/orders" element={<OrderManager orders={this.state.orders} />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;