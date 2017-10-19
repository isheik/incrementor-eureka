import React from "react";
import store from "store";

const Home = () => (
    <div>HOME
        {console.log(store.get('token'))}
    </div>
);

export default Home;