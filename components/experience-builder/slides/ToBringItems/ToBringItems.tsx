import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import type { ToBringItemsProps } from './index';

import Chip from '@mui/material/Chip';
import Checkbox from 'components/Checkbox';
import Tip from 'components/Tip';
import TextField from 'components/TextField';
import * as S from './ToBringItems.styled';

const ToBringItems = (props: ToBringItemsProps) => {
    const { BuilderSlides_ToBringItems: text } = useLanguageContext().appText;

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
            <S.Title>{text.title}</S.Title>
            <S.Subtitle>{text.subtitle1}</S.Subtitle>
            <S.Checkboxes>
                <S.CheckboxField>
                    <Checkbox
                    checked={shouldBring}
                    onChange={(_, checked) => {
                        if (checked) {
                            setShouldBring(true);
                        }
                    }} />
                    <label>{text.yes}</label>
                </S.CheckboxField>
                <S.CheckboxField>
                    <Checkbox
                    checked={!shouldBring}
                    onChange={(_, checked) => {
                        if (checked) {
                            setShouldBring(false);
                        }
                    }} />
                    <label>{text.no}</label>
                </S.CheckboxField>
            </S.Checkboxes>
            {shouldBring &&
                <div onKeyDown={handleEnter}>
                    <S.Subtitle>{text.subtitle2}</S.Subtitle>
                    <Tip>{text.tip}</Tip>
                    <TextField
                    label={text.fieldLabel}
                    placeholder={text.placeholder}
                    value={newItem}
                    onChange={handleNewItemChange}
                    sx={{ width: { xs: 'calc(100% - 48px)', md: 340 } }} />
                    <S.AddIcon onClick={handleAddItem} />
                    <S.ErrorMessage>{showErrMsg && text.alreadyIncluded}</S.ErrorMessage>
                    <S.ChipList>
                        {props.items.map(item => 
                            <Chip 
                            key={uuid()} 
                            label={item} 
                            onDelete={() => handleDeleteItem(item)}
                            sx={{ m: '0 10px 10px 0' }} />
                        )}
                    </S.ChipList>
                </div>}
        </>
    );
}

export default ToBringItems;