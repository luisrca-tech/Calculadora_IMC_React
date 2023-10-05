import { data } from './data/data';

import { useState } from 'react';

import ImcCalc from './components/ImcCalc';

import ImcTable from './components/ImcTable';

import './App.css'

function App() {

  const calcImc = (e, height, weight) => {

    e.preventDefault();

    if (!weight || !height) return;

    const weightFloat = +weight.replace(",", ".");
    const heightFloat = +height.replace(",", ".");

    const imcResult = (weightFloat / (heightFloat * heightFloat)).toFixed(1);

    setImc(imcResult);

    data.forEach((item) => {
      if (imcResult >= item.min && imcResult <= item.max) {
        setInfo(item.info);
        setInfoClass(item.infoClass);
      }
    });

    if(!info) return;
  };

  const resetCalc = (e) => {
    e.preventDefault();

    setImc("");
    setInfo("");
    setInfoClass("");
  }

  const [imc, setImc] = useState("");
  const [info, setInfo] = useState("");
  const [infoClass, setInfoClass] = useState("");

  return (
    <div className='container'>
      {!imc ? (
        <ImcCalc calcImc={calcImc}></ImcCalc>
      ) : (
        <ImcTable data={data} imc={imc} info={info} infoClass={infoClass} resetCalc={resetCalc} ></ImcTable>
      )}
    </div>
  );
}

export default App;
