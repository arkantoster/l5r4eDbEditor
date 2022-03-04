import './App.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
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

function App() {
  const [db, setDb] = useState(undefined);
  const [chosen, setChosen] = useState(undefined);
  const [chosenValues, setChosenValues] = useState([]);

  useEffect(()=>{
    async function loadDb(){
      const file=await fetch("http://localhost:3010/loadFile", {method: "GET"});
      const dbObj = await file.json();
      setDb(dbObj);
      console.log(dbObj);
    }

    loadDb();
  }, [])


  const choose = (value) => {
    if (!db){
      alert("No DB found!");
      console.error("No DB found!");
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
    console.log("clicked");

    if (window.confirm("Apply changes?")){
      let newDb=db;
      newDb[chosen][idx]=data;    
      
      console.log("saving...");
      console.log({db:db, newDb:newDb, data:data});
      const file=await fetch("http://localhost:3010/saveFile", {
        method: "POST", 
        headers: { 'Access-Control-Allow-Origin': '*', "Content-Type": 'application/json'},
        body: JSON.stringify({data:data, idx:idx, chosen:chosen}),
      });
      console.log({file:file});
      setDb(newDb);
      
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
        <Skill key={idx} data={c} idx={idx} traits={db.trait} handleSave={(data)=>handleSave(data, idx)} />)
      )}

    </div>
  );
}

export default App;
