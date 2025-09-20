import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all components from the components directory
import {
  Header,
  Home,
  AboutPage,
  PricingPage,
  ContactPage,
  DashboardPage,
  FeaturesPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
  NotFoundPage,
  SignIn,
  SignUp,
  OTPConfirmation,
} from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Authentication Pages */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp-confirmation" element={<OTPConfirmation />} />

          {/* Legal Pages */}
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />

          {/* 404 Page - Must be last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
