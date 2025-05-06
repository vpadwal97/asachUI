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
import { useEffect, useMemo, useState } from "react";

const base_UrlS = import.meta.env.VITE_BASE_URL;

const validateRequired = (value) => value;

// const validateUser = (user) => ({
//   componentCode: !validateRequired(user.componentCode)
//     ? "omponent Name is required"
//     : "",
//   componentCode: !validateRequired(user.componentCode)
//     ? "Component Code is required"
//     : "",
//   componentType: !validateRequired(user.componentType)
//     ? "Component Type is required"
//     : "",
//   isActive:
//     !validateRequired(user.isActive) ||
//     validateRequired(user.isActive) === null ||
//     validateRequired(user.isActive) === undefined
//       ? "isActive is required"
//       : ""
//   // isActive: user.isActive === null || user.isActive === undefined ? "isActive is required" : ""
// });

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const base_UrlS = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);

  const [componentCodeList, setComponentCodeList] = useState([]);
  const renderHomePage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${base_UrlS}/api/CmsComponentDesignController/get`
      );
      // const response = homePageResponse;
      setComponentCodeList(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    renderHomePage();
  }, []);
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
  let linkTypeList = [
    {
      optionLabel: "Product",
      optionValue: "DENP"
    },
    {
      optionLabel: "Category",
      optionValue: "DENC"
    },
    {
      optionLabel: "Seller",
      optionValue: "DESR"
    },
    {
      optionLabel: "Brand",
      optionValue: "DENB"
    },
    {
      optionLabel: "Store",
      optionValue: "DEST"
    },
    {
      optionLabel: "HomePage",
      optionValue: "DENA"
    },
    {
      optionLabel: "Search",
      optionValue: "DESE"
    },
    {
      optionLabel: "ShoppingCart",
      optionValue: "DENT"
    },
    {
      optionLabel: "ThankYou",
      optionValue: "DETY"
    },
    {
      optionLabel: "Cart",
      optionValue: "DECT"
    },
    {
      optionLabel: "Default",
      optionValue: "DFLT"
    },
    {
      optionLabel: "Page",
      optionValue: "DEPG"
    },
    {
      optionLabel: "Managed Product Entity",
      optionValue: "DEMP"
    },
    {
      optionLabel: "Checkout",
      optionValue: "DECO"
    },
    {
      optionLabel: "DYOJ Product Listing Layout",
      optionValue: "PERS-CTLG"
    },
    {
      optionLabel: "DYOJ Product Listing Layout",
      optionValue: "PERS-CTLG"
    }
  ];

  const columns = useMemo(
    () => [
      { accessorKey: "rfnum", header: "ID", enableEditing: false },
      {
        accessorKey: "mediaType",
        header: "Media Type",
        editVariant: "select",
        editSelectOptions: ["IMAGE", "VIDEO"],
        muiEditTextFieldProps: { select: true, ...getEditProps("mediaType") }
      },
      {
        accessorKey: "title",
        header: "title",
        muiEditTextFieldProps: getEditProps("title")
      },
      {
        accessorKey: "linkType",
        header: "linkType",
        editVariant: "select",
        editSelectOptions: linkTypeList.map((list) => list.optionValue),
        muiEditTextFieldProps: { select: true, ...getEditProps("linkType") }
      },
      {
        accessorKey: "linkValue",
        header: "linkValue",
        muiEditTextFieldProps: getEditProps("linkValue")
      },
      {
        accessorKey: "link",
        header: "link",
        muiEditTextFieldProps: getEditProps("link")
      },
      {
        accessorKey: "sequence",
        header: "sequence",
        muiEditTextFieldProps: getEditProps("sequence")
      },
      { accessorKey: "imageName", header: "Image Name", enableEditing: false },
      {
        accessorKey: "imageLocation",
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
      },
      {
        accessorKey: "mobileImage",
        header: "Mobile Image",
        enableEditing: false
      },
      {
        accessorKey: "mobileImageLocation",
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
      },
      {
        accessorKey: "subtitle1",
        header: "subtitle1",
        muiEditTextFieldProps: getEditProps("subtitle1")
      },
      {
        accessorKey: "subtitle2",
        header: "subtitle2",
        muiEditTextFieldProps: getEditProps("subtitle2")
      },
      {
        accessorKey: "subtitle3",
        header: "subtitle3",
        muiEditTextFieldProps: getEditProps("subtitle3")
      },
      {
        accessorKey: "caption",
        header: "caption",
        muiEditTextFieldProps: getEditProps("caption")
      },
      {
        accessorKey: "componentCode",
        header: "Component Code",
        editVariant: "select",
        editSelectOptions: componentCodeList.map((comp) => comp.componentCode),
        muiEditTextFieldProps: {
          select: true,
          ...getEditProps("componentCode")
        }
      },

      {
        accessorKey: "isActive",
        header: "Is Active",
        editVariant: "select",
        editSelectOptions: ["true", "false"],
        editSelectLabels: ["true", "false"],
        muiEditTextFieldProps: { select: true, ...getEditProps("isActive") },
        Cell: ({ cell }) => (cell.getValue() ? "true" : "false")
      }
    ],
    [validationErrors]
  );

  const handleSave = async ({ values, table, isEdit = false }) => {
    // const errors = validateUser(values);
    // if (Object.values(errors).some(Boolean)) {
    //   setValidationErrors(errors);
    //   return;
    // }
    // setValidationErrors({});

    const formData = new FormData();
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    if (selectedFile2) {
      formData.append("mobileImage", selectedFile2);
    }
    const blob = new Blob([JSON.stringify(values)], {
      type: "application/json"
    });
    formData.append("form", blob);

    isEdit
      ? await updateUser({ formData, id: currentEditingId })
      : await createUser(formData);
    isEdit ? table.setEditingRow(null) : table.setCreatingRow(null);
    setSelectedFile(null);
    setSelectedFile2(null);
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
    },
    onEditingRowCancel: () => {
      setValidationErrors({});
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
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e) => setSelectedFile2(e.target.files?.[0])}
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
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e) => setSelectedFile2(e.target.files?.[0])}
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
      const { data } = await axios.get(`${base_UrlS}/api/mediaBanner/get`);
      return data;
    },
    refetchOnWindowFocus: false
  });

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(
        `${base_UrlS}/api/mediaBanner/create`,
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
        `${base_UrlS}/api/mediaBanner/edit`,
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
      await axios.delete(`${base_UrlS}/api/mediaBanner/delete/${id}`);
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
        `${base_UrlS}/api/mediaBanner/reorder`,
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

export default function MediaGallary() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}
