import React from "react";

export const columns = [
    { field: 'id', headerName: 'ID', flex:1, headerClassName: "header-class" },
    { field: 'app', headerName: 'App', flex: 1.5 , headerClassName: "header-class",
        renderCell: (params) => {return <img src={params.value} className="app-img" />
        }},
    { field: 'user_count', headerName: 'Users', flex: 1.5 , headerClassName: "header-class",
        renderCell: params => <div style={{color: "blue"}}>{params.value}</div>,},
    {field: 'traffic', headerName: 'Traffic', flex: 1, headerClassName: "header-class",
        renderCell: params => params.value + ".GB"},
    {field: 'risk_score', headerName: 'Risk Score', flex: 1.5, headerClassName: "header-class",
        renderCell: params => <div style={{color: "red"}}>{params.value}</div>},
];