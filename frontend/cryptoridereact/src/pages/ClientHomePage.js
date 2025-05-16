import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import ClientRentals from './ClientRentals';

export default function ClientHomePage() {
  const location = useLocation();
  const user = location.state?.user;

  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [pickupDay, setPickupDay] = useState('');
  const [returnDay, setReturnDay] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');

  // Fetch all cars
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/cars`)
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);

  // Calculate total price
  useEffect(() => {
    if (selectedCar && pickupDay && returnDay) {
      const start = new Date(pickupDay);
      const end = new Date(returnDay);
      const diffTime = Math.abs(end - start);
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (days >= 1 && days <= 30) {
        setTotalPrice(days * selectedCar.dailyRate);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
  }, [pickupDay, returnDay, selectedCar]);

  const handleRent = () => {
    if (!selectedCar || !pickupDay || !returnDay) {
      setMessage('Completează toate câmpurile!');
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/api/rent`, {
      clientId: user.userId,
      carId: selectedCar.carId,
      pickupDay: pickupDay,
      returnDay: returnDay,
      totalCost: totalPrice
    })
    .then(res => setMessage(res.data))
    .catch(err => setMessage(err.response?.message || 'Eroare la închiriere.'));
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Bine ai venit, {user.username}</h1>
      <p>Sold: {user.balance} RON</p>
      <p>Alege o mașină:</p>
      <select onChange={(e) => {
        const car = cars.find(c => c.carId === parseInt(e.target.value));
        setSelectedCar(car);
      }}>
        <option value="">-- Selectează --</option>
        {Array.isArray(cars) && cars.map(car => (
          <option key={car.carId} value={car.carId}>
            {car.model} - {car.dailyRate} RON/zi
          </option>
        ))}
      </select>

      <div style={{ marginTop: '1rem' }}>
        <label>Data ridicare: </label>
        <input type="date" value={pickupDay} onChange={e => setPickupDay(e.target.value)} />
        <br />
        <label>Data returnare: </label>
        <input type="date" value={returnDay} onChange={e => setReturnDay(e.target.value)} />
      </div>

      {totalPrice > 0 && (
        <p>Preț total: {totalPrice} RON</p>
      )}

      <button onClick={handleRent} style={{ marginTop: '1rem' }}>
        Închiriază
      </button>

      {message && <p style={{ color: 'blue', marginTop: '1rem' }}>{message}</p>}

      <LogoutButton />

      {/* 👇 Afișare închirieri */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Închirierile mele</h2>
        <ClientRentals clientId={user.userId} />
      </div>
    </div>
  );
}
