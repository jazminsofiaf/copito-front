import React from 'react';
import ShopCartDrawer from "./ShopCartDrawer";
import withStyles from "@material-ui/core/styles/withStyles";
import FilterBar from "../components/FilterBar";
import Box from "@material-ui/core/Box";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";



class ShopProducts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
            cart: {},
            search: '',
            categories: ["Todos","Medicamentos", "Alimentos", "juguetes"],
            category: 'Todos',
        }
    }

    getProducts() {
        fetch('https://my-json-server.typicode.com/jazminsofiaf/fake_endpoint/db', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    products : data.products,
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    componentDidMount(){
        this.getProducts();
    }

    handleOnFilterClick = name => event => {
        console.log(event.target);
        this.setState(
            {category: name}
        )
    };
    handleTextChange= name => event => {
        console.log(event.target.value);
        this.setState({ [name] : event.target.value });
    };

    handleAddToCart = productId => {
        console.log("add to card" + productId);
        const count = this.state.cart[productId];
        const newShopCart = this.state.cart;
        if(count !== undefined){
            newShopCart[productId] = count + 1;
        }else{
            newShopCart[productId] = 1;
        }
        this.setState({ cart : newShopCart});
    }



    render() {
        const { classes } = this.props;
        return(
            <ShopCartDrawer products={this.state.products} cart={this.state.cart}>
                <div>
                    <SearchFilter
                                stateKey="search"
                                search={this.state.search}
                                onTextChange={this.handleTextChange.bind(this)}
                    />
                    <FilterBar
                                categoryList={this.state.categories}
                                categoryName={this.state.category}
                                onFilterClick={this.handleOnFilterClick.bind(this)}
                    />
                    <Box display="flex" className={classes.products}>
                                {this.state.products.map((product, i) =>{
                                    if((this.state.category === 'Todos' || product.id %2 === 0)
                                        &&
                                        (product.name.toLowerCase().includes(this.state.search.toLowerCase())))
                                        return(
                                            <div key={i} style={{flexGrow:1}}>
                                                <ProductCard product={product} onAddToCart={this.handleAddToCart.bind(this)}/>
                                            </div>
                                        )
                                })}
                    </Box>
                </div>
            </ShopCartDrawer>
        );
    }
}


const styles = theme => ({
    products: {
        display: 'flex',
        flexFlow: 'row wrap',
        marginLeft:'5%',
    },
    root: {
        display: 'flex',
    },
});


export default withStyles(styles)(ShopProducts);
