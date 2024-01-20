"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface DataContextProps {
  contextData: any;
  fetchContextData: (ClientData: any) => Promise<void>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextData, setContextData] = useState<DataContextProps | {}>({});

  const fetchContextData = async (ClientData: any) => {
    setContextData(ClientData);
  };

  useEffect(()=>{
    const fetchContext = async()=>{
      const res = await fetch('/api/datacontext');
      const {locations, requestTypes, types, statuses, actions, users, tags, vendors} = await res.json();
      
      setContextData({locations, requestTypes, types, statuses, actions, users, tags, vendors});
    }
    
    fetchContext();
  },[])

  return (
    <DataContext.Provider value={{ contextData, fetchContextData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
