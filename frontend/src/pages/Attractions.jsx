import React from "react";
import AttractionForm from "../components/AttractionForm";

const Attractions = () => {
  return (
    <>
      <div className="min-h-screen mt-16 pt-8 w-full bg-neutral-100" >
        
        <p>
          Discover the beauty of Kenya's attractions, from stunning landscapes
          to vibrant culture.
        </p>
        <AttractionForm />
      </div>
    </>
  );
};

export default Attractions;
