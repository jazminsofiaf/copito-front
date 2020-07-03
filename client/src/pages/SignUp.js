import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import IconAnimation from "../components/IconAnimation";


const profileFormEndpoint = "/profiles";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                Florida-ProductosVeterinarios
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const requierdMessage = 'Requerido';
const numberMessageValidation = 'Solo numeros';
const wordInputValidationMessage = "Letras unicamente"
const maxNumberOfAddresses = 3;

function maxCharsMessage(max) {
    return 'Maximo de ' + max + ' caracteres';
}

const newAddress = {
    country: 'Argentina',
    province: '',
    city: '',
    locality: '',
    street_name: '',
    street_number: '',
    postal_code: '',
    floor_number: ''
}

const initialValues = {
    first_name: '',
    surname: '',
    business_name: '',
    id_number: '',
    email: '',
    phone: '',
    addresses: [newAddress],
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Mail invalido')
        .max(40, maxCharsMessage(40))
        .required(requierdMessage),
    first_name: Yup.string()
        .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
        .max(40, maxCharsMessage(40))
        .required(requierdMessage),
    surname: Yup.string()
        .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
        .max(40, maxCharsMessage(40))
        .required(requierdMessage),
    business_name: Yup.string()
        .max(40, maxCharsMessage(40)),
    id_number: Yup.string().matches(/^[0-9]*$/, numberMessageValidation)
        .max(15, maxCharsMessage(15))
        .required(requierdMessage),
    phone: Yup.string()
        .max(15, maxCharsMessage(15))
        .required(requierdMessage),
    addresses: Yup.array().of(Yup.object({
        country: Yup.string()
            .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
            .max(20, maxCharsMessage(20))
            .required(requierdMessage),
        province: Yup.string()
            .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
            .max(40, maxCharsMessage(40))
            .required(requierdMessage),
        city: Yup.string()
            .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
            .max(40, maxCharsMessage(40))
            .required(requierdMessage),
        street_name: Yup.string()
            .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
            .max(40, maxCharsMessage(40))
            .required(requierdMessage),
        street_number: Yup.string()
            .matches(/^[0-9]*$/, numberMessageValidation)
            .max(8, maxCharsMessage(8))
            .required(numberMessageValidation),
        postal_code: Yup.string()
            .max(10, maxCharsMessage(10))
            .required(requierdMessage),
        floor_number: Yup.string()
            .max(6, maxCharsMessage(6))
    })),
});


class SignUp extends React.Component {

    handleSignIn = (event) => {
        this.props.history.push('/login');
    }

    render() {
        const { classes } = this.props;

        async function onSubmit(values) {
            const options = {
                headers: { 'Content-Type': 'application/json' }
            };
            const profile = {
                new_profile: values
            }
            try {
                await axios.post(profileFormEndpoint,
                    profile, options);
                alert("Felicidades, solicitud exitosa!.\nPronto nos pondremos en contacto para habilitar la cuenta.\nMuchas gracias!");
            } catch (error) {
                alert("Error, perfil invalido.\nSi el error persiste contactenos.");
            }
        }

        return (
            <Container component="main" maxWidth='sm'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <IconAnimation height={50} width={50} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Solicitar apertura de cuenta
                    </Typography>
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ values, isSubmitting }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" align="left" className={classes.mainTitle}>
                                            Datos personales
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field name={"first_name"}>
                                            {({ field, meta }) =>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="first_name"
                                                    label="Nombre"
                                                    type="text"
                                                    error={(meta.touched && meta.error !== undefined)}
                                                    helperText={((meta.touched) && meta.error)}
                                                />
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field name={"surname"}>
                                            {({ field, meta }) =>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="surname"
                                                    label="Apellido"
                                                    type="text"
                                                    error={(meta.touched && meta.error !== undefined)}
                                                    helperText={((meta.touched) && meta.error)}
                                                />
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Field name={"business_name"}>
                                            {({ field, meta }) =>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth
                                                    id="business_name"
                                                    label="Razon social / Alias"
                                                    type="text"
                                                    error={(meta.touched && meta.error !== undefined)}
                                                    helperText={((meta.touched) && meta.error)}
                                                />
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Field name={"id_number"}>
                                            {({ field, meta }) =>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                    id="id_number"
                                                    label="cuit/cuil/dni"
                                                    type="text"
                                                    error={(meta.touched && meta.error !== undefined)}
                                                    helperText={((meta.touched) && meta.error)}
                                                />
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Field name={"email"}>
                                            {({ field, meta }) =>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                    id="email"
                                                    label="Email"
                                                    type="text"
                                                    autoComplete="email"
                                                    error={(meta.touched && meta.error !== undefined)}
                                                    helperText={((meta.touched) && meta.error)}
                                                />
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Field name={"phone"}>
                                            {({ field, meta }) =>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                    id="phone"
                                                    label="Telefono"
                                                    type="text"
                                                    error={(meta.touched && meta.error !== undefined)}
                                                    helperText={((meta.touched) && meta.error)}
                                                />
                                            }
                                        </Field>
                                    </Grid>


                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" align="left" className={classes.mainTitle}>
                                            Direccion
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FieldArray name={"addresses"}>
                                            {({ push, remove }) => (
                                                <React.Fragment>
                                                    {values.addresses && values.addresses.length > 0 && values.addresses.map((address, index) =>
                                                        <div key={`addresses[${index}]`}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={12} sm={6}>
                                                                    <Field name={`addresses[${index}].country`}>
                                                                        {({ field, meta }) => //Child function that acts as render prop
                                                                            <TextField
                                                                                {...field}
                                                                                variant="outlined"
                                                                                disabled
                                                                                required
                                                                                fullWidth
                                                                                key={field.name}
                                                                                label="Pais"
                                                                                type="text"
                                                                                error={(meta.touched && meta.error !== undefined)}
                                                                                helperText={((meta.touched) && meta.error)}
                                                                            />
                                                                        }
                                                                    </Field>
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <Field name={`addresses[${index}].province`}>
                                                                        {({ field, meta }) =>
                                                                            <TextField
                                                                                {...field}
                                                                                variant="outlined"
                                                                                required
                                                                                fullWidth
                                                                                key={field.name}
                                                                                label="Provincia"
                                                                                type="text"
                                                                                error={(meta.touched && meta.error !== undefined)}
                                                                                helperText={((meta.touched) && meta.error)}
                                                                            />
                                                                        }
                                                                    </Field>
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <Field name={`addresses[${index}].city`}>
                                                                        {({ field, meta }) =>
                                                                            <TextField
                                                                                {...field}
                                                                                variant="outlined"
                                                                                required
                                                                                fullWidth
                                                                                key={field.name}
                                                                                label="Partido"
                                                                                type="text"
                                                                                error={(meta.touched && meta.error !== undefined)}
                                                                                helperText={((meta.touched) && meta.error)}
                                                                            />
                                                                        }
                                                                    </Field>
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <Field name={`addresses[${index}].locality`}>
                                                                        {({ field, meta }) =>
                                                                            <TextField
                                                                                {...field}
                                                                                variant="outlined"
                                                                                required
                                                                                fullWidth
                                                                                key={field.name}
                                                                                label="Localidad"
                                                                                type="text"
                                                                                error={(meta.touched && meta.error !== undefined)}
                                                                                helperText={((meta.touched) && meta.error)}
                                                                            />
                                                                        }
                                                                    </Field>
                                                                </Grid>

                                                                <Grid item xs={12} sm={8}>
                                                                    <Field name={`addresses[${index}].street_name`}>
                                                                        {({ field, meta }) =>
                                                                            <TextField
                                                                                {...field}
                                                                                variant="outlined"
                                                                                required
                                                                                fullWidth
                                                                                key={field.name}
                                                                                label="Calle"
                                                                                type="text"
                                                                                error={(meta.touched && meta.error !== undefined)}
                                                                                helperText={((meta.touched) && meta.error)}
                                                                            />
                                                                        }
                                                                    </Field>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Field name={`addresses[${index}].street_number`}
                                                                        type={"number"}>
                                                                        {({ field, meta }) =>
                                                                            <TextField
                                                                                {...field}
                                                                                variant="outlined"
                                                                                required
                                                                                fullWidth
                                                                                key={field.name}
                                                                                label="Numero"
                                                                                error={(meta.touched && meta.error !== undefined)}
                                                                                helperText={((meta.touched) && meta.error)}
                                                                            />
                                                                        }
                                                                    </Field>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Field name={`addresses[${index}].postal_code`}
                                                                        type={"text"}>
                                                                        {({ field, meta }) =>
                                                                            <TextField
                                                                                {...field}
                                                                                variant="outlined"
                                                                                required
                                                                                fullWidth
                                                                                key={field.name}
                                                                                label="Codigo postal"
                                                                                error={(meta.touched && meta.error !== undefined)}
                                                                                helperText={((meta.touched) && meta.error)}
                                                                            />
                                                                        }
                                                                    </Field>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Field name={`addresses[${index}].floor_number`}
                                                                        type={"text"}>
                                                                        {({ field, meta }) =>
                                                                            <TextField
                                                                                {...field}
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                key={field.name}
                                                                                label="Piso"
                                                                                error={(meta.touched && meta.error !== undefined)}
                                                                                helperText={((meta.touched) && meta.error)}
                                                                            />
                                                                        }
                                                                    </Field>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={12} hidden={`${index}` == 0}>
                                                                <button
                                                                    type={"button"}
                                                                    key={`button[${index}]`}
                                                                    onClick={() => remove(index)}
                                                                    style={{ marginTop: '5px' }}
                                                                >Quitar
                                                                </button>
                                                            </Grid>
                                                            <div hidden={`${index}` == (values.addresses.length - 1)}>
                                                                <hr style={{ margin: '5px 0px 5px 0px' }} />
                                                                <Typography style={{ marginBottom: '5px' }} variant="subtitle1" align="left" className={classes.mainTitle}>
                                                                    Direccion alternativa {index + 1}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <Button
                                                        type="button"
                                                        disabled={isSubmitting || values.addresses.length === maxNumberOfAddresses}
                                                        variant="contained"
                                                        color="default"
                                                        onClick={() => push(newAddress)}
                                                        style={{ marginTop: '10px' }}
                                                    >
                                                        Agregar direccion
                                                    </Button>
                                                </React.Fragment>
                                            )}
                                        </FieldArray>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="Si, deseo recibir ofertas por email."
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Enviar solicitud
                                </Button>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Link variant="body2" onClick={this.handleSignIn}>
                                            Ya tienes una cuenta? Inicia sesion
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


export default withStyles(styles)(SignUp);