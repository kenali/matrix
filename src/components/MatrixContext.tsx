import React, { createContext, useContext, useState } from "react";

export type Cell = { id: number; amount: number };

interface MatrixContextType {
  matrix: Cell[][];
  X: number;
  setInitialData: (m: number, n: number, x: number) => void;
  incrementCell: (rIdx: number, cIdx: number) => void;
  removeRow: (rIdx: number) => void;
  addRow: () => void;
}

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const MatrixProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [X, setX] = useState(0);

  const setInitialData = (m: number, n: number, x: number) => {
    setX(x);
    const newMatrix = Array.from({ length: m }, () =>
      Array.from({ length: n }, () => ({
        id: Math.random(),
        amount: Math.floor(Math.random() * 900) + 100, // 100-999
      }))
    );
    setMatrix(newMatrix);
  };

  const incrementCell = (rIdx: number, cIdx: number) => {
    if (!matrix[rIdx] || !matrix[rIdx][cIdx]) return;
    const updated = [...matrix.map((row) => [...row])];
    updated[rIdx][cIdx].amount += 1;
    setMatrix(updated);
  };

  const removeRow = (rIdx: number) => {
    setMatrix(matrix.filter((_, idx) => idx !== rIdx));
  };

  const addRow = () => {
    const n = matrix[0]?.length || 0;
    const newRow = Array.from({ length: n }, () => ({
      id: Math.random(),
      amount: generateAmount(),
    }));
    setMatrix([...matrix, newRow]);
  };

  return (
    <MatrixContext.Provider
      value={{ matrix, X, setInitialData, incrementCell, removeRow, addRow }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrix = () => {
  const context = useContext(MatrixContext);
  if (!context) throw new Error("useMatrix must be used within MatrixProvider");
  return context;
};

function generateAmount(): any {
  throw new Error("Function not implemented.");
}
