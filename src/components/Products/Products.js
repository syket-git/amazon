import React from 'react';
import './Products.css'
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Products = (props) => {
  const {
    id,
    name,
    img,
    price,
    description,
    ratings,
    size,
    category,
  } = props.product;
  return (
    <div>
        <div className="container-fluid mt-4">
        <Card style={{ width: '18rem', marginBottom: '15px'}}>
        <Link to={`/product/${id}`}><Card.Img variant="top" style={{width: '10rem', height:'11rem', display:'block', margin: '0 auto'}} src={img} /></Link>
        <Card.Body>
        <Card.Title className="text-center">{name}</Card.Title>
          <Card.Text>
            {description.slice(0, 100)+ "..." }
            <br />
            <div>
              <h5>Price: ${price}</h5>
              <div className="d-flex justify-content-between">Category: {category} <br/> Size: {size}  <br/> Ratings: {ratings} </div>
            </div>
          </Card.Text>
          <div className="d-block text-center">
            <Link to={`/product/${id}`}><Button variant="primary">Buy</Button></Link>
          </div>
        </Card.Body>
      </Card>
        </div>
        
    </div>
  );
};

export default Products;
