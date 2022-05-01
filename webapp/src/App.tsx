import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./AppTheme";
import { RecoilRoot } from "recoil";
import AppContainer from "./AppContainer";
import HomeView from "./views/HomeView";
import { CatProfileView } from "./views";
import { AddCatView } from "./views";

function App() {
  return (
    <ChakraProvider theme={AppTheme}>
      <RecoilRoot>
        {/* <AppContainer> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/cats/:id" element={<CatProfileView />} />
            <Route path="/add-cat" element={<AddCatView />} />
          </Routes>
        </BrowserRouter>
        {/* </AppContainer> */}
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
