import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from '@material-ui/icons/Close';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #fff",
        borderRadius: "8px",
        width: '100%',
        background: 'white',
        height: '70px',
        boxShadow: '0px 0px 3px 2px #eee',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButtonSearch: {
        padding: "12px",
        backgroundColor: "#fff!important",
        borderRadius: "6px",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        color: "#959595!important",
        marginRight: "5px"
    },
    divider: {
        height: 28,
        margin: 4,
    }
}));

export default function Search(props) {
    const classes = useStyles();
    const [text, setText] = React.useState("");

    onchange = (e) => {
        if(e.target.id==='search'){
            setText(e.target.value);
        }
    };

    const handleClear = () => {
        setText("");
    };
    React.useEffect(() => {
        console.log(1,text)
    }, [text])

    return (
        <div className={classes.root}>
            <TextField
                id={"search"}
                className={[classes.input,classes.iconButtonSearch]}
                value={text}
                onKeyDown={(e) => {
                    if (e.which === 13) {
                        e.preventDefault();
                        props.searchField(text)
                    }
                }}
                placeholder="Enter Search Keywords here"
                onChange={onchange}
            />
            {text && text.length > 0 && (
                <IconButton
                    onClick={handleClear}
                    className={classes.iconButton}
                    aria-label="clear"
                >
                    <CloseIcon/>
                </IconButton>
            )}
            <IconButton
                onClick={()=>props.searchField(text)}
                className={classes.iconButtonSearch}
                color="primary"
                aria-label="search"
            >
                <SearchIcon/>
            </IconButton>

        </div>
    );
}
