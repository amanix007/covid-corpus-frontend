import React from 'react';
import { Box, Typography, IconButton, TextField } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import Autosuggest from 'react-autosuggest';
import { Autocomplete } from "@material-ui/lab";

/*
    list object has to contain id and name
*/
const ListSingle = ({ list, setList }) => {
    const removeFromList = (id) => {
        setList(list.filter(item => item.id !== id));
    }

    return (
        <React.Fragment>
            {list && (
                <React.Fragment>
                    <div className="dk-list mt-1">
                        {list && list.map((p, index) => <React.Fragment>
                            <Box display="flex" className="dk-list-item mb-1" key={p.id}>
                                <Box flexGrow={1}>
                                    {p.categoryName && (<div className="dk-list-item-title mb-2">{p.categoryName}</div>)}
                                    {p.name}
                                </Box>
                                <Box>
                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={(e) => {
                                            e.preventDefault(); removeFromList(p.id);
                                        }}>
                                        <i className="fa fa-times "></i>
                                    </button>
                                </Box>
                            </Box>
                        </React.Fragment>
                        )}
                    </div>
                </React.Fragment>
            )
            }

        </React.Fragment >
    );
};

export default ListSingle;