import logo from './logo.svg';
import './App.css';
import { ChakraBaseProvider } from '@chakra-ui/react';
import ImageField from './components/ImageField';

function App() {
  return (
    <ChakraBaseProvider>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ImageField/>
      </header>
      
    </div>
    </ChakraBaseProvider>
  );
}

export default App;
