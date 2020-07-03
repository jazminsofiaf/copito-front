import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";

const defaultProps = {
    bgcolor: 'background.paper',
    border: 1,
    borderColor: 'secondary.main',
    style: { width: '5rem', height: '5rem' },
};

class SearchFilter extends React.Component{


    render(){
        const { classes, onTextChange, search, stateKey } = this.props;
        return (
            <Box display="flex" justifyContent="center" >
                <Box className={classes.contentBox}>
                <Box display="flex" justifyContent="center" flexDirection="row" m={1}  >
                    <Box p={1} bgcolor="white" {...defaultProps} borderRight={0} style={{borderRadius: '10px 0px 0px 10px'}} >
                        <SearchIcon />
                    </Box>
                    <Box p={0} bgcolor="white" {...defaultProps} borderLeft={0} style={{borderRadius: '0px 10px 10px 0px'}} flexGrow={1}>
                        <InputBase
                            placeholder="Buscar..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            name={search}
                            onChange={onTextChange(stateKey)}
                        />
                    </Box>
                </Box>
                </Box>
            </Box>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        height: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit ,
        transition: theme.transitions.create('width'),
        width: '100%',
        height: '100%',

    },
    contentBox:{
        width: '50%',
            [theme.breakpoints.down("sm")]: {
                width: '90%',
            }

    }

});

export default withStyles(styles)(SearchFilter);