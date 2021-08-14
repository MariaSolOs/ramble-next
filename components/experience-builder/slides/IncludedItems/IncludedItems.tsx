import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import type { IncludedItemsProps } from './index';

import Title from 'components/experience-builder/SlideTitle';
import Subtitle from 'components/experience-builder/SlideSubtitle';
import Tip from 'components/Tip';
import TextField from 'components/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Chip from '@material-ui/core/Chip';

import { makeStyles } from '@material-ui/core/styles';
import styles from './IncludedItems.styles';
const useStyles = makeStyles(styles);

const IncludedItems = (props: IncludedItemsProps) => {
    const { BuilderSlides_IncludedItems: text } = useLanguageContext().appText;
    const classes = useStyles();

    // Users can skip this page, by default nothing is included
    const { onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(true);
    }, [onSlideComplete]);

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
        <div onKeyDown={handleEnter}>
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle}</Subtitle>
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
        </div>
    );
}

export default IncludedItems;