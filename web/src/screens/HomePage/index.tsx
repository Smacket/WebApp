import React from "react";
import { Nav } from '../Nav';

const HomePage: React.FC<{}> = (): JSX.Element => {
  return (
    <div>
      <Nav />
      Hello I am home page
    </div>
  );
};

export { HomePage };
