import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

// CSS
import GlobalStyles, { Container } from './css/Global';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import CreateBlog from './features/blog/CreateBlog';
import BlogList from './features/blog/BlogList';

const theme = {
  colors: {
    white: '#fff',
    black: '#000',
    darkBlue: '#192D41',
    blue: '#228BE6',
    grey: '#25262B',
    lightGrey: '#85878B',
    red: 'red',
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
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Navbar />
        <Container>
          <Routes>
            <Route path='/' element={<BlogList />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='create-blog' element={<CreateBlog />} />
            <Route path='*' element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
