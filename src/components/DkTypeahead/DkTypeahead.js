import React from 'react';
import { Box, Typography, IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ValidationError from 'components/ValidationError';
import { Autocomplete } from "@material-ui/lab";
import ListSingle from "../ListSingle";
import { Typeahead, AsyncTypeahead, TypeaheadInputSingle } from "react-bootstrap-typeahead";

/*
    list object has to contain id and name
*/
const DkTypeahead = ({ title, name, allowNew, setFieldValue, max, list, required, errors, touched }) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState(null);
    
    return (
        <React.Fragment>
            <div className="fieldTitle">{title} {required && <span className="required"> *</span>} (max {max}) </div>
            <Box display="flex" flexGrow={1}>
                <Typeahead
                    id={title}
                    allowNew={allowNew}
                    multiple={false}                
                    disabled={list && list.length >= max }
                    onChange={(e) => {
                      console.log('e', e);
                      if (e && e.length === 1) {
                        setFieldValue(name, [...list, e[0]]);
                        // countryTypeaheadRef.current.clear();
                      }}
                    }
                    options={list}
                    labelKey="name"
                    // autoComplete="off"
                    placeholder={title}
                    selected={[]}
                />

                {errors && touched ? <ValidationError message={errors} /> : null}
            </Box>

            <ListSingle list={list} setList={(data) => setFieldValue(name, data)} />
        </React.Fragment>
    );
};

export default DkTypeahead;




    // const [researchTopicSuggest, setResearchTopicSuggest] = React.useState([]);
    // const [value, setValue] = React.useState('');
    // // const [suggestions, setSuggestions] = React.useState([]);
    // const [isLoading, setIsLoading] = React.useState(false);
    // 
    // const refNewValue = React.useRef(null);
    // 
    // const [rts, setRts] = React.useState([{ id: 1, value: 'dsadasdasd' }, { id: 2, value: 'Dana sje ljiep dan' }]);
    // const [inputProps, setInputProps] = React.useState({
    //     placeholder: "Type 'c'",
    //     value: ''
    // });

    // const updateOptions = (e) => {
    //     setLoading(true);
    //     (async () => {
    //         await sleep(500); // For demo purposes.
    //         if (e) setResearchTopicSuggest([e]);
    //         else setResearchTopicSuggest([]);
    //         setLoading(false);
    //     })();
    // };

    // function sleep(delay = 0) {
    //     return new Promise((resolve) => {
    //         setTimeout(resolve, delay);
    //     });
    // }


    // React.useEffect(() => {
    //     console.log('rts', rts);
    // }, [rts]);

    // const updateRts = (id, newValue) => {
    //     if (!newValue) {
    //         removeRts(id);
    //         return;
    //     }

    //     const newState = rts.map(obj =>
    //         obj.id === id ? { ...obj, value: newValue } : obj
    //     );

    //     console.log('newState', newState);
    //     setRts(newState);
    // }

    // const addRts = (newValue) => {
    //     if (!newValue)
    //         return;

    //     const x = { id: 3, value: newValue };
    //     setRts(initArray => [...initArray, x]);
    // }

    // const removeRts = (id) => {
    //     setRts(rts.filter(item => item.id !== id));
    // }

    // const onChange = (event, { newValue }) => {
    //     console.log('a');
    //     setValue(newValue);
    // };

    // const renderInputComponent = (inputProps) => {
    //     const { className, ...other } = inputProps

    //     return (
    //         <input
    //             className="form-control mr-sm-2"
    //             type="search"
    //             placeholder="Search..."
    //         />)
    // }

    // const onSuggestionsFetchRequested = ({ value }) => {
    //     console.log('b');
    //     updateOptions(value);
    // }

    // const getSuggestionValue = (suggestion) => {
    //     console.log('c');
    //     return suggestion;
    // }

    // const renderSuggestion = (suggestion) => {
    //     console.log('d');
    //     return (
    //         <span>{suggestion}</span>
    //     );
    // }

    {/* {rts.map((p) => {
                return (
                    <Box key={p.id} mb={1}>
                        <Autocomplete
                            size="small"
                            freeSolo
                            options={researchTopicSuggest}
                            onInputChange={(e, newValue) => {
                                updateOptions(newValue);
                            }}
                            onChange={(e, newValue) => {
                                updateRts(p.id, newValue);
                            }}
                            value={p.value}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onBlur={(e) => updateRts(p.id, e.target.value)}
                                    placeholder="Research Topics"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Box>
                );
            })} */}

            {/* <Box display="flex" flexGrow={1}>
                <Autosuggest
                    suggestions={researchTopicSuggest}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={() => console.log('B')}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    renderInputComponent={renderInputComponent}
                    onChange={onChange}
                    inputProps={inputProps}
                />
                <IconButton
                    // disabled={primaryList.length >= 3 ? true : false}
                    aria-label="add"
                    size="small"
                    color="primary"
                    onClick={(e) => {
                        e.preventDefault();
                        // setIsPrimaryOpen(true);
                    }}
                >
                    <AddIcon />
                </IconButton>
            </Box> */}