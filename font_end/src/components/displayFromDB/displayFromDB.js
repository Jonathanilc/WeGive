import React,{Component}from 'react';
import img1 from '../../img/haha.png';
import {Grid,Image} from 'semantic-ui-react'
import './displayFromDB.css';
import { Label,Table } from 'semantic-ui-react'

class displayFromDB extends Component {
    state = {
        products:[]
    }

    componentDidMount(){
        this.getProductHandler();
    }

    getProductHandler = () => {
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
        <Table.Body key = {product_id}>
          <Table.Row>
            <Table.Cell><Image className = "icon" src={img1}/></Table.Cell>
            <Table.Cell>{product_id}</Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{price}</Table.Cell>
          </Table.Row>
        </Table.Body>
    );

    render(){

        

        const {products} = this.state;
        const mapingRows = products.map(this.renderProduct);
        const productTable = <Table className='ui celled table'>
        <Table.Body>
            <Table.Row>
                <Table.HeaderCell><Label ribbon>Image</Label></Table.HeaderCell>
                <Table.HeaderCell><Label ribbon>ID</Label></Table.HeaderCell>
                <Table.HeaderCell><Label ribbon>Name</Label></Table.HeaderCell>
                <Table.HeaderCell><Label ribbon>Price</Label></Table.HeaderCell>
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
                    
                </Grid.Column>
                <Grid.Column>
                    
                </Grid.Column>
            </Grid.Row>
        </Grid>
        )
    }
}


export default displayFromDB;