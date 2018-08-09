import React,{Component} from 'react';
import img1 from '../../img/haha.png';
import {Grid,Button,Image,Label,Table} from 'semantic-ui-react'
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
        <Table.Body key = {product_id}>
          <Table.Row>
            <Table.Cell><Image className = "icon" src={img1}/></Table.Cell>
            <Table.Cell>{product_id}</Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{price}</Table.Cell>
            <Table.Cell><Button onClick={()=>this.deleteProductHandler(product_id)}>Delete</Button></Table.Cell>
          </Table.Row>
        </Table.Body>
    );

    render(){
        const {products,product} = this.state;
        const mapingRows = products.map(this.renderProduct);
        const productTable = <Table className='ui celled table'>
        <Table.Body>
            <Table.Row>
                <Table.HeaderCell><Label ribbon>Image</Label></Table.HeaderCell>
                <Table.HeaderCell><Label ribbon>ID</Label></Table.HeaderCell>
                <Table.HeaderCell><Label ribbon>Name</Label></Table.HeaderCell>
                <Table.HeaderCell><Label ribbon>Price</Label></Table.HeaderCell>
                <Table.HeaderCell><Label ribbon>Delete</Label></Table.HeaderCell>
            </Table.Row>
        </Table.Body>
        {mapingRows}
        </Table>
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