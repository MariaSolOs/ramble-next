import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { SearchbarProps } from './index';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import * as S from './Searchbar.styled';

const Searchbar = (props: SearchbarProps) => {
    const { SearchExperiences: text } = useLanguageContext().appText;

    const buttonLink = routes.experienceSearch(
        props.location, 
        props.capacity.toString()
    );

    return (
        <S.Container>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <S.Autocomplete
                value={props.location}
                loading={props.locationList.length === 0}
                options={['Online', ...props.locationList]}
                onChange={(_, value, reason) => {
                    if (reason === 'selectOption') {
                        props.onLocationChange(value);
                    }
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOnIcon />
                        </InputAdornment>
                    )
                }} />
                <S.CollapsibleRow>
                    <S.CapacityInput
                    value={props.capacity}
                    step={1}
                    minValue={1}
                    getLabel={num => 
                        num > 1? text.peopleButtonLabel : text.personButtonLabel 
                    }
                    onValueChange={props.onCapacityChange}
                    InputProps={{
                        startAdornment: <FontAwesomeIcon icon={faUsers} />
                    }} />
                    <S.SearchButton variant="experience" link={buttonLink}>
                        {text.search}
                    </S.SearchButton>
                </S.CollapsibleRow>
            </Box>
            <S.TitleSearchbar
            value={props.titleFilter}
            onChange={event => props.onTitleFilterChange(event.target.value)}
            placeholder={text.titlePlaceholder}
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            } />
        </S.Container>
    );
}

export default Searchbar;