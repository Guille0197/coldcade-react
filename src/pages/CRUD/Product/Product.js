import React, { useState, useRef, useEffect } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import LayoutDashboard from "../../Dashboard/Layout";
import {
  getProductsService,
  deleteProductService,
  createProductService,
  UpdateProductService,
} from "../../../services/ProductService";
import { useQuery } from "react-query";

const Product = () => {
  const toast = useRef(null);
  const dt = useRef(null);

  let emptyProduct = {
    id: null,
    prod_name: "",
    prod_type: "",
    prod_harvest_date: "",
    container_uuid: "",
    cli_uuid: "",
  };

  // USE STATE
  // const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);

  // React-Query - llamada a la API
  const {
    isIdle,
    isLoading,
    isError,
    data: products,
    error,
    refetch,
    isFetching,
  } = useQuery("product", getProductsService, {
    refetchInterval: 1000,
  });

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={openNew}
          />
          <Button
            label="Borrar"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedProducts || !selectedProducts.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          label="Importar"
          chooseLabel="Importar"
          className="mr-2 inline-block"
        />
        <Button
          label="Exportar"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);
    if (product.prod_name.trim()) {
      let _product = { ...product };
      if (product.id) {
        UpdateProductService(
          _product.prod_uuid,
          _product.prod_name,
          _product.prod_type,
          _product.prod_harvest_date,
          _product.container_uuid,
          _product.cli_uuid
        )
          .then(() => {
            toast.current.show({
              severity: "success",
              summary: "Exito",
              detail: "Producto Actualizado",
              life: 3000,
            });
          })
          .catch(() => {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "Hubo un error al actualizar el producto",
              life: 3000,
            });
          });
      } else {
        createProductService(
          _product.prod_name,
          _product.prod_type,
          _product.prod_harvest_date,
          _product.container_uuid,
          _product.cli_uuid
        )
          .then(() => {
            toast.current.show({
              severity: "success",
              summary: "Exitoso",
              detail: "Producto Creado",
              life: 3000,
            });
          })
          .catch(() => {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "Hubo un error al crear el producto",
              life: 3000,
            });
          });
      }
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const onInputChange = (e, prod_name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${prod_name}`] = val;
    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Administrar Productos</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );

  const deleteProduct = () => {
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    // llamada a la API y elimina producto
    deleteProductService(product.prod_uuid)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Con éxito",
          detail: "Producto eliminado",
          life: 3000,
        });
      })
      .catch(() => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Producto no eliminado",
          life: 3000,
        });
      });
  };

  const deleteSelectedProducts = () => {
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    deleteProductService(product.prod_uuid); // llamada a la API y elimina producto
    toast.current.show({
      severity: "success",
      summary: "Con éxito",
      detail: "Productos eliminados",
      life: 3000,
    });
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning mt-2"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </div>
    );
  };

  const codeBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Code</span>
        {rowData.id}
      </>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.prod_name}
      </>
    );
  };

  const registerDateBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">date register</span>
        {new Date(rowData.prod_register_date).toLocaleDateString("en-Gb")}
      </>
    );
  };

  const harvestDateBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title"> harvest date</span>
        {new Date(rowData.prod_harvest_date).toLocaleDateString("en-Gb")}
      </>
    );
  };

  const categoryBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">type</span>
        {rowData.prod_type}
      </>
    );
  };

  const productDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-danger"
        onClick={hideDialog}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-success "
        onClick={saveProduct}
      />
    </>
  );

  const deleteProductDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-danger"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-success"
        onClick={deleteProduct}
      />
    </>
  );

  const deleteProductsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </>
  );

  return (
    <LayoutDashboard>
      <div className="grid crud-demo">
        <div className="col-12">
          <div className="card">
            <Toast ref={toast} />
            <Toolbar
              className="mb-4"
              left={leftToolbarTemplate}
              right={rightToolbarTemplate}
            ></Toolbar>

            <DataTable
              ref={dt}
              value={products}
              selection={selectedProducts}
              onSelectionChange={(e) => setSelectedProducts(e.value)}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              className="datatable-responsive"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} resultados"
              globalFilter={globalFilter}
              emptyMessage="No se han encontrado resultados."
              header={header}
              responsiveLayout="scroll"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
              ></Column>
              <Column
                field="id"
                header="Código"
                sortable
                body={codeBodyTemplate}
                headerStyle={{ width: "14%", minWidth: "1rem" }}
              ></Column>
              <Column
                field="prod_name"
                header="Nombre"
                sortable
                body={nameBodyTemplate}
                headerStyle={{ width: "14%", minWidth: "10rem" }}
              ></Column>
              <Column
                field="prod_register_date"
                header="Fecha registro"
                sortable
                body={registerDateBodyTemplate}
                headerStyle={{ width: "14%", minWidth: "6rem" }}
              ></Column>
              <Column
                field="prod_harvest_date"
                header="Fecha cosecha"
                body={harvestDateBodyTemplate}
                sortable
                headerStyle={{ width: "14%", minWidth: "6rem" }}
              ></Column>
              <Column
                field="prod_type"
                header="Tipo de producto"
                sortable
                body={categoryBodyTemplate}
                headerStyle={{ width: "14%", minWidth: "10rem" }}
              ></Column>
              {/* <Column
                field="inventoryStatus"
                header="Cant. Inventario"
                // body={statusBodyTemplate}
                sortable
                headerStyle={{ width: "14%", minWidth: "10rem" }}
              ></Column> */}
              <Column body={actionBodyTemplate}></Column>
            </DataTable>

            <Dialog
              visible={productDialog}
              style={{ width: "450px" }}
              header="Detalles del Producto"
              modal
              className="p-fluid"
              footer={productDialogFooter}
              onHide={hideDialog}
            >
              <div className="field">
                <label htmlFor="prod_name">Nombre del producto</label>
                <InputText
                  id="prod_name"
                  value={product.prod_name}
                  onChange={(e) => onInputChange(e, "prod_name")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.prod_name,
                  })}
                />
                {submitted && !product.prod_name && (
                  <small className="p-invalid">
                    El nombres es obligatorio.
                  </small>
                )}
              </div>
              <div className="field">
                <label htmlFor="prod_type">Tipo de producto</label>
                <InputText
                  id="prod_type"
                  value={product.prod_type}
                  onChange={(e) => onInputChange(e, "prod_type")}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.prod_type,
                  })}
                />
                {submitted && !product.prod_type && (
                  <small className="p-invalid">El tipo es obligatorio.</small>
                )}
              </div>
              <div className="field">
                <label htmlFor="prod_harvest_date">Fecha de cosecha</label>
                <Calendar
                  id="prod_harvest_date"
                  showIcon
                  showButtonBar
                  value={new Date(product.prod_harvest_date)}
                  onChange={(e) => onInputChange(e, "prod_harvest_date")}
                  className={classNames({
                    "p-invalid": submitted && !product.prod_harvest_date,
                  })}
                ></Calendar>
                {submitted && !product.prod_harvest_date && (
                  <small className="p-invalid">
                    La fecha de cosecha es obligatorio.
                  </small>
                )}
              </div>
              <div className="field">
                <label htmlFor="container_uuid">Código de contenedor</label>
                <InputText
                  id="container_uuid"
                  value={product.container_uuid}
                  onChange={(e) => onInputChange(e, "container_uuid")}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.container_uuid,
                  })}
                />
                {submitted && !product.container_uuid && (
                  <small className="p-invalid">
                    El código de contenedor es obligatorio.
                  </small>
                )}
              </div>
              <div className="field">
                <label htmlFor="cli_uuid">Código de cliente</label>
                <InputText
                  id="cli_uuid"
                  value={product.cli_uuid}
                  onChange={(e) => onInputChange(e, "cli_uuid")}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.cli_uuid,
                  })}
                />
                {submitted && !product.cli_uuid && (
                  <small className="p-invalid">
                    El código de cliente es obligatorio.
                  </small>
                )}
              </div>

              <div className="formgrid grid">
                <div className="field col">
                  <label htmlFor="price">Precio</label>
                  <InputNumber
                    id="price"
                    // value={product.price}
                    onValueChange={(e) => onInputNumberChange(e, "price")}
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                  />
                </div>
                <div className="field col">
                  <label htmlFor="quantity">Cantidad</label>
                  <InputNumber
                    id="quantity"
                    // value={product.quantity}
                    onValueChange={(e) => onInputNumberChange(e, "quantity")}
                    integeronly
                  />
                </div>
              </div>
            </Dialog>

            <Dialog
              visible={deleteProductDialog}
              style={{ width: "450px" }}
              header="Confirmar eliminación"
              modal
              footer={deleteProductDialogFooter}
              onHide={hideDeleteProductDialog}
            >
              <div className="flex align-items-center justify-content-center">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {product && (
                  <span>
                    ¿Seguro que quieres eliminar <b>{product.prod_name}</b>?
                  </span>
                )}
              </div>
            </Dialog>

            <Dialog
              visible={deleteProductsDialog}
              style={{ width: "450px" }}
              header="Confirmar eliminación"
              modal
              footer={deleteProductsDialogFooter}
              onHide={hideDeleteProductsDialog}
            >
              <div className="flex align-items-center justify-content-center">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {product && (
                  <span>
                    ¿Está seguro de que quiere eliminar los productos
                    seleccionados?
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default React.memo(Product);
