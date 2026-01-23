import React, { createContext, useContext, useState } from 'react';
import { generateAmount } from '../utils/mathUtils';

export type Cell = { id: number; amount: number };

interface MatrixContextType {
  matrix: Cell[][];
  X: number;
  setupMatrix: (m: number, n: number, x: number) => void;
  incrementCell: (r: number, c: number) => void;
  removeRow: (r: number) => void;
  addRow: () => void;
}

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const MatrixProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [X, setX] = useState(0);

  const setupMatrix = (m: number, n: number, x: number) => {
    setX(x);
    const newMatrix = Array.from({ length: m }, () =>
      Array.from({ length: n }, () => ({ id: Math.random(), amount: generateAmount() }))
    );
    setMatrix(newMatrix);
  };

  const incrementCell = (rIdx: number, cIdx: number) => {
    setMatrix(prev => {
      const copy = [...prev.map(row => [...row])];
      copy[rIdx][cIdx].amount += 1;
      return copy;
    });
  };

  const removeRow = (rIdx: number) => {
    setMatrix(prev => prev.filter((_, idx) => idx !== rIdx));
  };

  const addRow = () => {
    setMatrix(prev => {
      if (prev.length === 0) return prev;
      const cols = prev[0].length;
      const newRow = Array.from({ length: cols }, () => ({ id: Math.random(), amount: generateAmount() }));
      return [...prev, newRow];
    });
  };

  return (
    <MatrixContext.Provider value={{ matrix, X, setupMatrix, incrementCell, removeRow, addRow }}>
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrix = () => {
  const ctx = useContext(MatrixContext);
  if (!ctx) throw new Error("useMatrix must be inside MatrixProvider");
  return ctx;
};