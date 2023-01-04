import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface IPropsTransaction {
  income: number;
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: IPropsTransaction[];
  fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<IPropsTransaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt', 
        _order: 'desc', 
        q: query,
      }
    })

    setTransactions(response.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
