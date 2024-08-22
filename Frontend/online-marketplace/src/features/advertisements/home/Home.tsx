
import React from 'react';
import AdvertisementTable from "./AdvertisementTable";
import "./Home.css"

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="title">
                <h1>Advertisements</h1>
            </div>
            <AdvertisementTable />
        </div>
    );
};

export default Home;
