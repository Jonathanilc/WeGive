import React,{Component}from 'react';
import img1 from '../../img/haha.png';
import {Grid,Image} from 'semantic-ui-react'
import './displayFromDB.css';
import { Card,Icon} from 'semantic-ui-react'

class displayFromDB extends Component {
    state = {
        products:[]
    }

    componentDidMount(){
        this.getProductHandler();
    }

    getProductHandler = () => {
        fetch('http://localhost:4000/products/')
        //fetch('http://172.25.8.114:4000/products/')
          .then(response=> response.json())
          .then(response => this.setState({
            products: response.data
          }))
          .catch(err=>{
            console.log(err);
          })
    }

    renderProduct = ({product_id,name,price})=>(
        <Grid.Column key = {product_id}>
            <Card >
            <Image className = "icon" src={img1}/>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                    <span className='date'>ID: {product_id}</span>
                </Card.Meta>
                <Card.Description>Price: {price}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                        Something
                </a>
            </Card.Content>
            </Card>      
        </Grid.Column>
        
    );

    render(){

        

        const {products} = this.state;
        const mapingRows = products.map(this.renderProduct);
        
        
        

        return(
            <Grid  columns = {4} celled='internally' divided >

            <Grid.Row className="show-grid" >
                {mapingRows}
            </Grid.Row>
        </Grid>
        )
    }
}


export default displayFromDB;