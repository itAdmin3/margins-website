import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
const DeviceTypeContext = createContext();

// Provider Component
export const DeviceTypeProvider = ({ children }) => {
    const [deviceType, setDeviceType] = useState("desktop"); // Default: desktop

    // Function to detect device type manually
    const detectDeviceType = () => {
        const width = window.innerWidth;
        if (width <= 768) {
            setDeviceType("phone");
        } else if (width > 768 && width <= 1024) {
            setDeviceType("tablet");
        } else {
            setDeviceType("desktop");
        }
    };

    useEffect(() => {
        // Initial detection
        detectDeviceType();

        // Listen for window resize events
        window.addEventListener("resize", detectDeviceType);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener("resize", detectDeviceType);
        };
    }, []);

    return (
        <DeviceTypeContext.Provider value={deviceType}>
            {children}
        </DeviceTypeContext.Provider>
    );
};

// Custom Hook for using Context
export const useDeviceType = () => useContext(DeviceTypeContext);
