import { useState } from 'react';
import styled from 'styled-components';

const SyledContainer=styled.div`
    margin-bottom: 5px;
`;

const StyledTitle=styled.span`
    display:block;
    font-size:1.2rem;
    font-weight: 600;
    color: #bbb;

    >span{
        float: right;
    }
`;

const StyledSheetContent=styled.div`
    height: 0;
    overflow: hidden;
    transition: all .5s ease-in-out;
    transform-origin: left top;

    &.opened{
        height: auto;
    }
`

const StyledLabel=styled.span`
    display: inline-block;
    font-size: 1rem;
    width: 95px;
    vertical-align: top;

    &.changed{
        color:darkred;
    }
`;

const StyledDescription=styled.textarea`
    height: 50px;
`;

const StyledSelect=styled.select`
    width: 482px;
`;

const RuleContainer=styled.div`
    margin-bottom: 5px;
    font-size: .9rem;
    width: 500px;

    >div{
        margin-bottom: 2px;
        
        >span{
            margin-right: 5px;
            vertical-align: top;
            width: 80px;
            display: inline-block;
        }

        >textarea{
            width: 400px;
            margin-left:0;
        }

        >input[type=text]{
            width: 400px;
        }
        
    }
`;

const ItenContainer=styled.div`
    background-color: #2b2b2b;
    margin: 0 0 2px 10px;
    padding:3px;
    
    >div{
        display: inline-block;

        &.removeItem{
            width: 80px;
            text-align: center;
            vertical-align: top;
        }
    }
`
const AddItemButton=styled.button`
    background: #4b4b4b;
    color: #ccc;
    outline: none;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-weight:600;
    transition: all .3s;

    &:hover{
        color:#fff;
    }
`;

export const SaveButton=styled.button`
    float: right;
    background: #000;
    color: #ccc;
    outline: none;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-weight:600;
    transition: all .3s;

    &:hover{
        color:#fff;
    }
`

export const StyledLink=styled.a`
    cursor: pointer;
    >span{
        &::before {
            border-style: solid;
            border-width: 0.25em 0.25em 0 0;
            content: '';
            display: inline-block;
            height: 0.45em;
            position: relative;
            top: 0.15em;
            vertical-align: top;
            width: 0.45em;
            left: 0;
            transform: rotate(45deg);
            margin-right: 5px;
            transition: all .3s;
        }
    }
    &.opened{
        >span{
            &::before {
                top: 0;
	            transform: rotate(135deg);            
            }
        }
    }

`;

export const Title = ({title, idx}) => {
    return (
        <StyledTitle>
            {title}
            <span>Idx: {idx}</span>
        </StyledTitle>
    )
}

export const SheetContent = ({opened, children}) => {
    return <StyledSheetContent className={opened ? 'opened' : ''} >{children}</StyledSheetContent>
}


export const Id = ({value, changed, changeHandler}) => {
    const onlyPattern = (e) =>{
        let regex=new RegExp(/^(\w|\d|_)+$/gi); //apenas letras, númeres e underscore
        let str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)){
            return true;
        }
        e.preventDefault();
        return false;
    }

    return (
        <SyledContainer>
            <StyledLabel className={changed ? 'changed' : ''}>ID {changed && '*'}</StyledLabel>
            <input 
                type={"text"} 
                className={"inputBasic"} 
                value={value} 
                style={{textTransform: 'lowercase'}}
                onChange={(ev)=>changeHandler(ev.target.value)}
                onKeyPress={(ev)=>onlyPattern(ev)} 
            />
        </SyledContainer>
    );
}

export const Description = ({value, changed, changeHandler}) => {

    return (
        <SyledContainer>
            <StyledLabel className={changed ? 'changed' : ''}>Description {changed && '*'}</StyledLabel>
            <StyledDescription
                className={"inputBasic"} 
                value={value} 
                onChange={(ev)=>changeHandler(ev.target.value)}
            />
        </SyledContainer>
    );
}


export const SimpleInput = ({label, value, changed, changeHandler}) => {
    return (
        <SyledContainer>
            <StyledLabel className={changed ? 'changed' : ''}>{label} {changed && '*'}</StyledLabel>
            <input 
                type={"text"} 
                className={"inputBasic"} 
                value={value} 
                onChange={(ev)=>changeHandler(ev.target.value)}
            />
        </SyledContainer>
    );
}

export const SimpleSelect = ({label, options, value, changed, changeHandler}) => {
    return (
        <SyledContainer>
            <StyledLabel className={changed ? 'changed' : ''}>{label} {changed && '*'}</StyledLabel>
            <StyledSelect 
                className={"inputBasic"} 
                value={value} 
                placeholder={"Selecione..."}
                onChange={(ev)=>changeHandler(ev.target.value)}
            >
                {options.map((o)=><option key={o.id} value={o.id}>{o.name}</option>)}

            </StyledSelect>
        </SyledContainer>
    );
}

export const Tags = ({value, changed, changeHandler}) => {
    const onlyPattern = (e) => {
        let regex=new RegExp(/^(\w| |,|\d|_)+$/gi); //apenas letras, números, underscore, vírgula e espaço
        let str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)){
            return true;
        }
        e.preventDefault();
        return false;
    }

    const arrToStr = (v) => {
       return v.join(", "); 
    }

    const strToArr = (v) => {
        let r=[];
        v.split(",").forEach((item)=>{
            let i = item.trim();
            if (i!==""){
                r.push(i);
            }
        });
        return r;
    }

    return (
        <SyledContainer>
            <StyledLabel className={changed ? 'changed' : ''}>Tags {changed && '*'}</StyledLabel>
            <input 
                type={"text"} 
                className={"inputBasic"} 
                value={arrToStr(value)} 
                style={{textTransform: 'lowercase'}}
                onChange={(ev)=>changeHandler(strToArr(ev.target.value))}
                onKeyPress={(ev)=>onlyPattern(ev)} 
            />
        </SyledContainer>
    );
}

export const Rule = ({description, rule, changeHandler, rank}) => {
    const [cDesc, setCDesc] = useState(description);
    const [cRule, setCRule] = useState(rule);
    const [cRank, setCRank] = useState(rank||undefined);

    const doChange = () => {
        let objData={
            description: cDesc,
            rule: cRule
        };

        if (rank)
            objData.rank=cRank;

        changeHandler(objData);
    }

    const handler = (key, value) => {
        switch(key){
            case "description":
                setCDesc(value);
                break;
            case "rule":
                setCRule(value);
                break;
            case "rank":
                setCRank(value);
                break;
            default:
                console.log("Key not found");
        };

        doChange();
    }
    
    return (
        <RuleContainer>
            {rank && (
                <div>
                    <span>Rank</span>
                    <input 
                        className="rank"
                        type={"number"} 
                        value={rank} 
                        onChange={(ev)=>handler("rank", ev.target.value)}
                    />
                </div>
            )}
            <div>
                <span>Description</span>
                <StyledDescription
                    className={"inputBasic"} 
                    value={description} 
                    onChange={(ev)=>handler("description", ev.target.value)}
                />
            </div>
            <div>
                <span>Rule</span>
                <input 
                    className={"inputBasic"} 
                    type={"text"}
                    style={{marginLeft: '3px'}}
                    value={rule} 
                    onChange={(ev)=>handler("rule", ev.target.value)}
                />
            </div> 
        </RuleContainer>
    );
}

export const Mastery = ({label, value, changed, changeHandler}) =>{
    const DEFAULT_ITEM = {
        description:"",
        rule:"",
        rank: "1"
    }
    let labelStr=label || "Rules";

    const removeItem = (idx) =>{
        value.splice(idx, 1 );
        changeHandler(value);
    }

    const addItem = () => {
        const v=value;
        v.push(DEFAULT_ITEM);
        changeHandler(v);
    }

    const content=value.map((v, i)=>{
        return (
            <ItenContainer key={`rule${i}`}>
                <Rule 
                    description={v.description} 
                    rule={v.rule} 
                    rank={v.rank} 
                    changeHandler={changeHandler} 
                />
                <div className={"removeItem"}>
                    <button title="Remove" onClick={()=>removeItem(i)}>&#10006;</button>
                </div>
            </ItenContainer>
        )
    }) || '';

    return (
        <SyledContainer>
            <StyledLabel className={changed ? 'changed' : ''}>{labelStr} {changed && '*'}</StyledLabel>
            {content}
            <AddItemButton title="Add" onClick={()=>addItem()}>+ Add Mastery</AddItemButton>
        </SyledContainer>
    )
    
}