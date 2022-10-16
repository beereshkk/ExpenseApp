import React, { useState } from "react";
import CategoryForm from "./categoryForm";
import { startDeleteCategory } from "../actions/categoriesAction";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryItem = (props) => {
  console.log("inside CategoryItem ");
  const dispatch = useDispatch();
  const { category, token } = props;
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleDelete = () => {
    console.log("deleting category");
    dispatch(startDeleteCategory(category._id, token));
  };
  return (
    <div>
      {!toggle ? (
        <>
          <h1>{category.name}</h1>
          <button className="btn" onClick={handleToggle}>
            Edit
          </button>
          &nbsp;&nbsp;
          <button className="btn" onClick={handleDelete}>
            Delete
          </button>
        </>
      ) : (
        <>
          <CategoryForm editCategory={category} handleToggle={handleToggle} />
          <br />
          <button className="btn" onClick={handleToggle}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default CategoryItem;
