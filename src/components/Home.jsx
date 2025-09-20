import React from "react";
import Hero from "./Hero";
import DashboardPreview from "./DashboardPreview";
import Features from "./Features";
import Stats from "./Stats";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <div id="home">
        <Hero />
      </div>
      <DashboardPreview />
      <div id="features">
        <Features />
      </div>
      <Stats />
      <Testimonials />
      <CallToAction />
      <div id="contact">
        <Footer />
      </div>
    </>
  );
};

export default Home;
