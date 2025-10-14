import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { DatabaseContext } from "../../contexts/DatabaseContext";

function FutureVideos() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { DATABASE_URL } = useContext(DatabaseContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${DATABASE_URL}/api/locations`);
        const formatted = response.data.map((item, index) => ({
          id: item._id || index,
          ...item,
        }));
        setRows(formatted);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [DATABASE_URL]);

  const handleEdit = async (newRow, oldRow) => {
    try {
      const updatedField = Object.keys(newRow).find(
        (key) => newRow[key] !== oldRow[key]
      );

      if (updatedField) {
        await axios.put(`${DATABASE_URL}/api/locations/${newRow.id}`, {
          [updatedField]: newRow[updatedField],
        });
      }
      return newRow;
    } catch (error) {
      console.error("Error updating data:", error);
      return oldRow; // Revert on error
    }
  };

  const columns = [
    { field: "Videograaf", headerName: "Videograaf", flex: 1, editable: true },
    { field: "Nummer", headerName: "Nummer", flex: 1, editable: true },
    { field: "Filmnummer", headerName: "Filmnummer", flex: 1, editable: true },
    { field: "Provincie", headerName: "Provincie", flex: 1, editable: true },
    { field: "Gemeente", headerName: "Gemeente", flex: 1, editable: true },
    { field: "Plaats", headerName: "Plaats", flex: 1, editable: true },
    { field: "Routenaam", headerName: "Routenaam", flex: 1, editable: true },
    { field: "Code1", headerName: "Code1", flex: 1, editable: true },
    { field: "Seizoen", headerName: "Seizoen", flex: 1, editable: true },
    { field: "Code2", headerName: "Code2", flex: 1, editable: true },
    { field: "Dieren", headerName: "Dieren", flex: 1, editable: true },
    {
      field: "Bijzonderheden | Opmerkingen",
      headerName: "Bijzonderheden / Opmerkingen",
      flex: 1.5,
      editable: true,
    },
    {
      field: "Datum opname",
      headerName: "Datum opname",
      flex: 1,
      editable: true,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Future Videos
        </h1>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
        >
          Refresh
        </button>
      </header>

      {/* Table */}
      <main className="flex-1 p-4">
        <div className="bg-white rounded-2xl shadow-md p-3 h-full">
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            processRowUpdate={handleEdit}
            onProcessRowUpdateError={(error) =>
              console.error("Row update error:", error)
            }
            disableSelectionOnClick
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f9fafb",
                fontWeight: "600",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "0.9rem",
              },
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default FutureVideos;
