import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddToCard } from "../../redux/counter/CardSlice";

const Card = ({item}) => {
  const dispatch = useDispatch();
  const { id, title, price, description, image } = item;
  return (
    <div key={id} className="card-1">
      <h3 className="card-title">Title: {title.slice(0, 7)}</h3>
      <Link to={`/detail/${id} `}>
        <img src={image} className="image-1" />
      </Link>
      <p className="card-text">Description{description.slice(0, 80)}</p>
      <p>Price:{price}</p>

      <button onClick={() => dispatch(AddToCard(item))} className="order-btn">
        Order Now
      </button>
    </div>
  );
};

export default Card;
