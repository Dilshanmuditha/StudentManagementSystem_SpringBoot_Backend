import { useState } from "react";
import CustomInput from "../../components/inputBox";
import {
  GridColDef,
  GridColumnGroupingModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import CustomTable from "../../components/dataGrid";
import { DataGridContainer } from "./style";
import CustomSelect from "../../components/select";
import { CustomCalendarView, CustomDateSelect } from "../../components/dateSelect";

const Dashboard = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "", flex: 1 },
    { field: "firstName", headerName: "First name", flex: 1 },
    { field: "lastName", headerName: "Last name", flex: 1 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },

  ];

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: "Parent 01",
      description: "",
      headerName: 'Parent 02',
      headerClassName: 'my-super-theme--naming-group-01',
      children: [{ field: "firstName" }, { field: "lastName" }],
    },
    {
      groupId: "Parent 02",
      description: "",
      headerName: 'Parent 02',
      headerClassName: 'my-super-theme--naming-group-02',
      children: [{ field: "age" }, { field: "fullName" }],
    },
  ];

  const selectOption = [
    {label:"option01",value:"1"},
    {label:"option02",value:"2"},
    {label:"option03",value:"3"},
    {label:"option04",value:"4"},
    {label:"option05",value:"5"},
  ]

  const [test, setTest] = useState({
    test: "wer",
  });
  const handleInput = (e: any) => {
    setTest((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  console.log(test);
  return (
    <>
      <div style={{marginBottom:5}}>
        <CustomInput
          id={0}
          labelText={"asdas"}
          value={test.test}
          variant={"outlined"}
          TextFieldType={"text"}
          errorTextState={false}
          errorText={""}
          TextFieldName={"test"}
          onchangeFunction={handleInput}
        />
      </div>
      <div style={{marginBottom:5}}>
        <CustomSelect
         option={selectOption} 
         label={"labelSelect"} 
         value={""} 
         />
      </div>
      <div style={{marginBottom:5}}>
         <CustomDateSelect DateValue={null}/>
      </div>
      <div style={{width:"100px",marginBottom:5}}>
         <CustomCalendarView DateValue={null}/>
      </div>
      <DataGridContainer>
        <CustomTable
          rows={rows}
          columns={columns}
          checkboxState={true}
          columnGroupingState={true}
          columnGroupingModel={columnGroupingModel} 
          pageSize={[10]}
          />
      </DataGridContainer>
    </>
  );
};

export default Dashboard;
