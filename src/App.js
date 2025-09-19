import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DashboardPreview from "./components/DashboardPreview";
import Features from "./components/Features";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";

// Home page component
const HomePage = () => (
  <>
    <Hero />
    <DashboardPreview />
    <Features />
    <Stats />
    <Testimonials />
    <CallToAction />
    <Footer />
  </>
);

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
