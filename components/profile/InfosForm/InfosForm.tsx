import useLanguageContext from 'context/languageContext';
import { ProfileFormField as FormField } from 'models/user-interface';
import { MAX_CREATOR_BIO_LENGTH } from 'global-constants';
import type { InfosFormProps } from './index';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from 'components/TextField';
import GradientButton from 'components/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './InfosForm.styles';
const useStyles = makeStyles(styles);

const InfosForm = (props: InfosFormProps) => {
    const { Profile_PersonalInformation: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <form className={classes.form} onSubmit={props.onSubmit}>
            <FormControl className={classes.formControl}>
                <FormLabel className={classes.label} htmlFor={FormField.FirstName}>
                    {text.firstName}
                </FormLabel>
                <TextField
                id={FormField.FirstName}
                name={FormField.FirstName}
                required
                value={props.values.firstName}
                onChange={props.onChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <FormLabel className={classes.label} htmlFor={FormField.LastName}>
                    {text.lastName}
                </FormLabel>
                <TextField
                id={FormField.LastName}
                name={FormField.LastName}
                required
                value={props.values.lastName}
                onChange={props.onChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <FormLabel className={classes.label} htmlFor={FormField.City}>
                    {text.liveIn}
                </FormLabel>
                <TextField
                id={FormField.City}
                name={FormField.City}
                value={props.values.city}
                onChange={props.onChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <FormLabel className={classes.label} htmlFor={FormField.Email}>
                    {text.email}
                </FormLabel>
                <TextField
                id={FormField.Email}
                name={FormField.Email}
                required
                type="email"
                value={props.values.email}
                onChange={props.onChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <FormLabel className={classes.label} htmlFor={FormField.PhoneNumber}>
                    {text.phoneNumber}
                </FormLabel>
                <TextField
                id={FormField.PhoneNumber}
                name={FormField.PhoneNumber}
                required={props.isCreator}
                type="tel"
                placeholder="(123) 456-7890"
                helperText={props.phoneError && text.phoneError}
                value={props.values.phoneNumber}
                onChange={props.onChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <FormLabel className={classes.label} htmlFor={FormField.Birthday}>
                    {text.birthday}
                </FormLabel>
                <TextField
                id={FormField.Birthday}
                name={FormField.Birthday}
                type="date"
                value={props.values.birthday}
                onChange={props.onChange} />
            </FormControl>
            {props.isCreator && 
                <FormControl className={`${classes.formControl} ${classes.creatorBio}`}>
                    <FormLabel className={classes.label} htmlFor={FormField.CreatorBio}>
                        {text.aboutYou}
                    </FormLabel>
                    <TextField
                    id={FormField.CreatorBio}
                    name={FormField.CreatorBio}
                    multiline
                    minRows={4}
                    maxRows={4}
                    required
                    value={props.values.creatorBio}
                    onChange={props.onChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {MAX_CREATOR_BIO_LENGTH - props.values.creatorBio.length}
                            </InputAdornment>
                        )
                    }} />
                </FormControl>}
            <footer className={classes.footer}>
                <GradientButton 
                variant="experience"
                type="submit"
                className={classes.submitButton}>
                    {text.submitButton}
                </GradientButton>
            </footer>
        </form>
    );
}

export default InfosForm;