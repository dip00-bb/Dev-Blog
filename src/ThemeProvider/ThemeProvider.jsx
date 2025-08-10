import { useState } from "react";
import { ThemeContext } from "../ThemeContext/DarkLight";


const ThemeProvider = ({ children }) => {

    const [mode,setMode]=useState('light')

    const handleToggleMode=()=>{
        if (mode==="light"){
            setMode("dark")
        }else{
            setMode("light")
        }
    }

    const themeMechanism={
        mode,
        handleToggleMode
    }

    return <ThemeContext value={themeMechanism}>{children}</ThemeContext>
};

export default ThemeProvider;