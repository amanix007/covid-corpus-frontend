import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Loading from './Loading';

const CategorySelectionModal = ({
  isOpen,
  setIsOpen,
  categories,
  categoryId,
  subcategories,
  setCategoryId,
  addToList
}) => {
  const toggle = () => setIsOpen(false);

  React.useEffect(() => {
    if (isOpen) setCategoryId(null);
  }, [isOpen]);

  const setSubcategoryIdClick = (id) => {
    console.log('setSubcategoryIdClick', id);
    addToList(id);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
      <ModalHeader toggle={toggle} className="dk-modal-header">Priority Selection</ModalHeader>
      <ModalBody>
        <div className="dk-modal-body">
          {!categoryId &&
            categories && (
              <>
                <div className="dk-modal-label">Select Priority Category:</div>
                <ul>
                  {categories.map((c) => {
                    return (
                      <>
                        <li
                          className="dk-category-selection"
                          onClick={() => setCategoryId(c.id)}
                        >
                          {c.name}
                        </li>
                      </>
                    );
                  })}
                </ul>
              </>
            )}

          {categoryId && !subcategories && <Loading />}
          {categoryId && subcategories && (
            <React.Fragment>
              <div className="dk-category-selected">
                {(categories &&
                  categories.find((c) => c.id == categoryId).name) ||
                  ""}
              </div>
              <div className="dk-modal-label">Select Priority:</div>
              <ul>
                {/* {console.log('x', subcategories, categoryId)} */}
                {subcategories.map((s) => {
                  return (
                    <>
                      <li
                        className="dk-category-subselection"
                        onClick={() => setSubcategoryIdClick(s.id)}
                      >
                        {s.name}
                      </li>
                    </>
                  );
                })}
              </ul>
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
  );
};

export default CategorySelectionModal;
