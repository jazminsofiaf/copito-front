import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

export default function DownAlertSnackbar() {
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const handleClick = (Transition) => () => {
        setTransition(() => Transition);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClick(TransitionDown)}></Button>
            <Snackbar
                open={open}
                onClose={handleClose}
                TransitionComponent={transition}
                message="I love snacks"
            />
        </div>
    );
}
