import React, {Component} from 'react';
import {Link,Route,Switch} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';

import DisplayFromDB from '../../displayFromDB/displayFromDB';
import FetchFromDB from '../../fetchFromDB/fetchFromDB'

class Navbar extends Component{
    state = {

    }

    itemClickHandler = (e,{name}) => this.setState({activeItem: name});

    render(){

        const {activeItem} = this.state

        return(
            <div>
                <Menu fixed="top" inverted>
                <Menu.Item header>WeGive</Menu.Item>
                <Link to ="/">
                    <Menu.Item
                        name='Home'
                        active={activeItem === 'Home'}
                        onClick={this.itemClickHandler}/>
                </Link>
                <Link to = "/add">
                
                    <Menu.Item
                        name = 'Add'
                        active={activeItem === 'Add'}
                        onClick={this.itemClickHandler}/>
                </Link>
                
                </Menu>
                <Switch>
                    <Route path = '/' exact component = {DisplayFromDB} />
                    <Route path = '/add' component = {FetchFromDB} />
                </Switch> 
               
            </div>
        )
    }
} 

export default Navbar;