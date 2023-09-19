
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "../App.css";
import { Loads } from "./Loads";
import { Alphabet } from "./Alphabet";
import { Alphabetneo } from "./Alphabetneo";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    backgroundColor: "#90B2D8",
   
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: 1,
    border: "1px solid grey",
   
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    height: 1,
  },

  "&:last-child td, &:last-child th": {
    height: 1,
  },
}));
export default function NeoplasmTable({ setResults1, setSelectedCode }) {
  const [neo, setNeo] = useState(null);
  const [neo1, setNeo1] = useState(null);
  const [clickedCode, setClickedCode] = useState(null);
  const [result1, setResult1] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);
  const Code = (global.values?.code || '').replace(/[-.]/g, '');
  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (global.values && global.values.code) {
          const response = await fetch(`/codes/${Code}/neoplasm`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${global.tokens}` // Replace with your actual token
            },
          });
          if (response.ok) {
            const data = await response.json();
            setNeo(data);
          } else {
            console.error("Failed to fetch data");
          }
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    setNeo(null);
    fetchBooks();
  }, [global.values?.code]);
  console.log("our neo is", neo);

  const [word, setWord] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  function handleChange(e) {
    setWord(e.target.value);
  }
  function getTitleFromNestedChild(row) {
    if (row.child?.child?.child?.child?.code) {
      return `${row.child.title}-${row.child.child.title}-${row.child.child.child.title}-${row.child.child.child.child.title}`;
    } else if (row.child?.child?.child?.code) {
      return `${row.child.title} - ${row.child.child.title} - ${row.child.child.child.title}`;
    } else if (row.child?.child?.code) {
      return `${row.child.title} - ${row.child.child.title}`;
    } else if (row.child?.code) {
      return `${row.child.title}`;
    } else {
      return row.title;
    }
  }
 
  const handleCodeClick = async (code) => {
    setClickedCode(code);
    console.log(clickedCode);
   const Code1 = (clickedCode|| '').replace(/[-.]/g, '');

    // Fetch code details and update the state immediately
    try {
      if (code) {
        const response = await fetch(`/codes/${code}/details/?version=${global.years}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${global.tokens}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFetchedData(data);
          setResult1(data);
          // Update other global variables as needed
          setSelectedCode(Code1);
          global.selectedCodeDetails = data;
          global.selectedSectionDetails = data;
          global.selectedChapterDetails = data;
          global.intable = null;
          global.selectedCode = Code1;
          global.isCodeClicked = true;
          //onCodeClick(Code1);
         
          
        } else {
          console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
          <Box
        sx={{
          height: "20px",
          width: "100%",
          textAlign: "left",
          ml: "17%",
          display: "flex",
        }}
      >
        {!global.values || !global.values.code ? (
          <Alphabetneo
            setSelectedCode={setSelectedCode}
           // selectedCodeDetails={results2}
          />
        ) : null}
      </Box>
      {global.values && global.values.code && (
      <TableContainer
        sx={{
          position: "absolute",
          height: "66vh",
          width: "50vw",
        

          mt: "30px",
        }}
      >
        <Table
          sx={{
            ml: "1%",
            width: "50vw",
            mt: "-8px",
          }}
        >
          <TableHead>
            <TableRow>
              <Box
                sx={{
                  width: "100px",
                  height: "20%",
                  marginTop: "5%",
                }}
              >
                
             <Box sx={{ width: "120px", height: "22%" }}>
                
                  <TextField
                    sx={{
                      width: "130px",
                      "& input": {
                        height: "10px",
                        bgcolor: "background.paper",

                        color: (theme) =>
                          theme.palette.getContrastText(
                            theme.palette.background.paper
                          ),
                      },
                    }}
                    placeholder="Use Filter"
                    onChange={(e) => setSearch(e.target.value)}
                  />
          
                </Box> 
            
              </Box>
            </TableRow>
          </TableHead>
          <TableHead sx={{ height: "20px", border: "1px solid grey" }}>
            <TableRow
              sx={{
                border: "1px solid grey",
                height: "20px",
                alignItems: "center",
              }}
            >
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                N-term
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Primary Malignant
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Secondary Malignant
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Ca in situ
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Benign
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Uncertain Behavior
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                }}
                align="center"
              >
                Unspecified Behavior
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {global.values?.code !== null &&
              neo
                ?.filter((item) => {
                  return (
                    search.toLowerCase() === "" ||
                    item.title.toLowerCase().includes(search)
                  );
                })
                .map((row) => {
                  const hasValidParentCode = row.code && row.code[0] !== "null";
                  const hasValidChildCode =
                    row.child && row.child.code && row.child.code[0] !== "null";
                  const hasValidChildChildCode =
                    row.child &&
                    row.child.child &&
                    row.child.child.code &&
                    row.child.child.code[0] !== "null";
                  const hasValidChildChildChildCode =
                    row.child &&
                    row.child.child &&
                    row.child.child.child &&
                    row.child.child.child.code &&
                    row.child.child.child.code[0] !== "null";
                  const hasValidChildChildChildChildCode =
                    row.child &&
                    row.child.child &&
                    row.child.child.child &&
                    row.child.child.child.child &&
                    row.child.child.child.child.code &&
                    row.child.child.child.child.code[0] !== "null";

                  if (
                    !(
                      hasValidParentCode ||
                      hasValidChildCode ||
                      hasValidChildChildCode ||
                      hasValidChildChildChildCode ||
                      hasValidChildChildChildChildCode
                    )
                  ) {
                    return null;
                  }

                  const codeDetails = (
                    hasValidChildChildChildChildCode
                      ? row.child.child.child.child.code
                      : hasValidChildChildChildCode
                      ? row.child.child.child.code
                      : hasValidChildChildCode
                      ? row.child.child.code
                      : hasValidChildCode
                      ? row.child.code
                      : row.code
                  ).join(", ");

                  const chunkedCodeDetails = codeDetails
                    .split(", ")
                    .reduce((acc, code) => {
                      if (!acc.length || acc[acc.length - 1].length === 6) {
                        acc.push([code]);
                      } else {
                        acc[acc.length - 1].push(code);
                      }
                      return acc;
                    }, []);
                  return chunkedCodeDetails.map((chunk, index) => (
                    <StyledTableRow key={`${row.id}_${index}`}>
                      <StyledTableCell component="th" scope="row">
                        {getTitleFromNestedChild(row)}
                      </StyledTableCell>
                      {Array.from({ length: 6 }).map((_, colIndex) => (
                        <StyledTableCell
                          key={`${row.id}_${index}_${colIndex}`}
                          sx={{
                            border: "1px solid grey",
                          }}
                          align="center"
                        >
                          <a
                            style={{
                              borderBottom: "0.5px solid blue",
                            }}
                            onClick={() => handleCodeClick(chunk[colIndex])}
                          >
                            {chunk[colIndex] || "-"}
                          </a>
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ));
                })}
            {!global.values?.code &&
              neo1
                ?.filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.title.toLowerCase().includes(search);
                })
                .map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.title}
                    </StyledTableCell>
                    {row.code.map((value, index) => (
                      <StyledTableCell
                        key={index}
                        sx={{
                          border: "1px solid grey",
                        }}
                        align="center"
                      >
                        {value !== "-" ? (
                          <a
                            style={{
                              borderBottom: "0.5px solid blue",
                            }}
                            onClick={() => handleCodeClick(value)}
                          >
                            {value}
                          </a>
                        ) : (
                          "-"
                        )}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
          </TableBody>
         {/* {isLoading && <Loads />} */}
          {global.values?.code !== null && neo && neo.length === 0 && (
            <Typography
              marginLeft={30}
              variant="caption"
              color={"#4185D2"}
              fontWeight={800}
            >
              <h3>No Neoplasm codes found for the given search criteria.</h3>
            </Typography>
          )}
          {/* {!global.values?.code && neo1 && neo1.length === 0 && (
            <Typography fontWeight={800} variant="caption" color={"#4185D2"}>
              No Neoplasm codes available in the data.
            </Typography>
          )} */}
        </Table>
      </TableContainer>
      )}
    </>
  );
}