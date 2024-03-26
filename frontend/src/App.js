import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import FinalStep from './FinalStep';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StepOne />} />
        <Route path="step-two" element={<StepTwo />} />
        <Route path="final-step" element={<FinalStep />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;