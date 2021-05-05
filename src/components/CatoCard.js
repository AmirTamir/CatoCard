import React, {useEffect, useState} from "react";

//styling
import "./CatoCard.css";

//data
import apps from "../services/apps.json";

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from "@material-ui/core/TableFooter";
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// import pagination helper component
import {TablePaginationActions} from "./Pagination";
import Card2 from "./Card2";


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

// Table styling
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.action.hover,
    },
    body: {
        fontSize: 14,
    },
    root: {
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },

}))(TableCell);

const StyledTableRow = withStyles(() =>({
    root: {
        height: 10,
    },
}))(TableRow);

const StyledTable = withStyles({
    root: {
        width: 580,
        height: 344,
    }
})(TableContainer);

// Dropdown styling
const StyledSelect = withStyles({
    root: {
        width: 100,
        padding: '10px 26px 10px 12px',
        marginLeft: 10,
    }
})(Select);




// could get the addr to fetch by props
const CatoCard = () => {

    const [data, setData] = useState([]);
    const [sanctioned, setSanction] = useState("unsanctioned");
    const [sortBy, setSortBy] = useState("risk_score");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSanctionChange = (event) => {
        setSanction(event.target.value);
    };

    const handleSortingChange = (event) => {
        setSortBy(event.target.value);

        setData(
            data.sort((obj1, obj2) => obj2[event.target.value] - obj1[event.target.value])
        );
    }


    //fetching and setting data
    useEffect(() => {
        setData(apps);
    }, []);

    return (

        <Card className={classes.root}>
            <CardContent>
                <div className="table-actions">
                    <h3>Tops apps by</h3>
                    <FormControl variant="outlined" className={classes.margin}>
                        <StyledSelect value={sanctioned} onChange={handleSanctionChange}>
                            <MenuItem value="unsanctioned">Unsanctioned</MenuItem>
                            <MenuItem value="sanctioned">Sanctioned</MenuItem>
                        </StyledSelect>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.margin}>
                        <StyledSelect value={sortBy} onChange={handleSortingChange}>
                            <MenuItem value="user_count">Users</MenuItem>
                            <MenuItem value="traffic">Traffic</MenuItem>
                            <MenuItem value="risk_score">Risk Score</MenuItem>
                        </StyledSelect>
                    </FormControl>
                </div>


                <StyledTable component={Paper}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell><b>App</b></StyledTableCell>
                                <StyledTableCell align="left"><b>Users</b></StyledTableCell>
                                <StyledTableCell><b>Traffic</b></StyledTableCell>
                                <StyledTableCell><b>Risk Score</b></StyledTableCell>
                            </StyledTableRow>
                        </TableHead>

                        <TableBody>
                            {(
                                rowsPerPage > 0
                                    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : data
                            ).map((row) => (
                                (sanctioned === "unsanctioned" || row['sanctioned'] === "true") ?
                                    <StyledTableRow key={row['id']}>
                                        <StyledTableCell align="center">
                                                <img src={row['app']} className="app-img" />
                                        </StyledTableCell>
                                        <StyledTableCell padding="none" style={{color: "blue"}}>{row['user_count']}</StyledTableCell>
                                        <StyledTableCell padding="none">{row['traffic'] + ".GB"}</StyledTableCell>
                                        <StyledTableCell padding="none" style={{color: "red"}} align="center">{row['risk_score']}</StyledTableCell>
                                    </StyledTableRow>
                            :
                                    null

                            ))}



                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <StyledTableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </StyledTableRow>
                        </TableFooter>
                    </Table>
                </StyledTable>


            </CardContent>

        </Card>

    );
}

export default CatoCard;