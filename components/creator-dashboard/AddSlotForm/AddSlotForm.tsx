import { DateTime } from 'luxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import type { TextFieldProps } from '@mui/material/TextField';

import useLanguageContext from 'context/languageContext';
import type { AddSlotFormProps } from './index';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/MobileDateTimePicker';
import * as S from './AddSlotForm.styled';

const AddSlotForm = (props: AddSlotFormProps) => {
    const { CreatorCalendar: text } = useLanguageContext().appText;

    const useDrawer = typeof props.openDrawer !== 'undefined';
    // Show both start and end time in calendar input
    const dateTimeFormat = `MMMM dd, yyyy ${
        props.startDate.toLocaleString(DateTime.TIME_24_SIMPLE)
    } - ${
        props.endDate.toLocaleString(DateTime.TIME_24_SIMPLE)
    }`;

    const form = (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <S.Form onSubmit={props.onSubmit}>
                <Tooltip 
                title={text.timezoneMessage}
                enterTouchDelay={50}
                placement="top-end">
                    <S.InfoIcon />
                </Tooltip>
                <Box component="h3" sx={{ m: 0, fontSize: { xs: '1.2rem', md: '1.1rem' } }}>
                    {text.formTitle}
                </Box>
                <Box component="p" sx={{ m: 0, fontSize: { xs: '1rem', md: '0.85rem' } }}>
                    {text.formDescription}
                </Box>
                <S.FormControl>
                    <S.Label htmlFor="experience">{text.experienceLabel}</S.Label>
                    <Select
                    id="experience"
                    value={props.addExperience?._id || ''}
                    onChange={e => {
                        props.onAddExperienceChange(e.target.value as string);
                    }}
                    input={
                        <S.Input 
                        component={InputBase}
                        sx={{ borderBottom: '1px solid #FFF' }} />
                    }
                    MenuProps={{ sx: S.experienceMenuStyles }}>
                        {props.experienceOptions.map(exp =>
                            <MenuItem key={exp._id} value={exp._id}>
                                {exp.title}
                            </MenuItem>
                        )}
                    </Select>
                </S.FormControl>
                <S.FormControl>
                    <S.Label>{text.dateAndTimeLabel}</S.Label>
                    <DateTimePicker
                    value={props.startDate} 
                    onChange={date => props.onDateChange(date as DateTime)}
                    disablePast
                    hideTabs
                    minutesStep={5} 
                    inputFormat={dateTimeFormat}
                    DialogProps={{
                        PaperProps: {
                            sx: S.datePickerPaperStyles
                        }
                    }}
                    renderInput={props => 
                        <S.Input 
                        component={TextField} 
                        {...{
                            ...props,
                            variant: 'standard'
                        } as TextFieldProps as any} />
                    } />
                </S.FormControl>
                <S.AddButton 
                type="submit" 
                variant="creator"
                disabled={props.addDisabled}>
                    {text.addSlot}
                </S.AddButton>
            </S.Form>
        </LocalizationProvider>
    );

    if (useDrawer) {
        return (
            <>
                <S.OpenFormButton onClick={props.onOpenDrawer}>
                    {text.formTitle}
                </S.OpenFormButton>
                <S.FormDrawer
                open={props.openDrawer}
                onClose={props.onCloseDrawer}
                anchor="bottom">
                    {form}
                </S.FormDrawer>
            </>
        );
    } else {
        return form;
    }
}

export default AddSlotForm;