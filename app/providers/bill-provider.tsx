"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { BillContextType, BillData, BillItem } from "@/types/global";

const initialBillData: BillData = {
  client: "",
  project: "",
  date: "",
  items: [],
};

const BillContext = createContext<BillContextType | undefined>(undefined);

export function BillProvider({ children }: { children: ReactNode }) {
  const [billData, setBillData] = useState<BillData>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("billData");
      return savedData ? JSON.parse(savedData) : initialBillData;
    }
    return initialBillData;
  });

  useEffect(() => {
    localStorage.setItem("billData", JSON.stringify(billData));
  }, [billData]);

  const updateBillData = (data: Partial<BillData>) => {
    setBillData((prevData) => ({ ...prevData, ...data }));
  };

  const addItem = (item: BillItem) => {
    setBillData((prevData) => ({
      ...prevData,
      items: [...prevData.items, item],
    }));
  };

  const editItem = (index: number, item: BillItem) => {
    setBillData((prevData) => ({
      ...prevData,
      items: prevData.items.map((i, idx) => (idx === index ? item : i)),
    }));
  };

  const deleteItem = (index: number) => {
    setBillData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((_, idx) => idx !== index),
    }));
  };

  return (
    <BillContext.Provider
      value={{ billData, updateBillData, addItem, editItem, deleteItem }}
    >
      {children}
    </BillContext.Provider>
  );
}

export function useBillContext() {
  const context = useContext(BillContext);
  if (context === undefined) {
    throw new Error("useBillContext must be used within a BillProvider");
  }
  return context;
}
