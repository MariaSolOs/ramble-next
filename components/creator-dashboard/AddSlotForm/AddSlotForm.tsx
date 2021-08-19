import { DateTime } from 'luxon';
import LuxonUtils from '@date-io/luxon';

import useLanguageContext from 'context/languageContext';
import type { AddSlotFormProps } from './index';

import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import GradientButton from 'components/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AddSlotForm.styles';
const useStyles = makeStyles(styles);

const AddSlotForm = (props: AddSlotFormProps) => {
    const classes = useStyles();
    const { CreatorCalendar: text } = useLanguageContext().appText;

    const useDrawer = typeof props.openDrawer !== 'undefined';
    // Show both start and end time in calendar input
    const dateTimeFormat = `MMMM dd, yyyy ${
        props.startDate.toLocaleString(DateTime.TIME_24_SIMPLE)
    } - ${
        props.endDate.toLocaleString(DateTime.TIME_24_SIMPLE)
    }`;

    const form = (
        <MuiPickersUtilsProvider utils={LuxonUtils}>
            <form className={classes.form} onSubmit={props.onSubmit}>
                <Tooltip 
                title={text.timezoneMessage}
                enterTouchDelay={50}
                placement="top-end">
                    <InfoRoundedIcon className={classes.infoIcon} />
                </Tooltip>
                <h3 className={classes.title}>{text.formTitle}</h3>
                <p className={classes.subtitle}>{text.formDescription}</p>
                <FormControl className={classes.control}>
                    <FormLabel htmlFor="experience" className={classes.label}>
                        {text.experienceLabel}
                    </FormLabel>
                    <Select 
                    id="experience"
                    value={props.addExperience?._id || ''}
                    onChange={e => {
                        props.onAddExperienceChange(e.target.value as string);
                    }}
                    input={
                        <InputBase
                        className={`
                            ${classes.input}
                            ${classes.experienceSelect}
                        `} />
                    }
                    MenuProps={{ className: classes.experienceMenu }}>
                        {props.experienceOptions.map(exp =>
                            <MenuItem key={exp._id} value={exp._id}>
                                {exp.title}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl className={classes.control}>
                    <FormLabel htmlFor="date" className={classes.label}>
                        {text.dateAndTimeLabel}
                    </FormLabel>
                    <DateTimePicker 
                    id="date"
                    value={props.startDate} 
                    onChange={date => props.onDateChange(date as DateTime)}
                    disablePast
                    hideTabs
                    minutesStep={5} 
                    format={dateTimeFormat}
                    className={classes.input}
                    DialogProps={{ className: classes.dateDialog }} />
                </FormControl>
                <GradientButton
                type="submit"
                variant="creator"
                disabled={props.addDisabled}
                className={classes.addButton}>
                    {text.addSlot}
                </GradientButton>
            </form>
        </MuiPickersUtilsProvider>
    );

    if (useDrawer) {
        return (
            <>
                <button 
                className={classes.openFormButton}
                onClick={props.onOpenDrawer}>
                    {text.formTitle}
                </button>
                <Drawer
                open={props.openDrawer}
                onClose={props.onCloseDrawer}
                anchor="bottom"
                className={classes.formDrawer}>
                    {form}
                </Drawer>
            </>
        );
    } else {
        return form;
    }
}

export default AddSlotForm;