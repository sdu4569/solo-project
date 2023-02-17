import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from '@firebase/firestore';

const dbContext = createContext<any[]>([]);

export const ContextProvider = ({ children }: any) => {
  const [contents, setContents] = useState<any[]>([]);

  useEffect(() => {
    const getContents = async () => {
      const q = query(collection(db, 'board'), orderBy('time', 'asc'));
      const dbContents = await getDocs(q);
      dbContents.forEach((doc) => {
        const contentObject = {
          ...doc.data(),
          id: doc.id,
        };
        setContents((prev) => [contentObject, ...prev]);
      });
    };
    getContents();
  }, []);

  return <dbContext.Provider value={contents}>{children}</dbContext.Provider>;
};

export const useDbContext = () => {
  const dbcontents = useContext(dbContext);
  if (!dbcontents) throw new Error('ContextProvider not found');
  return dbcontents;
};
