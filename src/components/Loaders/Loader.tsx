"use client";
import { useState, useEffect } from "react";
import "./Loader.css";

const Loader: React.FC = () => {
    const [dots, setDots] = useState<string>("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev: string) => (prev.length < 3 ? prev + "." : ""));
        }, 500); // Cambia los puntos cada 500ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loader-container">
            <div className="loader"></div>
            <p className="loading-text">Cargando{dots}</p>
        </div>
    );
};

export default Loader;
