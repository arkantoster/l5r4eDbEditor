import { useState } from 'react';
import styled from 'styled-components';
import {Title, SheetContent, Id, SimpleInput, SimpleSelect, Description, Tags, Mastery, StyledLink, SaveButton} from './Fields'

const Sheet=styled.div`
    padding: 10px;
    background-color: #6b6b6b;
    display: block;
    width: 600px;
    margin: 5px 10px;
    color:#f1f1f1;
`;



export const Skill = ({data, idx, basicData, handleSave}) => {
    const [currentData, setCurrentData] = useState(data);
    const [open, setOpen] = useState(false);

    return (
    <Sheet>
        <StyledLink className={open ? 'opened' : ''} onClick={()=>setOpen(!open)}><Title idx={idx} title={currentData.name}  /></StyledLink>
        <SheetContent opened={open}>
            <Id 
                value={currentData.id}
                changed={currentData.id!==data.id} 
                changeHandler={(value)=>setCurrentData({...currentData, id: value })} 
            />
            
            <SimpleInput
                label={"Name"} 
                value={currentData.name}
                changed={currentData.name!==data.name} 
                changeHandler={(value)=>setCurrentData({...currentData, name: value })} 
            />
            
            <SimpleSelect
                label={"Trait"}
                options={basicData.traits}
                value={currentData.trait}
                changed={currentData.trait!==data.trait}
                changeHandler={(value)=>setCurrentData({...currentData, trait: value })}
            />

            <Tags 
                value={currentData.tags}
                changed={currentData.tags!==data.tags} 
                changeHandler={(value)=>setCurrentData({...currentData, tags: value })} 
            />
            
            <Mastery
                label={"Mastery"}
                value={currentData.masterAbilities}
                changed={currentData.masterAbilities!==data.masterAbilities}
                changeHandler={(value)=> {
                    setCurrentData({...currentData, masterAbilities: value });
                }}
            />

            <Description 
                value={currentData.description}
                changed={currentData.description!==data.description} 
                changeHandler={(value)=>setCurrentData({...currentData, description: value })} 
            />

            <SimpleSelect
                label={"Origin"}
                options={basicData.origin}
                value={currentData.origin}
                changed={currentData.origin!==data.origin}
                changeHandler={(value)=>setCurrentData({...currentData, origin: value })}
            />

            <SaveButton onClick={()=>handleSave(currentData)}>Save Changes</SaveButton>
        </SheetContent>
    </Sheet>
    );


}