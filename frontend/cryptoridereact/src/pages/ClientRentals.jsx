import React, { useState } from 'react';
import axios from 'axios';

export default function ClientRentals({ clientId }) {
  const [rentals, setRentals] = useState([]);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const fetchRentals = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/rent/client/${clientId}`)
      .then(res => {
        if (typeof res.data === 'string') {
          setMessage(res.data);
          setRentals([]);
        } else {
          setMessage('');
          setRentals(res.data);
        }
        setVisible(true);
      })
      .catch(err => {
        setMessage('Eroare la încărcarea închirierilor.');
        setRentals([]);
        setVisible(true);
      });
  };

  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid gray', paddingTop: '1rem' }}>
      <button onClick={fetchRentals}>Afișează închirierile mele</button>

      {visible && (
        <div style={{ marginTop: '1rem' }}>
          {message && <p>{message}</p>}
          {rentals.length > 0 && (
            <ul>
              {rentals.map((rental, index) => (
                <li key={index}>
                  Mașină ID: {rental.car.carId} | Data ridicare: {rental.pickupDay} | Returnare: {rental.returnDay} | Cost: {rental.totalCost} RON
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
