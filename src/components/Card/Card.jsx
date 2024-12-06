import "./Card.css";

const Card = ({ candidate }) => {
  return (
    <div className="card-wrapper">
      <img src={candidate?.avatar} alt="" />
      <h2>{candidate?.name}</h2>
      <p>{candidate?.email}</p>
    </div>
  );
};

export default Card;
