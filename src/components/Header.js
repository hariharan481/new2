import React, { useState } from "react";
import "../styles/Header.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Year } from "./Year";
import Search1 from "./Search1";

export const Header = () => {
 
  const [first, setfirst] = useState(null)

  
  React.useEffect(() => {
    const fetchCodeDetails = async () => {
      try {
        let result1 = await fetch(`/codes/${global.usermail}/userdetail`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${global.tokens}`,
          },
        });
  
        if (result1.status === 200) {
          result1 = await result1.json();
          setfirst(result1.username);
          localStorage.setItem("name", result1.username); // Set the value in localStorage
        } else {
          console.error(`Error: ${result1.status}`);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    fetchCodeDetails();
  }, [global.usermail]);

console.log(global.usermail)
console.log(first);
localStorage.setItem("name",first)
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          elevation={0}
          className="navbar"
          position="static"
          sx={{
            height: "80px",
          }}
        >
          <Toolbar variant="dense">
            <img
              className="logo"
              src="https://static.wixstatic.com/media/7607b5_dbdbad3954b74cd0b66694c3302204e0~mv2.png/v1/fill/w_275,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/EMEDLOGIX_Final-01.png"
            ></img>
           
          </Toolbar>
        
        </AppBar>
      </Box>
      <Year />

      <Search1 />
    </>
  );
};