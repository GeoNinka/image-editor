import Header from  "./components/Header";
import Toolbar from "./components/Toolbar"
import WorkSpace from "./components/WorkSpace";
import { useState } from "react";
import { useRef } from "react";

function App() {

  const [tool, setTool] = useState('hand')
  const [form, setForm] = useState('none')

  const handleChange = (tool) => {
    setTool(tool)
  }

  const handleFormChange = (form) => {
    setForm(form)
  }

  const childRef = useRef(null);

  const saveFileHandler = () => {
    if (childRef.current) {
      childRef.current.saveFile();
    }
    console.log(childRef)
  }

  return (
    <div className="App">
      <Header handleFormChange={handleFormChange} saveFileHandler={saveFileHandler}/>
      <div className="workspace__wrapper">
        <Toolbar onChange={handleChange}/>
        <WorkSpace tool={tool} form={form} ref={childRef} handleFormChange={handleFormChange}/>  
      </div>
    </div>
  );
}

export default App;
