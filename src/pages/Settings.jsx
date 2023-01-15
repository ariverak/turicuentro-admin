import {
  Button,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Layout from "../components/layout";
import Table from "../components/Table.jsx";
import {
  useSettingsQuery,
  useCreateSettingMutation,
  useUpdateSettingMutation,
  useDeleteSettingMutation,
} from "../services/apis/settingApi";
import FormModal from "../components/FormModal";
import DeleteModal from "../components/DeleteModal";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { formatter } from "../config/constants";

const Settings = () => {
  const [deleteSetting, { isLoading: isLoadingDelete }] =
    useDeleteSettingMutation();
  const [createSetting, { isLoading: isLoadingUpdate }] =
    useCreateSettingMutation();
  const [updateSetting, { isLoading: isLoadingCreate }] =
    useUpdateSettingMutation();

  const { data: settings, refetch: refetchSetting } = useSettingsQuery();

  const [settingModal, setSettingModal] = useState({
    visible: false,
    setting: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    visible: false,
    settingId: null,
  });

  const {
    handleSubmit: handleSubmitSetting,
    register: registerSetting,
    reset: resetSetting,
    setValue: setSettingValue,
  } = useForm();

  const onSubmitSetting = async (data) => {
    const { id, key, value } = data;
    const editedData = { id, key, value };
    data.id ? await updateSetting(editedData) : await createSetting(data);
    refetchSetting();
    resetSetting();
    setSettingModal({ visible: false });
  };

  const handleDeleteSetting = async () => {
    await deleteSetting(deleteModal.settingId);
    refetchSetting();
    setDeleteModal({ visible: false });
  };

  const columns = [
    {
      field: "key",
      headerName: "Servicios",
      headerClassName: "backgroundColor:#eee",
      flex: 0.1,
      width: 150,
      disableClickEventBubbling: true,
    },

    {
      field: "value",
      flex: 0.1,
      headerName: "Valor",
      headerAlign: "left",
      align: "left",
      type: "number",
      disableClickEventBubbling: true,
      width: 150,
      valueFormatter: (params) => formatter.format(params?.value),
    },
    {
      field: "actions",
      flex: 0.1,
      headerName: "Acciones",
      sortable: false,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            size="small"
            onClick={() => {
              setSettingModal({ visible: true, setting: params.row });
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="error"
            size="small"
            onClick={() => {
              setDeleteModal({ visible: true, settingId: params.row.id });
              console.log(params.row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <Grid justifyContent="end" container width="90%">
          <Button
            variant="contained"
            onClick={() => {
              setSettingModal({ visible: true });
            }}
          >
            Agregar
          </Button>
        </Grid>
        <br />
        <Grid
          rounded="true"
          justifyContent="center"
          container
          alignItems="center"
        >
          {settings && <Table data={settings} columns={columns} />}
        </Grid>
      </Layout>
      <FormModal
        id="form-setting"
        title={
          !settingModal.setting
            ? "Agregar Configuración"
            : "Editar Configuración"
        }
        open={settingModal.visible}
        onClose={() => setSettingModal({ visible: false })}
        defaultValues={settingModal.setting}
        setValue={setSettingValue}
        reset={resetSetting}
      >
        <FormControl>
          <form onSubmit={handleSubmitSetting(onSubmitSetting)}>
            <TextField
              margin="normal"
              fullWidth
              id="key"
              label="Configuración"
              name="key"
              {...registerSetting("key")}
            />
            <TextField
              margin="normal"
              fullWidth
              id="value"
              label="Valor"
              name="value"
              {...registerSetting("value")}
            />
            <Grid justifyContent="space-between" container marginTop={3}>
              <Button
                variant="outlined"
                onClick={() => {
                  setSettingModal({ visible: false });
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                Aceptar
              </Button>
            </Grid>
          </form>
        </FormControl>
      </FormModal>

      <DeleteModal
        open={deleteModal.visible}
        onClose={() => setDeleteModal({ visible: false })}
        onConfirm={handleDeleteSetting}
        description={
          <>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              ¿Quieres eliminar esta configuración?
            </Typography>
            <Typography>Este proceso no puede ser revertido.</Typography>
          </>
        }
      />
    </>
  );
};

export default Settings;
