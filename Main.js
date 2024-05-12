import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';
import Slider from './Slider';
import Footer from './Footer';

export default function Main() {

  const loginStatus = localStorage.getItem('loginStatus');
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/Main')
      .then((response) => {
        setImage(response.data);
      })
      .catch((error) => {
        console.log('Error fetching images: ', error);
      });
  }, []);


  const handleCategoryClick = (category) => {
    if (!loginStatus) {
      navigate('/login'); // Redirect to login page
    } else {
      navigate(`/${category}`); // Redirect to category page
    }
  };

  return (
    <div className='fst-italic text-center bg-primary-subtle'>
      <Navbar />
      <h1>Welcome to <strong>V CART!</strong></h1>
      <Slider />
      <div className="container">
        <h2>Category</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 justify-content-center">
          {Array.isArray(image) && image.map((image, index) => (
            <div key={index} className="col-md-3 col-sm-6 col-12">
              <div className="card" style={{ width: '100%', margin: '10px' }}>
                <img src={'http://localhost:8081/images/' + image.Img} className="card-img-top" alt="..." style={{ height: '100px', objectFit: 'cover', cursor: 'pointer' }} onClick={() => handleCategoryClick(image.Name)} />
                <div className="card-body" style={{ padding: '5px' }}>
                  <h5 className="card-title" style={{ fontSize: '14px' }}>{image.Name}</h5>
                  <p style={{ fontSize: '12px' }}>{image.Price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}