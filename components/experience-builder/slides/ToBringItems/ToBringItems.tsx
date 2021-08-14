import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import type { ToBringItemsProps } from './index';

import Title from 'components/experience-builder/SlideTitle';
import Subtitle from 'components/experience-builder/SlideSubtitle';
import Checkbox from 'components/Checkbox';
import Tip from 'components/Tip';
import TextField from 'components/TextField';
import Chip from '@material-ui/core/Chip';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ToBringItems.styles';
const useStyles = makeStyles(styles);

const ToBringItems = (props: ToBringItemsProps) => {
    const { BuilderSlides_ToBringItems: text } = useLanguageContext().appText;
    const classes = useStyles();

    // Users can skip this page, by default they bring nothing
    const { onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(true);
    }, [onSlideComplete]);

    const [shouldBring, setShouldBring] = useState(props.items.length > 0);
    const [newItem, setNewItem] = useState('');
    const [showErrMsg, setShowErrMsg] = useState(false);

    const handleNewItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowErrMsg(false);
        setNewItem(event.target.value);
    }

    const handleAddItem = () => {
        let toAdd = newItem.trim();
        // Capitalize the item
        toAdd = toAdd.length >= 2 ? 
            toAdd.charAt(0).toUpperCase() + toAdd.slice(1) : toAdd;
            
        // Make sure string is valid and not a duplicate
        if (toAdd.length < 2 || props.items.includes(toAdd)) {
            setShowErrMsg(true);
            return;
        }

        props.onItemsChange([ ...props.items, toAdd ]);
        // Reset the form
        setNewItem('');
    }

    const handleDeleteItem = (toDelete: string) => {
        const newItems = props.items.filter(item => item !== toDelete);
        props.onItemsChange(newItems);
    }

    // Add item if user presses enter
    const handleEnter = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') { 
            handleAddItem();
        }
    }

    return (
        <>
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle1}</Subtitle>
            <div className={classes.checkboxContainer}>
                <div className={classes.checkboxField}>
                    <Checkbox
                    checked={shouldBring}
                    onChange={(_, checked) => {
                        if (checked) {
                            setShouldBring(true);
                        }
                    }} />
                    <label>{text.yes}</label>
                </div>
                <div className={classes.checkboxField}>
                    <Checkbox
                    checked={!shouldBring}
                    onChange={(_, checked) => {
                        if (checked) {
                            setShouldBring(false);
                        }
                    }} />
                    <label>{text.no}</label>
                </div>
            </div>
            {shouldBring && 
                <div onKeyDown={handleEnter}>
                    <Subtitle>{text.subtitle2}</Subtitle>
                    <Tip>{text.tip}</Tip>
                    <TextField
                    label={text.fieldLabel}
                    placeholder={text.placeholder}
                    className={classes.textfield}
                    value={newItem}
                    onChange={handleNewItemChange} />
                    <AddCircleIcon className={classes.addIcon} onClick={handleAddItem} />
                    <p className={classes.errMsg}>
                        {showErrMsg && text.alreadyIncluded}
                    </p>
                    <div className={classes.chipList}>
                        {props.items.map(item => 
                            <Chip 
                            key={uuid()} 
                            label={item} 
                            className={classes.chip}
                            onDelete={() => handleDeleteItem(item)} />
                        )}
                    </div>
                </div>}
        </>
    );
}

export default ToBringItems;