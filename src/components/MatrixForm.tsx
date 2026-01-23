import React, { useState } from 'react';
import { useMatrix } from '../context/MatrixContext';

export const MatrixForm = () => {
  const { setupMatrix } = useMatrix();
  const [vals, setVals] = useState({ m: 0, n: 0, x: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vals.m > 0 && vals.n > 0) setupMatrix(vals.m, vals.n, vals.x);
  };

  return (
    <form className="setup-form" onSubmit={handleSubmit}>
      <input type="number" placeholder="M (rows)" onChange={e => setVals({...vals, m: +e.target.value})} required />
      <input type="number" placeholder="N (cols)" onChange={e => setVals({...vals, n: +e.target.value})} required />
      <input type="number" placeholder="X (nearest)" onChange={e => setVals({...vals, x: +e.target.value})} required />
      <button type="submit">Create Matrix</button>
    </form>
  );
};


