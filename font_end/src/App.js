import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid, Row, Col,Button} from 'react-bootstrap'
import '../node_modules/react-bootstrap/dist/react-bootstrap';




class App extends Component {
  state = {
    products: [],
    product:{
      name: 'sample product',
      price: 20
    }
  }

  componentDidMount(){
    this.getProduct();
  }

  getProduct = _ =>{
    fetch('http://localhost:4000/products/')
      .then(response=> response.json())
      .then(response => this.setState({
        products: response.data
      }))
      .catch(err=>{
        console.log(err);
      })
  }

  renderProduct = ({product_id,name,price})=>(
      <tbody key = {product_id}>
        <tr>
        <td>{product_id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td><Button onClick={()=>this.deleteProduct(product_id)}>Delete</Button></td>
        </tr>
      </tbody>
  );

  addProduct = () =>{
    const {product} = this.state;
    fetch(`http://localhost:4000/products/add?name=${product.name}&price=${product.price}`)
      .then(this.getProduct)
      .catch(err=>{
        if(err){
          console.error(err)
        }else{
          console.log("added successfully!")
        }
      });
  }

  deleteProduct = (id) =>{
    fetch(`http://localhost:4000/products/delete/${id}`)
      .then(this.getProduct)
      .catch(err=>{
        if(err){
          console.error(err);
        }else{
          console.log("deleted successfully!")
        }
      })
  }



  render() {
    const {products,product} = this.state;
    const mapingRows = products.map(this.renderProduct);
    const productTable = <table border = "1">
    <tbody>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Delete</th>
      </tr>
    </tbody>
    {mapingRows}
  </table>
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          
        </header>
        

      <Grid>

        <Row className="show-grid" >
          <Col md={6} mdOffset={4}>
            {productTable}
            
            <input 
              value = {product.name} 
              onChange={e=>this.setState({product:{...product,name:e.target.value}})}/>
            <input 
              value = {product.price} 
              onChange={e=>this.setState({product:{...product,price:e.target.value}})}/>
            
            <Button onClick={this.addProduct}>Add Product</Button>

          </Col>
        </Row>
      </Grid>
      </div>
    );
  }
}

export default App;


