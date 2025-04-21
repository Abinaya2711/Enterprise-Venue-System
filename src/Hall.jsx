import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddHall from './AddHall';
import HallContent from './HallContent';

const Hall = () => {
  const [search, setSearch] = useState('');
  const [newItem, setNewItem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchHalls();
  }, []);

  const fetchHalls = () => {
    axios.get('http://localhost:3500/api/halls')
      .then(res => {
        const sorted = res.data.sort((a, b) => a.item.localeCompare(b.item));
        setItems(sorted);
      })
      .catch(err => console.error(err));
  };

  const handleSubmit = () => {
    if (!newItem.trim()) return;
    const trimmedItem = newItem.trim();
  
    axios.post('http://localhost:3500/api/halls', { item: trimmedItem })
      .then(res => {
        fetchHalls(); // Refresh with fresh data
        setNewItem('');
        setShowModal(false);
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          alert('Hall already exists');
        } else {
          console.error(err);
        }
      });
  };
  

  const handleDelete = (itemName) => {
    axios.delete(`http://localhost:3500/api/halls/${itemName}`)
      .then(() => fetchHalls())
      .catch(err => console.error(err));
  };

  const openModal = () => {
    setNewItem(''); // Reset form
    setShowModal(true);
  };

  return (
    <div>
      <header>
        <div className="logo"><i className="fas fa-crown"></i> Admin Dashboard</div>
        <nav>
          <ul className="nav-links">
            <li><Link to='/homePage'>Home</Link></li>
            <li><Link to='/people'>People</Link></li>
            <li><Link to='/hall' style={{ color: 'yellow' }}>Hall</Link></li>
          </ul>
        </nav>
      </header>

      <div className="searchForm">
        <input
          type="text"
          placeholder="Search Hall"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={openModal}>+</button>
      </div>

      {showModal && (
        <AddHall
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
          setShowModal={setShowModal}
          halls={items}
        />
      )}

      <HallContent
        items={items.filter(item =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Hall;
