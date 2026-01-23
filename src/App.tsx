import { MatrixProvider } from './context/MatrixContext';
import { MatrixForm } from './components/MatrixForm';
import { MatrixTable } from './components/MatrixTable';
import './index.css';

function App() {
  return (
    <MatrixProvider>
      <div className="app">
        <h1>Matrix App</h1>
        <MatrixForm />
        <MatrixTable />
      </div>
    </MatrixProvider>
  );
}

export default App;