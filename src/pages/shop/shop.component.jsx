import React from "react";
import { Route, Routes } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const ShopPage = () => (
  <div className="shop-page">
    <Routes>
      <Route path="/" element={<CollectionsOverview />}></Route>
      <Route path=":collectionId" element={<CollectionPage />}></Route>
    </Routes>
  </div>
);

export default ShopPage;
