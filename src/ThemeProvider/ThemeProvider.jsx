import { useState } from "react";
import { ThemeContext } from "../ThemeContext/DarkLight";


const ThemeProvider = ({ children }) => {

    const [mode,setMode]=useState('light')

    const textClass=mode==="light"?"text-gray-700":"text-white"

    const handleToggleMode=()=>{
        if (mode==="light"){
            setMode("dark")
        }else{
            setMode("light")
        }
    }

    const themeMechanism={
        mode,
        handleToggleMode,
        textClass
    }


    return <ThemeContext value={themeMechanism}>{children}</ThemeContext>
};

export default ThemeProvider;