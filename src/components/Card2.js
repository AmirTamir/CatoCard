import React, {useEffect, useState} from "react";

//styling
import "./CatoCard.css";

import { DataGrid } from '@material-ui/data-grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//data
import {fetchApps} from "../services/FetchApps";

import {makeStyles, withStyles} from "@material-ui/core/styles";


// Dropdown styling
const StyledSelect = withStyles({
    root: {
        width: 100,
        padding: '10px 26px 10px 12px',
        marginLeft: 10,
    }
})(Select);

// Card styling
const useStyles = makeStyles((theme) => ({
    root: {
        width: 620,
        height: 480,
        paddingLeft: 10,
    },
    margin: {
        margin: theme.spacing(2),
    },
}));



export default function CardCato(props) {

    const [rows, setRows] = useState([]);
    const [sanctionedRows, setSanctionedRows] = useState([]);
    const [sanctioned, setSanction] = useState("unsanctioned");
    const [rowsToPresent, setRowsToPresent] = useState([]);

    const classes = useStyles();


    useEffect(() => {
        // fetching data
        let data = props.fetchMethod();
        setRows(data);
        setRowsToPresent(data);
        setSanctionedRows(Array.from(data).filter(app => app['sanctioned'] === "true"));
    }, []);

    const handleSanctionChange = (event) => {
        setSanction(event.target.value);

        setRowsToPresent(event.target.value === "sanctioned" ? sanctionedRows : rows);
    };


    return (
        <div className="table-container">
            <div className="table-actions">
                 <h3>Tops apps by</h3>
                 <FormControl variant="outlined" className={classes.margin}>
                     <StyledSelect value={sanctioned} onChange={handleSanctionChange}>
                         <MenuItem value="unsanctioned">Unsanctioned</MenuItem>
                         <MenuItem value="sanctioned">Sanctioned</MenuItem>
                     </StyledSelect>
                 </FormControl>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rowsToPresent} columns={props.columns} pageSize={5} />
            </div>
        </div>
    );
}