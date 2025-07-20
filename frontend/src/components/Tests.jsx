import React, { useState } from "react";


const AttractionForm = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      category: "",
      location: "",
      region: "",
      coordinates: "",
      entryFee: "",
      contact: "",
      images: [],
    });
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
    };
  
    return (
      <>
        <div className="mx-4">
          <p className="semibold capitalize" >Attraction Form</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex flex-col items-start">
                <label>Enter title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="enter title"
                  value={FormData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col items-start">
                <label>Enter description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </div>
      </>
    );
  };
  
  export default AttractionForm;