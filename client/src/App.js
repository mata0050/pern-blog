import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

// CSS
import GlobalStyles, { Container } from './css/Global';
import Navbar from './components/Navbar';

const theme = {
  colors: {
    white: '#fff',
    black: '#000',
    darkBlue: '#192D41',
    blue: '#228BE6',
    grey: '#25262B',
    lightGrey: '#85878B',
  },

  mobile: {
    xSmall: '501px',
    small: '531px',
    medium: '829px',
    large: '1134px',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <div className='App'>
        <h1>hello</h1>
        <Container>
          <Routes>
            <Route path='*' element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
