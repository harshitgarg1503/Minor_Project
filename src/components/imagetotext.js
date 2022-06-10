import { useContext, useRef, useState } from "react";
import Image from "./image";
import classes from "./imagetotext.module.css";
import Canvas from "./canvas";
import AuthContext from "../store/auth-context";
import Button from "./UI/Button";
import { recognize } from "tesseract.js";
import { AnimatePresence, motion } from "framer-motion";

const Imagetotext = (props) => {
  const [canvas, setCanvas] = useState(false);
  const [dataUrl, setDataUrl] = useState(null);

  const [submit, setSubmit] = useState(false);

  const DataUrlHandler = (dataUrl) => {
    setDataUrl(dataUrl);
  };
  const SubmitHandler = () => {
    setSubmit((prevState) => !prevState);
  };


  const ctx = useContext(AuthContext);
 
 const statusHandler=(e)=>{
 setstatus((e.progress.toFixed(2))*100);
 }
  const [status, setstatus] = useState(0)
 
  
  return (
    
    <motion.div 
    initial={{ x: window.innerWidth}}
    animate={{ x: 0 }}
    exit={{x:window.innerWidth,transition:{duration:0.1}}}
    
    
    className={classes.imagetoText}>
      <div className={classes.status}>
        <p>Status</p>
        <p className={classes.statustext}>{status===1?"completed":status}%</p>
      </div>
      <Image
        dataUrl={dataUrl}
        submit={submit}
        texte={ctx.textHandler}
        submitset={SubmitHandler}
        status={statusHandler}
      />
      <Canvas preprocess={canvas} dataUrl={DataUrlHandler} submit={submit} />
      <div className={classes.getText}>
        <Button button={{ onClick: SubmitHandler, disabled: !ctx.image }}>
          Get text
        </Button>
      </div>
      <div className={classes.textDiv}>
      <p className={classes.extractedText}>{ctx.text?ctx.text:"Sample Text here"}</p>
      <button onClick={ctx.textlistHandler}>save</button>

      </div>
     
    </motion.div>
    
  );
};

export default Imagetotext;
