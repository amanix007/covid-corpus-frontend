import React from "react";
import Footer from "./Footer";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import InfoModal from "components/InfoModal";

const Layout = ({ children }) => {
  
  return (
    <div id="sj-wrapper" className="sj-wrapper">
      <div className="sj-contentwrapper">
        <header id="sj-header" className="sj-header sj-haslayout">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <TopBar />
                <Navbar />
              </div>
            </div>
          </div>
        </header>

        {children}

        <Footer />

        <InfoModal />
      </div>
    </div>
  );
};

export default Layout;
