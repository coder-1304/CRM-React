import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import customerPlaceholderImage from '../../assets/images/customerPlaceholderImage.jpg';
import customerList from '../../assets/JsonData/customers-list.json';

const CustomerInfo = () => {
    const { customerId } = useParams();
    const [customerData, setCustomerData] = useState(null);

    useEffect(() => {
        
        const customer = customerList.find(customer => customer.id === parseInt(customerId));
        console.log(customer);
        if (customer) {
            // Simulate API delay
            setTimeout(() => {
                setCustomerData(customer);
            }, 1000);
        }
    }, [customerId]);

    const handleViewOrder = (orderId) => {
        console.log(`View order ${orderId}`);
        // Implement view order functionality
    };

    const handleEditOrder = (orderId) => {
        console.log(`Edit order ${orderId}`);
        // Implement edit order functionality
    };

    if (!customerData) {
        return <div className="loading">Loading...</div>;
    }

    // Hardcoded order data
    const orders = [
        {
            id: 'OD123',
            name: 'Order 1',
            items: ['Item 1', 'Item 2'],
            totalAmount: 100
        },
        {
            id: 'OD456',
            name: 'Order 2',
            items: ['Item 3', 'Item 4'],
            totalAmount: 150
        }
    ];

    return (
        <div className="customerInfo">
            <div className="customerHeader">
                <img src={customerData.avatar || customerPlaceholderImage} alt="Customer Avatar" className="avatar" />
                <div className="customerDetails">
                    <h2>{customerData.name}</h2>
                    <p>Email: {customerData.email}</p>
                    <p>Phone: {customerData.phone}</p>
                    <p>Address: {customerData.address}</p>
                </div>
            </div>
            <div className="orderList">
                <h3>Orders</h3>
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            <h4>Order ID: {order.id}</h4>
                            <p>Order Name: {order.name}</p>
                            <p>Order Items: {order.items.join(', ')}</p>
                            <p>Total Amount: ${order.totalAmount}</p>
                            <div className="orderActions">
                                <button onClick={() => handleViewOrder(order.id)}>View</button>
                                <button onClick={() => handleEditOrder(order.id)}>Edit</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CustomerInfo;
