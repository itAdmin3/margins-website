"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Head from "next/head";

// Create Context
const MetadataContext = createContext();

// Custom Hook to use Metadata
export const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error("useMetadata must be used within a MetadataProvider");
  }
  return context;
};

// Metadata Provider Component
export const MetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState({
    title: "Home | Margins Developments",
    description: "Margins is real estate developer specializing in branded ventures and residences, crafting exceptional living experiences with world-class designs, premium partnerships, and unmatched quality.",
});

  // Dynamically re-render <Head> when metadata changes
  useEffect(() => {
    document.title = metadata.title;
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", metadata.description);
    }
  }, [metadata]);

  return (
    <MetadataContext.Provider value={{ metadata, setMetadata }}>
      {children}
    </MetadataContext.Provider>
  );
};
