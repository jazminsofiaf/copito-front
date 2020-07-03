import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


class FilterBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
    }

    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
        })
    };


    handleClose = () => {
        this.setState({
            anchorEl: null,
        })
    };



    render() {
        const {
            classes,
            categoryList, categoryName, onFilterClick,
        }  = this.props;
        const open = Boolean(this.state.anchorEl);
        return (
            <div>
                <Box display="flex" flexDirection="row" pl={10} ml={1} >
                    <Box display="flex" flexDirection="row"  >
                        <Box pt={3} onClick={this.handleClick}>
                            <KeyboardArrowDownIcon />
                        </Box>
                        <Box pt={3} >
                            <div>
                                <Button aria-controls="fade-menu" aria-haspopup="true" onClick={this.handleClick} className={classes.menuButton}>
                                    Categoria
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={open}
                                    onClose={this.handleClose}
                                    TransitionComponent={Fade}
                                >
                                    {categoryList.map(category => (
                                        <MenuItem  key={category} name={categoryName} onClick={onFilterClick(category)}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </div>
        );
    }
}


const styles = theme => ({
    container: {
        overflow: 'auto',
    },
    menuButton: {
        textTransform: 'none',
    }

});

export default withStyles(styles)(FilterBar);