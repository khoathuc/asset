"use client";
import { getAllActions } from "@/app/settings/actions/action";
import { getAllRequestTypes } from "@/app/settings/request_types/action";
import { getAllLocations } from "@/app/settings/locations/actions";
import { getAllStatuses } from "@/app/settings/statuses/actions";
import { getAllTags } from "@/app/settings/tags/action";
import { getAllTypes } from "@/app/settings/types/actions";
import { getAllVendors } from "@/app/settings/vendors/actions";
import { getAllUsers } from "@/app/users/actions";
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
      const locations =  await getAllLocations();
      const types = await getAllTypes();
      const statuses = await getAllStatuses();
      const users = await getAllUsers();
      const tags = await getAllTags();
      const vendors = await getAllVendors();
      const actions = await getAllActions();
      const requestTypes = await getAllRequestTypes();
      
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
