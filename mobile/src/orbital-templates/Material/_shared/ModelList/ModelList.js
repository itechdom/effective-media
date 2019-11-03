import React from "react";
//Routing
import { Route } from "react-router-dom";
import { styles } from "./ModelList.styles";
import { withStyles } from "@material-ui/core/styles";
//recompose
import { withState, compose, lifecycle } from "recompose";
//Different template pages
import ModelAdd from "../ModelAdd/ModelAdd";
import ModelEdit from "../ModelEdit/ModelEdit";
import ModelPreview from "../ModelPreview/ModelPreview";
import ModelListItems from "../ModelList/ModelListItems";
import ModelFilterList from "../ModelList/ModelFilterList";
//shared components
import theme from "Theme";
import {
  Paper,
  Grid,
  FloatingAddButton,
  ClientNotification,
  Autocomplete,
  Table,
  TablePagination,
  Fade,
  Card,
  CardContent,
  Empty,
  Loading
} from "../../index.js";

const enhance = compose(
  withState("viewOption", "setViewOption", 0),
  withState("page", "setPage", 1),
  withState("rowsPerPage", "setRowsPerPage", 10),
  lifecycle({
    componentDidMount() {
      this.props.setPage(0);
    }
  }),
  withState("currentQuery", "setCurrentQuery", {})
);

const style = {};

const ModelList = enhance(
  ({
    modelArray,
    modelSchema,
    columns,
    createModel,
    modelName,
    updateModel,
    deleteModel,
    searchModel,
    uploadMedia,
    setFilter,
    removeFilter,
    modelCount,
    loading,
    gallery,
    uploadGallery,
    addToGallery,
    removeFromGallery,
    addToMedia,
    removeFromMedia,
    deleteMedia,
    media,
    mode,
    match,
    history,
    classes,
    form,
    notifications,
    saveNotification,
    removeNotification,
    ModelListPage,
    ModelEditPage,
    ModelAddPage,
    ModelPreviewPage,
    ModelPreviewAction,
    ModelPreviewActions,
    ModelPreviewAttachment,
    modelKey,
    columnNumber,
    xs,
    sm,
    md,
    lg,
    xl,
    onSearch,
    onSearchSelect,
    viewOption,
    setViewOption,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    ModelListActions,
    ModelListItemComponent,
    noPagination,
    onAdd,
    onDelete,
    onEdit,
    onCreate,
    onView,
    defaultView,
    gridSizes,
    currentQuery,
    setCurrentQuery,
    showFilters,
    ...rest
  }) => {
    const onEditWrapper = model => {
      if (onEdit) {
        return onEdit(model);
      }
      history.push(`${match.path}/edit/${model._id}`);
    };
    const onDeleteWrapper = model => {
      if (onDelete) {
        return onDelete(model);
      }
      history.push(`${match.path}/${modelName}`);
    };
    const onAddWrapper = () => {
      if (onAdd) {
        return onAdd();
      }
      history.push(`${match.path}/add`);
    };
    const onCreateWrapper = model => {
      if (onCreate) {
        return onCreate(model);
      }
      onViewWrapper(model);
    };
    const onViewWrapper = model => {
      if (onView) {
        return onView(model);
      }
      history.push(`${match.path}/view/${model._id}`);
    };
    const Actions = {
      onEdit: onEditWrapper,
      onDelete: onDeleteWrapper,
      onCreate: onCreateWrapper,
      onView: onViewWrapper,
      onAdd: onAddWrapper
    };
    let models =
      modelArray &&
      (!noPagination
        ? modelArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : modelArray);
    return (
      <>
        <Route
          exact
          path={`${match.path}/add`}
          render={({ match }) => {
            return ModelAddPage ? (
              <Grid container justify="center">
                <Grid item xs={12}>
                  <ModelAddPage
                    model={{}}
                    form={form}
                    modelSchema={modelSchema}
                    onSave={values => {
                      createModel(values).then(res => {
                        onCreateWrapper(res);
                      });
                    }}
                    onCancel={() => {
                      history.goBack();
                    }}
                    modelName={modelName}
                    {...rest}
                  />
                </Grid>
              </Grid>
            ) : (
              <Fade timeout={1000} in={!loading}>
                <Grid container justify="center">
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <ModelAdd
                      model={{}}
                      form={form}
                      classes={classes}
                      modelSchema={modelSchema}
                      onSave={values => {
                        createModel(values).then(res => {
                          onCreateWrapper(res);
                        });
                      }}
                      onCancel={() => {
                        history.goBack();
                      }}
                      modelName={modelName}
                      {...rest}
                    />
                  </Grid>
                </Grid>
              </Fade>
            );
          }}
        />
        <Route
          path={`${match.path}/edit/:id`}
          render={({ match }) => {
            return ModelEditPage ? (
              <Grid container justify="center">
                <Grid xs={12}>
                  <ModelEditPage
                    modelName={modelName}
                    onCancel={() => {
                      history.goBack();
                    }}
                    onSave={(updatedModel, values) => {
                      updateModel(updatedModel, values);
                    }}
                    form={form}
                    modelSchema={modelSchema}
                    model={
                      modelArray &&
                      modelArray.length > 0 &&
                      modelArray.find(({ _id }) => _id === match.params.id)
                    }
                    media={media}
                    gallery={
                      gallery &&
                      gallery.length > 0 &&
                      gallery.filter(
                        ({ modelId }) => modelId === match.params.id
                      )
                    }
                    uploadMedia={uploadMedia}
                    uploadGallery={uploadGallery}
                    addToGallery={addToGallery}
                    removeFromGallery={removeFromGallery}
                    addToMedia={addToMedia}
                    deleteMedia={deleteMedia}
                    removeFromMedia={removeFromMedia}
                    onMediaUploadComplete={(model, media) => {
                      updateModel(model, {
                        image: `${media}&q=${Date.now()}`
                      });
                    }}
                    onGalleryUploadComplete={(model, media) => {
                      updateModel(model, {
                        gallery: [...model.gallery, ...media]
                      });
                    }}
                    onMediaDeleteComplete={(model, media) => {
                      updateModel(model, { image: `` });
                    }}
                    onGalleryDeleteComplete={(model, index) => {
                      model.gallery.remove(index);
                      updateModel(model, { gallery: model.gallery });
                    }}
                    match={match}
                    deleteModel={deleteModel}
                    {...rest}
                  />
                </Grid>
              </Grid>
            ) : (
              <Fade timeout={1000} in={!loading}>
                <Grid container justify="center">
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <ModelEdit
                      modelName={modelName}
                      classes={classes}
                      onCancel={() => {
                        history.goBack();
                      }}
                      onSave={(updatedModel, values) => {
                        updateModel(updatedModel, values);
                      }}
                      form={form}
                      modelSchema={modelSchema}
                      model={
                        modelArray &&
                        modelArray.length > 0 &&
                        modelArray.find(({ _id }) => _id === match.params.id)
                      }
                      media={media}
                      gallery={
                        gallery &&
                        gallery.length > 0 &&
                        gallery.filter(
                          ({ modelId }) => modelId === match.params.id
                        )
                      }
                      uploadMedia={uploadMedia}
                      uploadGallery={uploadGallery}
                      addToGallery={addToGallery}
                      removeFromGallery={removeFromGallery}
                      addToMedia={addToMedia}
                      deleteMedia={deleteMedia}
                      removeFromMedia={removeFromMedia}
                      onMediaUploadComplete={(model, media) => {
                        updateModel(model, {
                          image: `${media}&q=${Date.now()}`
                        });
                      }}
                      onGalleryUploadComplete={(model, media) => {
                        updateModel(model, {
                          gallery: [...model.gallery, ...media]
                        });
                      }}
                      onMediaDeleteComplete={(model, media) => {
                        updateModel(model, { image: `` });
                      }}
                      onGalleryDeleteComplete={(model, index) => {
                        model.gallery.remove(index);
                        updateModel(model, { gallery: model.gallery });
                      }}
                      {...rest}
                    />
                    <FloatingAddButton onClick={onAddWrapper} />
                  </Grid>
                </Grid>
              </Fade>
            );
          }}
        />
        <Route
          path={`${match.path}/view/:id`}
          render={({ match }) => {
            return ModelPreviewPage ? (
              <Fade timeout={1000} in={!loading}>
                <Grid container>
                  <Grid item xs={12}>
                    <ModelPreviewPage
                      modelName={modelName}
                      onEdit={onEditWrapper}
                      onDelete={onDeleteWrapper}
                      deleteModel={deleteModel}
                      updateModel={updateModel}
                      searchModel={searchModel}
                      form={form}
                      model={
                        modelArray &&
                        modelArray.length > 0 &&
                        modelArray.find(({ _id }) => _id === match.params.id)
                      }
                      classes={classes}
                      match={match}
                      location={location}
                      history={history}
                      ModelPreviewActions={ModelPreviewActions}
                      ModelPreviewAction={ModelPreviewAction}
                      {...rest}
                    />
                  </Grid>
                </Grid>
              </Fade>
            ) : (
              <Fade timeout={1000} in={!loading}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <ModelPreview
                      modelName={modelName}
                      onEdit={onEditWrapper}
                      onDelete={onDeleteWrapper}
                      deleteModel={deleteModel}
                      updateModel={updateModel}
                      searchModel={searchModel}
                      form={form}
                      classes={classes}
                      model={
                        modelArray &&
                        modelArray.length > 0 &&
                        modelArray.find(({ _id }) => _id === match.params.id)
                      }
                      ModelPreviewActions={ModelPreviewActions}
                      ModelPreviewAction={ModelPreviewAction}
                      {...rest}
                    />
                    {ModelPreviewAttachment && (
                      <ModelPreviewAttachment
                        model={
                          modelArray &&
                          modelArray.length > 0 &&
                          modelArray.find(({ _id }) => _id === match.params.id)
                        }
                      />
                    )}
                    <FloatingAddButton onClick={onAddWrapper} />
                  </Grid>
                </Grid>
              </Fade>
            );
          }}
        />
        <Route
          exact
          path={`${match.path}`}
          render={props => {
            return (
              <React.Fragment>
                {ModelListActions && <ModelListActions {...Actions} />}
                {viewOption === 0 && (
                  <Grid container justify="space-between">
                    {showFilters && (
                      <Grid item md={2} sm={2} xs={2}>
                        <Card style={{ minHeight: "75vh" }}>
                          <CardContent>
                            <Autocomplete
                              inputClassName={classes.autocomplete}
                              placeholder={"Search…"}
                              onSelect={suggestion => {
                                onSearchSelect
                                  ? onSearchSelect(suggestion)
                                  : history.push(
                                      `/${suggestion.resource}/view/${suggestion._id}`
                                    );
                              }}
                              loadSuggestions={text => {
                                let query = {
                                  [modelKey]: { $regex: event.target.value }
                                };
                                if (onSearch) {
                                  return onSearch(query);
                                }
                                return searchModel(query);
                              }}
                            />
                            {modelCount && (
                              <ModelFilterList
                                form={form}
                                modelCount={modelCount}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    )}
                    <Grid item md={12}>
                      {defaultView ? (
                        defaultView
                      ) : (
                        <Grid container>
                          <ModelListItems
                            models={models}
                            classes={classes}
                            gridSizes={gridSizes}
                            ModelListItemComponent={ModelListItemComponent}
                            deleteModel={deleteModel}
                            updateModel={updateModel}
                            columnNumber={columnNumber}
                            page={page}
                            history={history}
                            match={match}
                            onView={onViewWrapper}
                            onEdit={onEditWrapper}
                            loading={loading}
                            mode={mode}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                )}
                {viewOption === 1 && (
                  <Table
                    title={modelName}
                    columns={columns.map((col, i) => {
                      return {
                        label: col,
                        id: i
                      };
                    })}
                    rows={models}
                    count={modelArray && modelArray.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                  />
                )}
                {noPagination ? (
                  <></>
                ) : (
                  <Paper>
                    <Grid
                      justify={"flex-start"}
                      style={{ position: "fixed", bottom: "0" }}
                      container
                    >
                      <Grid item>
                        <Paper>
                          <TablePagination
                            rowsPerPageOptions={[5]}
                            component="div"
                            count={modelArray && modelArray.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                              "aria-label": "Previous Page"
                            }}
                            nextIconButtonProps={{
                              "aria-label": "Next Page"
                            }}
                            onChangePage={(event, page) => {
                              setPage(page);
                            }}
                            onChangeRowsPerPage={event =>
                              setRowsPerPage(event.target.value)
                            }
                          />
                        </Paper>
                      </Grid>
                      <Grid item>
                        <FloatingAddButton onClick={onAddWrapper} />
                      </Grid>
                    </Grid>
                  </Paper>
                )}
              </React.Fragment>
            );
          }}
        />
        <ClientNotification
          notifications={notifications}
          handleClose={(event, reason, notification) => {
            removeNotification(notification);
          }}
        />
      </>
    );
  }
);

export default withStyles(styles, { defaultTheme: theme })(ModelList);
