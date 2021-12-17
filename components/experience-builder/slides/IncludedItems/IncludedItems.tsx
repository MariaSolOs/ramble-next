import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import type { IncludedItemsProps } from './index';

import Tip from 'components/Tip';
import TextField from 'components/TextField';
import Chip from '@mui/material/Chip';
import * as S from './IncludedItems.styled';

const IncludedItems = (props: IncludedItemsProps) => {
    const { BuilderSlides_IncludedItems: text } = useLanguageContext().appText;

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
            <S.Title>{text.title}</S.Title>
            <S.Subtitle>{text.subtitle}</S.Subtitle>
            <Tip>{text.tip}</Tip>
            <TextField
            label={text.fieldLabel}
            placeholder={text.placeholder}
            value={newItem}
            onChange={handleNewItemChange}
            sx={{ width: { xs: 'calc(100% - 48px)', md: 340 } }} />
            <S.AddIcon onClick={handleAddItem} />
            <S.ErrorMsg>{showErrMsg && text.alreadyIncluded}</S.ErrorMsg>
            <S.ChipList>
                {props.items.map(item => 
                    <Chip 
                    key={uuid()} 
                    label={item} 
                    onDelete={() => handleDeleteItem(item)}
                    sx={{ margin: '0 10px 10px 0' }} />
                )}
            </S.ChipList>
        </div>
    );
}

export default IncludedItems;