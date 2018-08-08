import React,{Component} from 'react';
import img1 from '../../img/haha.png';
import {Grid,Button,Image} from 'semantic-ui-react'
import './fetchFromDB.css';




class FetchFromDB extends Component {
    state = {
        products: [],
        product:{
            name:'sample product',
            price: 20,
            image: 'Default String'
        }
    }

    componentDidMount(){
        this.getProductHandler();
    }

    getProductHandler = _ =>{
        fetch('http://localhost:4000/products/')
          .then(response=> response.json())
          .then(response => this.setState({
            products: response.data
          }))
          .catch(err=>{
            console.log(err);
          })
      }
    
      addProductHandler = () =>{
        const {product} = this.state;
        fetch(`http://localhost:4000/products/add?name=${product.name}&price=${product.price}&image=${product.image}`)
          .then(this.getProductHandler)
          .catch(err=>{
            if(err){
              console.error(err)
            }else{
              console.log("added successfully!")
            }
          });
      }
    
      deleteProductHandler = (id) =>{
        fetch(`http://localhost:4000/products/delete/${id}`)
          .then(this.getProductHandler)
          .catch(err=>{
            if(err){
              console.error(err);
            }else{
              console.log("deleted successfully!")
            }
          })
      }


    renderProduct = ({product_id,name,price})=>(
        <tbody key = {product_id}>
          <tr>
            <td><Image className = "icon" src={img1}/></td>
            <td>{product_id}</td>
            <td>{name}</td>
            <td>{price}</td>
            <td><Button onClick={()=>this.deleteProductHandler(product_id)}>Delete</Button></td>
          </tr>
        </tbody>
    );

    render(){
        const {products,product} = this.state;
        const mapingRows = products.map(this.renderProduct);
        const productTable = <table className='ui celled table'>
        <tbody>
            <tr>
                <th></th>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Delete</th>
            </tr>
        </tbody>
        {mapingRows}
        </table>
    return(
        <Grid celled='internally' >

            <Grid.Row className="show-grid" >
                <Grid.Column width={3}>
                    
                </Grid.Column>
                <Grid.Column width={10}>
                    <Grid.Row>
                        {productTable}
                    </Grid.Row>
                    <Grid.Row>
                        <input 
                            value = {product.name} 
                            onChange={e=>this.setState({product:{...product,name:e.target.value}})}/>
                        <input 
                            value = {product.price} 
                            onChange={e=>this.setState({product:{...product,price:e.target.value}})}/>
            
                    
                    </Grid.Row>
                    <Grid.Row width={3}>
                        <Button onClick={this.addProductHandler}>Add Product</Button>
                    </Grid.Row>
                    
                    

                </Grid.Column>
                <Grid.Column>
                    
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
    }
    
}

export default FetchFromDB;