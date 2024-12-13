import "./Card.css";
import { useNavigate } from "react-router";

const Card = ({ candidate }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card-wrapper"
      onClick={() => {
        navigate(`/candidate/${candidate?.id}`);
      }}
    >
      <img src={candidate?.avatar} alt="" />
      <h2>{candidate?.name}</h2>
      <p>{candidate?.email}</p>
    </div>
  );
};

export default Card;
