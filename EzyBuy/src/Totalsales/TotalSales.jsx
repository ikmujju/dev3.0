import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import axios from "axios";
import Adminheader from "../Admin/Adminheader";
import '../Order/order.css';

function TotalSales() {
    const [salesData, setSalesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSalesData();
    }, []);

    const fetchSalesData = async () => {
        try {
            const { data } = await axios.get("http://localhost:3001/auth/getsales");
            setSalesData(data);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        } finally {
            setLoading(false);
        }
    };

    const dailySalesData = salesData?.dailySales || [];
    const monthlySalesData = salesData?.monthlySales || [];

    if (loading) return <p>Loading sales data...</p>;

    return (
        <>
            <Adminheader />
            <div className="orders-container">
                <h2>Daily Sales Summary</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>

                <h2>Monthly Sales Summary</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default TotalSales;