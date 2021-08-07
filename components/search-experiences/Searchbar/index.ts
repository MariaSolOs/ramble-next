import Searchbar from './Searchbar';

export type SearchbarProps = {
    location: string;
    locationList: string[];
    onLocationChange: (loc: string) => void;
    capacity: number;
    onCapacityChange: (cap: number) => void;
    titleFilter: string;
    onTitleFilterChange: (title: string) => void;
}

export default Searchbar;