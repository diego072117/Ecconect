import ReactStars from "react-rating-stars-component";
import React from "react";
import { useCalificationActions } from "../hooks/useCalifications";
export const Stars = ({ infoCalif, refreshdata }) => {
  const { donatedUserRating } = useCalificationActions();

  const ratingChanged = async (calification) => {
    await donatedUserRating({
      id: infoCalif.id,
      calification,
    });
    refreshdata();
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#877eff"
      color="#09090a"
      value={infoCalif.calification ? parseFloat(infoCalif.calification) : 0}
      edit={!infoCalif.calification}
    />
  );
};
