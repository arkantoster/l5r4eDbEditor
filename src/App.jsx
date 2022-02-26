import './App.css';
import styled from 'styled-components';
import {jsonHandler} from './api/fileManager';

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

function App() {

  const handleClick = async () => {
    console.log("starting...");
    const fData=await jsonHandler.loadData();
    console.log("done...");
    console.log(fData);
  }

  return (
    <div className="App">
      <MainHeader>
        <Title>L5R Database Editor</Title>
        <Subtitle>For Foundry VTT&reg;</Subtitle>
      </MainHeader>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
