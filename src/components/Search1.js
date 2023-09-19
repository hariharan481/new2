import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Main } from "./Main";
import { BlindsClosed } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
 
const Search1 = () => {


  const [isNeoplasmCodeClicked, setIsNeoplasmCodeClicked] = useState(false);
  const [result, setResult] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [first, setFirst] = useState("");
  const [word, setWord] = useState("");
  const [isValueSelected, setIsValueSelected] = useState(false);
  const [isDescriptionFetched, setIsDescriptionFetched] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshMain, setRefreshMain] = useState(false);
  const [sortedResult, setSortedResult] = useState([]);

  global.tokens=localStorage.getItem("emed");
  console.log(global.tokens);

const handleNeoplasmCodeClick = () => {
    setIsNeoplasmCodeClicked(true);

    
  };
  const handleChange = (event) => {
    const newValue = event.target.value;
    setWord(newValue);
    if (newValue.length === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    setSelectedItem(null);
    setIsValueSelected(false);
    setRefreshMain(!refreshMain);
    global.isCodeClicked = false;
   
  };
  const handleClearInput = () => {
    setWord(""); 
    setSelectedItem(null); 
    setIsValueSelected(false);

    setIsValueSelected(null);

  };
  console.log(word);


  useEffect(() => {
   //const getdataAftertimeout = setTimeout(() => {
 
      global.inatbleresult = null;
  
      const fetchBooks = async () => {
        try {
          if (word) {
            const regex =
              /^[a-zA-Z]$|^[a-zA-Z]+\d+$|^[a-zA-Z]+\d+[a-zA-Z]+$|^[a-zA-Z]+\d+[a-zA-Z]+\d+$/;
            const combinedData = [];
  
            if (regex.test(word)) {
              const response = await fetch(`/codes/${word}/matches`, {
                method:'GET',
                headers: {
                  Authorization: `Bearer ${global.tokens} `
                },
              });
              setIsDescriptionFetched(false);
  
              if (response.ok) {
                const data = await response.json();
                combinedData.push(...data);
              }  else {
                console.error("Failed to fetch data from the first API");
              }
            } 
            else if (/^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/.test(word) || word.length > 3) 
           {
        
              const response = await fetch(
                `/codes/index/search/name?name=${word}&mainTermSearch=true`,
                {
                  method:'GET',
                  headers: {
                    Authorization: `Bearer ${global.tokens} `
                  },
                });
              setIsDescriptionFetched(true);
  
              if (response.ok) {
                const data = await response.json();
                combinedData.push(...data);
              } else {
                console.error("Failed to fetch data from the first API");
              }
  
              
              const alterResponse = await fetch(`/alter-terms/search?alterDescription=${word}`, {
                method:'GET',
                headers: {
                  Authorization: `Bearer ${global.tokens} `
                },
              });
              setIsDescriptionFetched(true);
              if (alterResponse.ok) {
                const alterData = await alterResponse.json();
                combinedData.push(...alterData);
             
                console.log("Second API response:", alterData);
              } else {
                console.error("Failed to fetch data from the second API");
              }
         const thirdResponse = await fetch(`/codes/${word}/description`,{
          method:'GET',
          headers: {
            Authorization: `Bearer ${global.tokens} `
          },
        });
              setIsDescriptionFetched(true);
              if (thirdResponse.ok) {
                const alterrData = await thirdResponse.json();
                combinedData.push(...alterrData);
            console.log("Second API response:", alterrData);
              } else {
                console.error("Failed to fetch data from the second API");
              }
            } else {
              console.error("Invalid input");
            }
            setResult(combinedData);
          } else {
            setResult([]);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchBooks();
  //  }, 600);
  //  return () => clearTimeout(getdataAftertimeout);
  }, [word]);
  console.log(result)

  console.log("our result is", result);
  console.log(first);
  global.values = first;
  global.words = word;


// if (setIsDescriptionFetched) {
  //   window.sortOptions = (options, typedValueLower) => {
  //     return options.sort((a, b) => {
  //       const aTitle = a.title ?? "";
  //       const bTitle = b.title ?? "";
  //       const aLower = aTitle.toLowerCase();
  //       const bLower = bTitle.toLowerCase();
  //       if (aLower.startsWith(typedValueLower)) return -1;
  //       if (bLower.startsWith(typedValueLower)) return 1;
  //       return aLower.localeCompare(bLower);
  //     });
  //   };
  // }



  // function sortOptions(options) {
  //   return options.sort((a, b) => {
  //     if (a.type === "ismainterm") {
  //       return -1; // 'a' comes before 'b'
  //     } else if (b.type === "ismainterm") {
  //       return 1; // 'b' comes before 'a'
  //     } else if (a.type === "code") {
  //       return -1; // 'a' comes before 'b'
  //     } else if (b.type === "code") {
  //       return 1; // 'b' comes before 'a'
  //     } else if (a.type === "see") {
  //       return -1; // 'a' comes before 'b'
  //     } else if (b.type === "see") {
  //       return 1; // 'b' comes before 'a'
  //     } else if (a.type === "seealso") {
  //       return -1; // 'a' comes before 'b'
  //     } else if (b.type === "seealso") {
  //       return 1; // 'b' comes before 'a'
  //     } else if (a.type === "alterTerm") {
  //       return -1; // 'a' comes before 'b'
  //     } else if (b.type === "alterTerm") {
  //       return 1; // 'b' comes before 'a'
  //     } else {
  //       return 0; // No change in order
  //     }
  //   });
  // }


  
if (setIsDescriptionFetched) {

  function sortOptions(options, userInput) {
    return options.sort((a, b) => {
      if (a.type === "ismainterm") {
        return -1; // 'a' comes before 'b'
      } else if (b.type === "ismainterm") {
        return 1; // 'b' comes before 'a'
      } else if (a.type === "code" && b.type !== "code") {
        return -1; // 'a' comes before 'b'
      } else if (b.type === "code" && a.type !== "code") {
        return 1; // 'b' comes before 'a'
      } else if (a.type === "code" && b.type === "code") {
       
        const aMatches = a.text && a.text.includes(userInput);
      const bMatches = b.text && b.text.includes(userInput);

        if (aMatches && !bMatches) {
          return -1; // 'a' comes before 'b'
        } else if (!aMatches && bMatches) {
          return 1; // 'b' comes before 'a'
        } else {
       
          return 0;
        }
      } else if (a.type === "see") {
        return -1; // 'a' comes before 'b'
      } else if (b.type === "see") {
        return 1; // 'b' comes before 'a'
      } else if (a.type === "seealso") {
        return -1; // 'a' comes before 'b'
      } else if (b.type === "seealso") {
        return 1; // 'b' comes before 'a'
      } else if (a.type === "alterTerm") {
        return -1; // 'a' comes before 'b'
      } else if (b.type === "alterTerm") {
        return 1; // 'b' comes before 'a'
      } else {
        return 0; // No change in order
      }
    });
  }
  window.sortOptions = sortOptions;
  }


 const matches = useMediaQuery("(max-width:768px)");

  return (
    <>
      {matches ? (
        <Box
          sx={{
            height: "80px",
            marginTop: "29px",
            ml: "98px",
          }}
        >
          <Box
            sx={{ margin: "auto", color: "black", mt: "20px" }}
            direction="column"
            gap={5}
          >
            <TextField
              sx={{
                "& input": {
                  height: "5px",
                  width: "50vw",
                },
              }}
              onChange={handleChange}
              placeholder="Search for code"
              value={
                selectedItem && isValueSelected
                  ? `${
                      selectedItem.code !== null && selectedItem.code !== "null" && selectedItem.code !== undefined
                        ? selectedItem.code
                        : ""
                    } ${
                      selectedItem.description !== null && selectedItem.description !== "null" && selectedItem.description
                        ? selectedItem.description
                        : ""
                    } ${
                      selectedItem.alterDescription !== null &&
                      selectedItem.alterDescription !== "null" && selectedItem.alterDescription
                        ? selectedItem.alterDescription
                        : ""
                    } ${
                      selectedItem.title !== null && selectedItem.title !== "null" && selectedItem.title !== undefined
                        ? selectedItem.title
                        : ""
                    } ${
                      selectedItem.see !== null && selectedItem.see !== "null" && selectedItem.see !== undefined
                        ? selectedItem.see
                        : ""
                    } ${
                      selectedItem.seealso !== null && selectedItem.seealso !== "null" && selectedItem.seealso !== undefined
                        ? selectedItem.seealso
                        : ""
                    }`
                  : word
              }
              onKeyDown={(event) => {
                if (event.key === "Backspace") {
                  setSelectedItem(null);
                  setIsValueSelected(false);
                }
              }}
              inputProps={{
                autoComplete: "off",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {word || selectedItem ? ( 
                      <CloseIcon
                        sx={{
                          fontSize: "20px",
                        }}
                        onClick={handleClearInput}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <SearchIcon />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <Autocomplete
              freeSolo
              disableClearable
              id="users"
              defaultValue={null}
              getOptionLabel={(item) =>
                `${item.title || ""}  ${
                  item.seealso || ""
                }    ${item.description || ""} ${
                  item.code || ""
                } ${item.nemod} ${item.alterDescription || ""}`
              }
           options={
                isDescriptionFetched
                
                   ? window.sortOptions([...result], word).slice(0, 20)
                 : [...result].slice(0, 20)
              }
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              isoptionequalToValue={(option, value) =>
                option.description === value.description
              }
              noOptionsText={"PLEASE ENTER VALID CODES"}
              open={open}
              onInputChange={(_, value) => {
                if (value.length === 0) {
                  if (open) setOpen(false);
                } else {
                  if (!open) setOpen(true);
                }
              }}
              onClose={() => {
                setOpen(false);
          
              }}
              style={{
                width:"66vw"
              }}
              onChange={(event, newValue) => {
                setSelectedItem(newValue);
                setWord(newValue ? newValue.title : "");
                setFirst(newValue);
                setIsValueSelected(true);
                setIsNeoplasmCodeClicked(true)
              }}
              autoSelect
              renderInput={(params) => (
                <TextField
                  disabled
                  sx={{
                    "& input": {
                      height: "0px",
                      display: "none",
                      mt: "-50px",
                      border: "none",
                    },
                  }}
                  {...params}
                  placeholder="Search for code"
                />
              )}
              renderOption={(props, result1) => (
                <Box {...props} key={result.id}>
                {isDescriptionFetched ? (
                  <span>{result1.title && (result1.code !== 'null' || result1.seealso !== 'null') ? result1.title + " " : ''}{" "}{result1.description !== 'null' ? result1.description : ''}{" "}{result1.alterDescription !== 'null' ? result1.alterDescription : ''}{" "}
                   {result1.seealso !== 'null' && result1.seealso !== undefined &&  !result1.seealso.includes("Drugs") && !result1.seealso.includes("Neoplasm")? `seealso:${result1.seealso}` : ''}
                 {result1.seealso !== 'null' && result1.seealso !== undefined &&  !result1.seealso.includes("Drugs") && result1.seealso.includes("Neoplasm")? <span style={{
               
                borderBottom: '1px solid blue',
                cursor: 'pointer', 
              }}>seealso:{result1.seealso}</span> : '' }
                   { result1.seealso !== 'null' && result1.seealso !== undefined  && result1.seealso.includes("Drugs") && !result1.seealso.includes("Neoplasm") ? <span style={{
            
                borderBottom: '1px solid blue',
                cursor: 'pointer', 
              }}>seealso:{result1.seealso}</span> : ''}{" "} 
                   {result1.see !== 'null' && result1.see !== undefined &&  !result1.see.includes("Drugs") && !result1.see.includes("Neoplasm")? `see:${result1.see}` : ''}
                  {result1.see !== 'null' && result1.see !== undefined &&  !result1.see.includes("Drugs") && result1.see.includes("Neoplasm")? <span style={{
             
                borderBottom: '1px solid blue',
                cursor: 'pointer', 
              }}>see:{result1.see}</span> : '' }
                   { result1.see !== 'null' && result1.see !== undefined  && result1.see.includes("Drugs") && !result1.see.includes("Neoplasm") ? <span style={{
           
                borderBottom: '1px solid blue',
                cursor: 'pointer', 
              }}>see:{result1.see}</span> : ''}{" "} 

                  {result1.nemod !== 'null' ? result1.nemod : ''}{" "}
                  {result1.code !== 'null' &&  result1.code !== null && (result1.description !== null || result1.title !== null || result1.alterDescription !== null || result1.description !== "null" || result1.alterDescription !== "null" || result1.title !== "null" )?(<span style={{ color: 'blue' }}>{result1.code}</span>) : ('')}</span>) : (
                  <span>{result1.description !== null ? (
                    <span style={{ color: 'blue' }}>{result1.code}</span>
                  ) : null}{" "}{result1.description}</span>
                )}
              </Box>
              )}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: "80px",
            marginTop: "29px",
            ml: "130px",
          }}
        >
          <Box
            sx={{ margin: "auto", color: "black", mt: "20px" }}
            direction="column"
            gap={5}
          >
            <TextField
              sx={{
                "& input": {
                  height: "5px",
                  width: "70vw",
                },
              }}
              onChange={handleChange}
              placeholder="Search for code"
              value={
                selectedItem && isValueSelected
                  ? `${
                      selectedItem.code !== null && selectedItem.code !== "null" && selectedItem.code !== undefined
                        ? selectedItem.code
                        : ""
                    } ${
                      selectedItem.description !== null && selectedItem.description !== "null" && selectedItem.description
                        ? selectedItem.description
                        : ""
                    } ${
                      selectedItem.alterDescription !== null &&
                      selectedItem.alterDescription !== "null" && selectedItem.alterDescription
                        ? selectedItem.alterDescription
                        : ""
                    } ${
                      selectedItem.title !== null && selectedItem.title !== "null" && selectedItem.title !== undefined
                        ? selectedItem.title
                        : ""
                    } ${
                      selectedItem.see !== null && selectedItem.see !== "null" && selectedItem.see !== undefined
                        ? selectedItem.see
                        : ""
                    } ${
                      selectedItem.seealso !== null && selectedItem.seealso !== "null" && selectedItem.seealso !== undefined
                        ? selectedItem.seealso
                        : ""
                    }`
                  : word
              }
              onKeyDown={(event) => {
                if (event.key === "Backspace") {
                  setSelectedItem(null);
                  setIsValueSelected(false);
                }
              }}
              inputProps={{
                autoComplete: "off",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {word || selectedItem ? ( 
                      <CloseIcon
                        sx={{
                          fontSize: "20px",
                        }}
                        onClick={handleClearInput}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <SearchIcon />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <Autocomplete
              disableClearable
              freeSolo
              id="users"
             
              defaultValue={null}
              getOptionLabel={(item) =>
                `${item.title || ""}   ${item.seealso || ""
                }   ${item.see || ""
              } ${item.description || ""} ${
                  item.code || ""
                } ${item.nemod}${item.alterDescription || ""}`
              }
               options={
                isDescriptionFetched
             
             ? window.sortOptions([...result], word).slice(0, 20)
              : [...result].slice(0, 20)
              }
            
              style={{
                width: "74vw",
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              isoptionequalToValue={(option, value) =>
                option.description === value.description ||
                option.see === value.see ||
                option.seealso === value.seealso
              }
              noOptionsText={"PLEASE ENTER VALID CODES"}
              open={open}
              onInputChange={(_, value) => {
                if (value.length === 0) {
                  if (open) setOpen(false);
                } else {
                  if (!open) setOpen(true);
                }
              }}
              onClose={() => {
                setOpen(false);
              
              }}
             
              onChange={(event, newValue) => {
                setSelectedItem(newValue);
                setWord(newValue ? newValue.title : "");
                setFirst(newValue);
                setIsValueSelected(true);
               
              }}
              autoSelect
              renderInput={(params) => (
                <TextField
               // disabled
                  sx={{
                    "& input": {
                      height: "0px",
                      display: "none",
                      mt: "-50px",
                      border: "none",
                    },
                  }}
                  {...params}
                  placeholder="Search for code"
                />
              )}
              
        
              renderOption={(props, result1) => (
                
                <Box {...props} key={result.id}  >
                {isDescriptionFetched ? (
                  <span  onClick={handleNeoplasmCodeClick} >{result1.title && (result1.code !== 'null' || result1.seealso !== 'null') ? result1.title + " " : ''}{" "}{result1.description !== 'null' ? result1.description : ''}{" "}{result1.alterDescription !== 'null' ? result1.alterDescription : ''}{" "}
                   {result1.seealso !== 'null' && result1.seealso !== undefined &&  !result1.seealso.includes("Drugs") && !result1.seealso.includes("Neoplasm")? `seealso:${result1.seealso}` : ''}
                 {result1.seealso !== 'null' && result1.seealso !== undefined &&  !result1.seealso.includes("Drugs") && result1.seealso.includes("Neoplasm")? <span onClick={handleNeoplasmCodeClick} style={{
               
                borderBottom: '1px solid blue',
                cursor: 'pointer', 
              }}>seealso:{result1.seealso}</span> : '' }
                   { result1.seealso !== 'null' && result1.seealso !== undefined  && result1.seealso.includes("Drugs") && !result1.seealso.includes("Neoplasm") ? <span onClick={handleNeoplasmCodeClick} style={{
            
                borderBottom: '1px solid blue',
                cursor: 'pointer', 
              }}>seealso:{result1.seealso}</span> : ''}{" "} 
                   {result1.see !== 'null' && result1.see !== undefined &&  !result1.see.includes("Drugs") && !result1.see.includes("Neoplasm")? `see:${result1.see}` : ''}
                  {result1.see !== 'null' && result1.see !== undefined &&  !result1.see.includes("Drugs") && result1.see.includes("Neoplasm")? <span onClick={handleNeoplasmCodeClick} style={{
             
                borderBottom: '1px solid blue',
                cursor: 'pointer', 
              }}>see:{result1.see}</span> : '' }
                   { result1.see !== 'null' && result1.see !== undefined  && result1.see.includes("Drugs") && !result1.see.includes("Neoplasm") ? <span  onClick={handleNeoplasmCodeClick} style={{
           
                borderBottom: '1px solid blue',
                cursor: 'pointer', 
              }}>see:{result1.see}</span> : ''}{" "} 

                  {result1.nemod !== 'null' ? result1.nemod : ''}{" "}
                  {result1.code !== 'null' &&  result1.code !== null && (result1.description !== null || result1.title !== null || result1.alterDescription !== null )?(<span  onClick={handleNeoplasmCodeClick} style={{ color: 'blue' }}>{result1.code}</span>) : ('')}</span>) : (
                  <span  onClick={handleNeoplasmCodeClick}>{result1.description !== null || result1.description !== 'null' ? (
                    <span  onClick={handleNeoplasmCodeClick} style={{ color: 'blue' }}>{result1.code}</span>
                  ) : null}{" "}{result1.description}</span>
                )}
              </Box>
               
              )}
            />
          </Box>
        </Box>
      )}
      {isNeoplasmCodeClicked  &&  <div>
        hari</div>}
      <Main  selectedItem={selectedItem}  isValueSelected={isValueSelected}
        refreshMain={refreshMain}
        isNeoplasmCodeClicked={isNeoplasmCodeClicked} />
    </>
  );
};
export default Search1;
