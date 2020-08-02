import React from "react";
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Box, Typography, IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ListSingle from 'components/ListSingle';
import Loading from './Loading';
import ValidationError from "./ValidationError";

const CategorySelection = ({
  list,
  title,
  max,
  name,
  modalTitle,
  categories,
  getSubcategories,
  subcategories,
  setSubcategories,
  categoryTitle,
  subcategoryTitle,
  required,
    catId,
  setFieldValue,
  errors,
  
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(false);
  const [categoryId, setCategoryId] = React.useState(null);

  React.useEffect(() => {
    if (isOpen) setCategoryId(null);
  }, [isOpen]);

  React.useEffect(() => {
    console.log('categories', categories);
  }, [categories]);

  React.useEffect(() => {
    console.log('subcategories', subcategories);
  }, [subcategories]);

  const addToList = (id) => {
    if (categories && subcategories) {
      let s;
      let c;

      if(id===-1||id===-2){
        s = {id:-1,name:'Others'};
        c = {id:-2,name:'Others'};
      }else{
        s = subcategories.find((x) => x.id === id);
        c = categories.find((x) => x.id === s.categoryId?s.categoryId:s.who_res_prior_cat_id);
      }

      // const c = categories.find((x) => x.id == s.who_res_prior_cat_id);

      setFieldValue(name, [
        ...list,
        {
          categoryName: c.name,
          id: s.id,
          name: s.name,
        },
      ]);

      setSubcategories(null);
    }

    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle} className="dk-modal-header">{title || 'Priority Selection'}{required && <span className="required"> *</span>}</ModalHeader>
        <ModalBody>
          <div className="dk-modal-body">
            {!categoryId &&
              categories && (
                <>
                  {/* <div className="dk-modal-label">{categoryTitle || 'Select Priority Category'}</div> */}

                  {categories.map((c, i) => {
                    return (
                      <>
                        <div
                          className={`dk-item ${(i % 2) === 0 && "dk-item-alt"}`}
                          onClick={() => {
                            getSubcategories(c.id);
                            setCategoryId(c.id);
                          }}
                        >
                          {c.name}
                        </div>
                      </>
                    );
                  })}

                </>
              )}

            {categoryId && !subcategories && <Loading />}
            {categoryId && subcategories && (
              <React.Fragment>
                <Box display="flex" className="dk-category-selected mb-2">
                  <Box flexGrow={1}><Typography >{(categories && categories.find((c) => c.id == categoryId).name) ||
                    ""}</Typography></Box>
                  <Box>
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.preventDefault(); setCategoryId(null);
                      }}>
                      <i className="fa fa-times "></i>
                    </button>
                  </Box>
                </Box>

                {/* <div className="dk-modal-label">{subcategoryTitle || 'Select Priority'}</div> */}
                {subcategories.map((s, i) => {
                  return (
                    <>
                      <div
                        className={`dk-item ${(i % 2) === 0 && "dk-item-alt"}`}
                        onClick={() => addToList(s.id)}
                      >
                        {s.name}
                      </div>
                    </>
                  );
                })}
              </React.Fragment>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="dk-btn dk-btn-blue" onClick={toggle}>
            Cancel
        </button>
        </ModalFooter>
      </Modal>

      <div className="dk-list-header" style={{}}>
        <Label className="fieldTitle">
          {title} {required&&<span class="required">*</span>} (max {max})
        </Label>
        <IconButton
          disabled={list && list.length >= max ? true : false}
          aria-label="add"
          size="small"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
      {(!list || list.length === 0) && (
        <Box fontStyle="italic">No priorities defined yet.</Box>
      )}
      {errors ? <ValidationError message={errors} /> : null}

      {list && list.length > 0 && (
        <ListSingle list={list} setList={(newList) => setFieldValue(name, newList)} />
      )}
    </>
  );
};

export default CategorySelection;
