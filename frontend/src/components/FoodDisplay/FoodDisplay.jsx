    import React, { useContext } from "react";
    import "./FoodDisplay.css";
    import { StoreContext } from "../../context/StoreContext";
    import Fooditem from "../Fooditem/Fooditem";

    const FoodDisplay = ({ category }) => {
    const { food_list, foodLoading, foodError, fetchFoodList } = useContext(StoreContext);

    return (
        <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        {foodLoading && <p role="status">Loading menu...</p>}
        {!foodLoading && foodError && (
            <div role="alert">
                <p>{foodError}</p>
                <button type="button" onClick={fetchFoodList}>Try again</button>
            </div>
        )}
        {!foodLoading && !foodError && food_list.length === 0 && <p>No dishes available yet.</p>}
        <div className="food-display-list">
            {food_list.map((item, index) => {
            if (category === "ALL" || category === item.category) {
                return (
                <Fooditem
                    key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                />
                );
            }
            })}
        </div>
        </div>
    );
    };

export default FoodDisplay;
