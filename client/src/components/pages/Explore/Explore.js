import React, { useEffect, useState } from "react";
import data from "./Data.json";
// import SideNav from "./SideNav";
import Sidebar from "react-sidebar";
import NavigationBar from "../../shared/Nav";

const mql = window.matchMedia(`(min-width: 800px)`);

const Explore = () => {
  const [sidebarDocked, setSidebarDocked] = useState(mql.matches);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onSetSidebarOpen = open => {
    setSidebarOpen(open);
  };

  const mediaQueryChanged = () => {
    setSidebarDocked(mql.matches);
    setSidebarOpen(false);
  };

  const displayData = data.map(data => {
    return (
      <div key={data.CareerCluster}>
        <h1>{data.CareerCluster}</h1>
        {data.CareerPathway.map(pathway => {
          return <p key={pathway.Pathway}>{pathway.Pathway}</p>;
        })}
      </div>
    );
  });

  useEffect(() => {
    mql.addListener(mediaQueryChanged);

    // returned function will be called on component unmount
    return () => {
      mql.removeListener(this.mediaQueryChanged);
    };
  }, []);

  return (
    <Sidebar
      sidebar={<b>Sidebar content</b>}
      open={sidebarOpen}
      docked={sidebarDocked}
      onSetOpen={onSetSidebarOpen}
      styles={{ sidebar: { background: "white" } }}
    >
      <NavigationBar />
      <div className="explore">
        <h1 className="font-weight-light">Explore Careers</h1>
        <button onClick={() => onSetSidebarOpen(true)}>Open sidebar</button>
        {displayData}
      </div>
    </Sidebar>
  );
};

export default Explore;
