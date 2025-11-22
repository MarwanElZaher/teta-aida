"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    toggleCart: () => void;
    isCartOpen: boolean;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === newItem.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...newItem, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const decreaseQuantity = (id: number) => {
        setItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: Math.max(0, item.quantity - 1) };
                }
                return item;
            }).filter((item) => item.quantity > 0);
        });
    };

    const removeFromCart = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, decreaseQuantity, removeFromCart, toggleCart, isCartOpen, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
