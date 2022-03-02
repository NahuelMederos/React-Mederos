import React from "react";
import { useAuth } from "../context/authContext";

function Whishlist() {
  const { userData } = useAuth();

  return (
    <div>
      {userData.wishlist &&
        userData.wishlist.map((item) => <h1 key={item}>{item}</h1>)}
    </div>
  );
}

export default Whishlist;
