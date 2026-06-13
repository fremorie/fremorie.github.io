import { AppCanvas } from './components/AppCanvas';
import Section from './components/Section';

function App() {
  return (
    <>
      <AppCanvas />
      <Section title={'About me'} />
      <Section title={'My portfolio'} />
      <Section title={'My experience'} />
      <Section title={'Contact me'} />
    </>
  );
}

export default App;
