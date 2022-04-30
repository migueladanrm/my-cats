import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./AppTheme";
import { RecoilRoot } from "recoil";
import AppContainer from "./views/AppContainer";

function App() {
  return (
    <ChakraProvider theme={AppTheme}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppContainer />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
