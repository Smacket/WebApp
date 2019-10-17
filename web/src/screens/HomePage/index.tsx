import React from "react";
import { Nav } from '../Nav';

const HomePage: React.FC<{}> = (): JSX.Element => {
  
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
    </div>
  );
};

export { HomePage };
