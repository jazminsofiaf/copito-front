/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


class OptionsSelector extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            value: [],
        };

    }

    handleOnClose(event, value){
        this.setState({
            value: [],
        })
    }


    render(){
        const { options,  filterFunc, label, handleOptionSelected, renderOption} = this.props;
        return (
        <Autocomplete
            id="combo-box"
            multiple
            value={this.state.value}
            autoComplete={true}
            options={options}
            getOptionLabel={filterFunc}
            style={{ width: '100%' }}
            onChange={handleOptionSelected}
            onClose={this.handleOnClose.bind(this)}
            renderInput={(params) => <TextField {...params}
                                                label={label}
                                                variant="outlined" />}
            renderOption={renderOption}
        />
        );
    }
}

export default OptionsSelector;
