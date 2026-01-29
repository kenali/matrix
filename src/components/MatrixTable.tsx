
import { useState, useMemo } from 'react';
import { useMatrix } from '../context/MatrixContext';
import { get60thPercentile } from '../utils/mathUtils';

export const MatrixTable = () => {
  const { matrix, X, incrementCell, removeRow, addRow } = useMatrix();
  const [hoveredCellId, setHoveredCellId] = useState<number | null>(null);
  const [hoveredSumRowIdx, setHoveredSumRowIdx] = useState<number | null>(null);


  const nearestIds = useMemo(() => {
    const all = matrix.flat();
    const current = all.find(c => c.id === hoveredCellId);
    if (!current) return [];
    return all
      .filter(c => c.id !== current.id)
      .sort((a, b) => Math.abs(a.amount - current.amount) - Math.abs(b.amount - current.amount))
      .slice(0, X)
      .map(c => c.id);
  }, [hoveredCellId, matrix, X]);

  if (matrix.length === 0) return null;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {matrix[0].map((_, i) => <th key={i}>Col {i + 1}</th>)}
            <th>Sum</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rIdx) => {
            const rowSum = row.reduce((s, c) => s + c.amount, 0);
            const maxVal = Math.max(...row.map(c => c.amount));

            return (
              <tr key={rIdx}>
                {row.map((cell,cIdx) => {
                  const isHeat = hoveredSumRowIdx === rIdx;
                  const isNearest = nearestIds.includes(cell.id);
                  const alpha = cell.amount / maxVal;

                  return (
                    <td
                      key={cell.id}
                      className={isNearest ? 'highlight-nearest' : ''}
                      onClick={() => incrementCell(rIdx, cIdx)}
                      onMouseEnter={() => setHoveredCellId(cell.id)}
                      onMouseLeave={() => setHoveredCellId(null)}
                      style={{ 
                        backgroundColor: isHeat ? `rgba(255, 69, 0, ${alpha})` : ''
                      }}
                    >
                      {isHeat 
                        ? `${((cell.amount / rowSum) * 100).toFixed(1)}%` 
                        : cell.amount
                      }
                    </td>
                  );
                })}
                <td 
                  className="sum-cell" 
                  onMouseEnter={() => setHoveredSumRowIdx(rIdx)} 
                  onMouseLeave={() => setHoveredSumRowIdx(null)}
                >
                  {rowSum}
                </td>
                <td>
                  <button className="delete-btn" onClick={() => removeRow(rIdx)}>
                    ×
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            {matrix[0].map((_, colIdx) => (
              <td key={colIdx} className="percentile">
                <small>60th:</small><br/>
                {get60thPercentile(matrix.map(r => r[colIdx].amount))}
              </td>
            ))}
            <td colSpan={2}>
            </td>
          </tr>
        </tfoot>
      </table>
      
      <button className="add-row-btn" onClick={addRow}>
        + Add New Row
      </button>
    </div>
  );
};