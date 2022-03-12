import './App.css';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import {Skill} from './components/Skill';

const MainHeader = styled.div`
  width: 100%;
  height: 300px;
  background-image: url("seven_thunders.jpg");
  padding: 10px;
`;

const Title = styled.span`
  color: white;
  font-size: 4rem;
  text-align: left;
  font-family: "OrientalBrush";
  display: inline-block;
`;

const Subtitle = styled.span`
  color: #c1c1c1;
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: 10px;
  vertical-align: sub;
`;

const ChooseWrapper = styled.div`
  margin-top: 110px;
`

const ChooseButton = styled.button`
  background-color: #2b2b2b;
  padding: 20px 10px;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 215, 0, .60);
  cursor: pointer;
  transition: all 0.3s;
  margin: 10px;

  &:hover{
    color: gold;
    background-color: #1b1b1b;
  }

  &:disabled{
    cursor: auto;
    color:rgba(255, 215, 0, .40);
    background-color: #3b3b3b;
  }
`

const ORIGINS=[
  {
      "id": "core",
      "name": "Core Rulebook"
  },
  {
      "id": "bov",
      "name": "Book of Void"
  },
  {
      "id": "emerald_empire",
      "name": "Emerald Empire"
  },
  {
      "id": "lbs",
      "name": "Legend of the Burning Sands"
  },
  {
      "id": "great_clans",
      "name": "The Great Clans"
  },
  {
      "id": "community",
      "name": "Community Content"
  },
  {
      "id": "strogholds",
      "name": "Strongholds of Empire"
  },
  {
      "id": "boa",
      "name": "Book of Air"
  },
  {
      "id": "boe",
      "name": "Book of Earth"
  },
  {
      "id": "bof",
      "name": "Book of Fire"
  },
  {
      "id": "bow",
      "name": "Book of Water"
  },
  {
      "id": "imperial_histories",
      "name": "Imperial Histories"
  }
];

function App() {
  const [db, setDb] = useState(undefined);
  const [chosen, setChosen] = useState(undefined);
  const [chosenValues, setChosenValues] = useState([]);
  const [basicData, setBasicData] = useState(undefined);

  
  const loadDb = useCallback(async ()=>{
    const file=await fetch("http://localhost:3010/loadFile", {method: "GET"});
    const dbObj = await file.json();
    setDb(dbObj);
    setBasicData({
      rings: dbObj.ring,
      traits: dbObj.trait,
      clans: dbObj.clan,
      origin: ORIGINS
    })
  }, []);

  useEffect(()=>{
    loadDb();
  }, [loadDb])


  const choose = (value) => {
    if (!db){
      alert("DB not found!");
      console.error("DB not found!");
    }

    const dbData=db[value];
    if (dbData){
      setChosenValues(dbData);
      setChosen(value);
    }else{
      alert("Error choosing data");
      console.log("Error choosing data", dbData);
    }
  }

  const handleSave = async (data, idx) => {
    if (window.confirm("Apply changes?")){
      let newDb=db;
      newDb[chosen][idx]=data;    
      
      await fetch("http://localhost:3010/saveFile", {
        method: "POST", 
        headers: { 'Access-Control-Allow-Origin': '*', "Content-Type": 'application/json'},
        body: JSON.stringify({data:data, idx:idx, chosen:chosen}),
      });
      loadDb();     
    }
  }
  

  
  return (
    <div className="App">
      <MainHeader>
        <Title>L5R Database Editor</Title>
        <Subtitle>For Foundry VTT&reg;</Subtitle>
        <ChooseWrapper>
          <ChooseButton onClick={()=>choose("school")} disabled={chosen==="school"} >Schools</ChooseButton>
          <ChooseButton onClick={()=>choose("skill")} disabled={chosen==="skill"} >Skills</ChooseButton>
          <ChooseButton onClick={()=>choose("advantage")} disabled={chosen==="advantage"} >Advantages</ChooseButton>
          <ChooseButton onClick={()=>choose("disavantages")} disabled={chosen==="disavantages"} >Disadvantages</ChooseButton>
        </ChooseWrapper>
      </MainHeader>
      
      {chosen && chosen==="skill" && chosenValues.length>0 && chosenValues.map((c, idx) => (
        <Skill key={idx} data={c} idx={idx} basicData={basicData} handleSave={(data)=>handleSave(data, idx)} />)
      )}

    </div>
  );
}

export default App;
