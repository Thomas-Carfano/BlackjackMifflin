import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Game = () => {
  const [isLastHand, setIsLastHand] = useState(false);
  const navigate = useNavigate();
  const socket = io('http://localhost:8080');

  const lastHand = () => {
    console.log("move to home page");
    setIsLastHand(true);
    navigate("/");
  };

  const socketHandler = (e) => {
    const message = e.target.value;
    console.log(`MOVE FROM CLIENT: ${message}`);
    socket.emit('move', message);
  };

  socket.on('card', (card) => {
    console.log(`CARD FROM SERVER: ${card}`);
  });
  socket.on('player', (playerIdx) => {
    console.log(`Current player at seat ${playerIdx}`);
  });

  return (
    <>
      <h1>Blackjack Mifflin</h1>

      <button onClick={lastHand}>Last Hand</button>
      <button onClick={socketHandler} value="hit">
        Hit
      </button>
      <button onClick={socketHandler} value="stick">
        Stick
      </button>
    </>
  );
};

export default Game;
