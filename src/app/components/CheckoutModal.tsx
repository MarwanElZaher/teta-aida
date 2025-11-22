"use client";

import { useState } from 'react';
import styles from './CheckoutModal.module.css';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
    const { items, total } = useCart();
    const { t, language } = useLanguage();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'cash', // 'cash' or 'instapay'
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isAr = language === 'ar';

        // Construct WhatsApp Message
        const orderDetails = items.map(item =>
            `- ${item.name} (x${item.quantity}): ${item.price * item.quantity} ${isAr ? 'ج.م' : 'EGP'}`
        ).join('\n');

        const message = isAr ? `
*طلب جديد من موقع تيتا عايدة*

*بيانات العميل:*
الاسم: ${formData.name}
رقم الهاتف: ${formData.phone}
العنوان: ${formData.address}
طريقة الدفع: ${formData.paymentMethod === 'cash' ? 'دفع عند الاستلام' : 'إنستا باي'}

*ملخص الطلب:*
${orderDetails}

*الإجمالي: ${total} ج.م*
    `.trim() : `
*New Order from Teta-Aida Website*

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
Payment Method: ${formData.paymentMethod === 'cash' ? 'Cash on Delivery' : 'InstaPay'}

*Order Summary:*
${orderDetails}

*Total: ${total} EGP*
    `.trim();

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "201070985360"; // Replace with actual number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        onClose();
    };

    const labels = language === 'ar' ? {
        title: "إتمام الطلب",
        name: "الاسم",
        phone: "رقم الهاتف",
        address: "العنوان بالتفصيل",
        payment: "طريقة الدفع",
        cash: "دفع عند الاستلام",
        instapay: "إنستا باي",
        submit: "تأكيد الطلب عبر واتساب",
        cancel: "إلغاء"
    } : {
        title: "Checkout",
        name: "Name",
        phone: "Phone Number",
        address: "Detailed Address",
        payment: "Payment Method",
        cash: "Cash on Delivery",
        instapay: "InstaPay",
        submit: "Place Order via WhatsApp",
        cancel: "Cancel"
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>{labels.title}</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">{labels.name}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone">{labels.phone}</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="address">{labels.address}</label>
                        <textarea
                            id="address"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className={styles.textarea}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="paymentMethod">{labels.payment}</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className={styles.select}
                        >
                            <option value="cash">{labels.cash}</option>
                            <option value="instapay">{labels.instapay}</option>
                        </select>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            {labels.cancel}
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            {labels.submit}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutModal;
