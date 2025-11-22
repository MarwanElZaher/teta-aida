"use client";

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from './CartSidebar.module.css';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import CheckoutModal from './CheckoutModal';

const CartSidebar = () => {
    const { isCartOpen, toggleCart, items, addToCart, decreaseQuantity, total } = useCart();
    const { t, language } = useLanguage();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const handleCheckout = () => {
        toggleCart(); // Close the cart sidebar
        setIsCheckoutOpen(true); // Open the checkout modal
    };

    return (
        <>
            <div
                className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`}
                onClick={toggleCart}
            />
            <div className={`${styles.sidebar} ${isCartOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t.cart.title}</h2>
                    <button onClick={toggleCart} className={styles.closeButton}>&times;</button>
                </div>

                <div className={styles.items}>
                    {items.length === 0 ? (
                        <p className={styles.emptyMessage}>{t.cart.empty}</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <Image
                                    src={item.image}
                                    alt={t.products.items[item.id].name}
                                    width={60}
                                    height={60}
                                    className={styles.itemImage}
                                />
                                <div className={styles.itemDetails}>
                                    <h3 className={styles.itemName}>{t.products.items[item.id].name}</h3>
                                    <p className={styles.itemPrice}>{item.price} {language === 'ar' ? 'ج.م' : 'EGP'}</p>
                                    <div className={styles.quantityControls}>
                                        <button onClick={() => decreaseQuantity(item.id)} className={styles.controlButton}>-</button>
                                        <span className={styles.quantity}>{item.quantity}</span>
                                        <button onClick={() => addToCart(item)} className={styles.controlButton}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.total}>
                        <span>{t.cart.total}:</span>
                        <span>{total} {language === 'ar' ? 'ج.م' : 'EGP'}</span>
                    </div>
                    <button onClick={handleCheckout} className={styles.checkoutButton}>{t.cart.checkout}</button>
                </div>
            </div>
            <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        </>
    );
};

export default CartSidebar;
