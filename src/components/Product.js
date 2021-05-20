import React from 'react';
import { Card } from 'react-bootstrap'

const Product = ({product}) => {

    return (
      <Card className="mb-3">
        <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Title>
                  {product.name} - <span className="text-muted font-weight-light">{product.brand}</span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                  Total items in stock: {product.instock}
                </Card.Subtitle>
                <Card.Subtitle className="text-muted mb-2">
                  Description: {product.description}
                </Card.Subtitle>
                {/* <Badge variant="secondary" className="mr-2">{product.description}</Badge>
                <Badge variant="secondary">{product.instock}</Badge> */}
        
              
              <div className="companylogo">
                <img className="d-none d-md-block" height="50" alt={product.company} src={product.company_logo} />
              </div>
            </div>
          </div>  
            
            
        </Card.Body>
      </Card>
    );
}
 
export default Product;
