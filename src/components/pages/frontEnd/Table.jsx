// Table.jsx
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip
} from "@mui/material";
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";
import axios from "axios";
import {
    MaterialReactTable,
    MRT_EditActionButtons,
    useMaterialReactTable
} from "material-react-table";
import { useMemo, useState } from "react";

const base_UrlS = import.meta.env.VITE_BASE_URL;

const validateRequired = (value) => !!value?.length;
const validateDob = (dob) => !!dob?.length && /^\d{4}-\d{2}-\d{2}$/.test(dob);

const validateUser = (user) => ({
  fname: !validateRequired(user.fname) ? "First Name is required" : "",
  mname: !validateRequired(user.mname) ? "Middle Name is required" : "",
  lname: !validateRequired(user.lname) ? "Last Name is required" : "",
  dob: !validateDob(user.dob) ? "Invalid DOB format (yyyy-mm-dd)" : "",
  gender: !validateRequired(user.gender) ? "Gender is required" : ""
});

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentEditingId, setCurrentEditingId] = useState(null);

  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers
  } = useGetUsers();

  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();
  const { mutateAsync: reorderUser, isPending: isreorderUser } =
    useReorderUser();

  const clearErrors = (key) =>
    setValidationErrors((prev) => ({ ...prev, [key]: undefined }));

  const getEditProps = (field) => ({
    required: true,
    error: !!validationErrors?.[field],
    helperText: validationErrors?.[field],
    onFocus: () => clearErrors(field)
  });

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID", enableEditing: false },
      {
        accessorKey: "fname",
        header: "First Name",
        muiEditTextFieldProps: getEditProps("fname")
      },
      {
        accessorKey: "mname",
        header: "Middle Name",
        muiEditTextFieldProps: getEditProps("mname")
      },
      {
        accessorKey: "lname",
        header: "Last Name",
        muiEditTextFieldProps: getEditProps("lname")
      },
      {
        accessorKey: "dob",
        header: "DOB",
        muiEditTextFieldProps: { type: "date", ...getEditProps("dob") }
      },
      {
        accessorKey: "gender",
        header: "Gender",
        editVariant: "select",
        editSelectOptions: ["Male", "Female", "Other"],
        muiEditTextFieldProps: { select: true, ...getEditProps("gender") }
      },
      {
        accessorKey: "imagePath",
        header: "Photo",
        Cell: ({ cell }) =>
          cell.getValue() ? (
            <img
              src={`${base_UrlS}${cell.getValue()}`}
              alt="Uploaded"
              height={50}
            />
          ) : null,
        enableEditing: false
      }
    ],
    [validationErrors]
  );

  const handleSave = async ({ values, table, isEdit = false }) => {
    const errors = validateUser(values);
    if (Object.values(errors).some(Boolean)) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    const formData = new FormData();
    const blob = new Blob([JSON.stringify(values)], {
      type: "application/json"
    });
    formData.append("form", blob);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    isEdit
      ? await updateUser({ formData, id: currentEditingId })
      : await createUser(formData);
    isEdit ? table.setEditingRow(null) : table.setCreatingRow(null);
    setSelectedFile(null);
  };

  const openDeleteConfirmModal = async (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
      alert("Form deleted!");
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? { color: "error", children: "Error loading data" }
      : undefined,
    muiTableContainerProps: { sx: { minHeight: "500px" } },
    onCreatingRowCancel: () => {
      setValidationErrors({});
      setSelectedFile(null);
    },
    onEditingRowCancel: () => {
      setValidationErrors({});
      setSelectedFile(null);
    },
    onCreatingRowSave: (props) => handleSave({ ...props }),
    onEditingRowSave: (props) => {
      setCurrentEditingId(props.values.id);
      handleSave({ ...props, isEdit: true });
    },
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e) => setSelectedFile(e.target.files?.[0])}
          />
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e) => setSelectedFile(e.target.files?.[0])}
          />
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setCurrentEditingId(row.original.id);
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
        Create New User
      </Button>
    ),

    enableRowOrdering: true,
    enableSorting: false,
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          // Splice the data array to reorder the rows based on drag
          const newData = [...fetchedUsers];
          const draggedRowData = newData.splice(draggingRow.index, 1)[0];
          newData.splice(hoveredRow.index, 0, draggedRowData);
          // setData(newData); // Update the data state with new row order
          // const queryClient = useQueryClient();
          reorderUser(newData);
          // queryClient.setQueryData(["users"], () => newData);
        }
      }
    }),

    state: {
      isLoading: isLoadingUsers,
      isSaving:
        isCreatingUser || isUpdatingUser || isDeletingUser || isreorderUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers
    }
  });

  return <MaterialReactTable table={table} />;
};

// ==== Hooks ====

const useGetUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`${base_UrlS}/api/form/getSaveFormData`);
      return data;
    },
    refetchOnWindowFocus: false
  });

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(
        `${base_UrlS}/api/form/saveForm`,
        formData
      );
      return data;
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (old = []) => [...old, newUser]);
    }
  });
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData }) => {
      const { data } = await axios.put(
        `${base_UrlS}/api/form/editForm`,
        formData
      );
      return data;
    },
    onSuccess: (updatedForm) => {
      queryClient.setQueryData(["users"], (old = []) =>
        old.map((u) => (u.id === updatedForm.id ? updatedForm : u))
      );
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    }
  });
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${base_UrlS}/api/form/deleteForm/${id}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(["users"], (old = []) =>
        old.filter((u) => u.id !== id)
      );
    }
  });
};

const useReorderUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.put(
        `${base_UrlS}/api/form/reorderForms`,
        formData
      );
      return data;
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], () => newUser);
    }
  });
};

// ===== App Entry =====

const queryClient = new QueryClient();

export default function Table() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}
