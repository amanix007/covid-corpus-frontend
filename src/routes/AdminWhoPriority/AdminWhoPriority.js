import React from "react";
import AdminMenu from "components/AdminMenu/AdminMenu";
import Loading from "components/Loading";
import EditEditon from "./EditEditon";
import EditCategory from "./EditCategory";
import EditSubcategory from "./EditSubcategory";
import EditionList from "./EditionList";
import CategoryList from "./CategoryList";
import SubcategoryList from "./SubcategoryList";
import { whoPriorityEditionService, whoPriorityCategoryService, whoPrioritySubcategoryService } from 'services';

const AdminWhoPriority = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [editions, setEditions] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [subcategories, setSubcategories] = React.useState([]);

  const [edit, setEdit] = React.useState(null);
  const [list, setList] = React.useState(null);
  const [listLevel, setListLevel] = React.useState(null);

  const [selectedEdition, setSelectedEdition] = React.useState();
  const [selectedCategory, setSelectedCategory] = React.useState();

  const [selectedEditEdition, setSelectedEditEdition] = React.useState(null);
  const [selectedEditCategory, setSelectedEditCategory] = React.useState(null);
  const [selectedEditSubcategory, setSelectedEditSubcategory] = React.useState(null);

  React.useEffect(() => {
    getEditions(true);
  }, []);

  const getEditions = (markActive) => {
    setIsLoading(true);
    const x = whoPriorityEditionService.get().then(dp => {
      setListLevel(1);
      setEditions(dp);
      setList(dp);

      if (markActive) {
        const x = dp.find(e => e.status === "A");
        if (x) {
          setSelectedEdition(x);

          whoPriorityCategoryService.get(x.id).then(dc => {
            setListLevel(2);
            setCategories(dc);
            setList(dc);
            setIsLoading(false);
          });
        }
        else {
          setIsLoading(false);
        }
      }
      else {
        setIsLoading(false); 
      }
    });
  }

  const getCategories = (editionId) => {
    setIsLoading(true);
    const x = whoPriorityCategoryService.get(editionId).then(categoryList => {
      setListLevel(2);
      setCategories(categoryList);
      setList(categoryList);
      setIsLoading(false);       
    });
  }

  const getSubcategories = (categoryId) => {
    setIsLoading(true);
    const x = whoPrioritySubcategoryService.get(categoryId).then(subcategoryData => {
      setListLevel(3);
      setSubcategories(subcategoryData);
      setList(subcategoryData);
      setIsLoading(false);       
    });
  }

  const handleNew = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleFinalizeEditing(false);
  };

  const handleFinalizeEditing = (reloadList) => {
    setEdit(false);
    setSelectedEditEdition(null);
    setSelectedEditCategory(null);
    setSelectedEditSubcategory(null);

    if (reloadList) {
      if (listLevel === 1) {
        getEditions();
      } else if (listLevel === 2) {
        getCategories(selectedEdition.id)
      } else if (listLevel === 3) {
        getSubcategories(selectedCategory.id)
      }
    }
  }

  /* EDITIONS */
  const listEditions = (e) => {
    e.preventDefault();
    setEditions(null);
    setSelectedCategory(null);
    setSelectedEdition(null);
    getEditions(false);    
    setEdit(false);
  };

  const expandEdition = (e, id) => {
    e.preventDefault();
    let x = editions.find((p) => p.id === id);
    setSelectedEdition(x);
    getCategories(x.id);
    setEdit(false);
  };

  const handleEditEdition = (e, id) => {
    e.preventDefault();
    let x = editions.find((p) => p.id === id);
    setSelectedEditEdition(x);
    setEdit(true);
  };

  /* CATEGORIES */
  const listCategories = (e) => {
    e.preventDefault();
    setSelectedCategory(null);
    getCategories(selectedEdition.id);
    setEdit(false);
  };

  const expandCategory = (e, id) => {
    e.preventDefault();
    let x = categories.find((p) => p.id === id);
    setSelectedCategory(x);
    getSubcategories(x.id);
    setEdit(false);
  };

  const handleEditCategory = (e, id) => {
    e.preventDefault();
    let x = categories.find((p) => p.id === id);
    setSelectedEditCategory(x);
    setEdit(true);
  };

  /* SUBCATEGORIES */
  const handleEditSubcategory = (e, id) => {
    console.log('handleEditSubcategory', id);
    e.preventDefault();
    let x = subcategories.find((p) => p.id === id);
    console.log('handleEditSubcategory x', x);
    setSelectedEditSubcategory(x);
    setEdit(true);
  };

  return (
    <main id="sj-main" className="sj-main sj-haslayout">
      <div className="sj-content">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-5 col-lg-3">
              <AdminMenu />
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-9">
              <div className="dk-page-title">WHO Priorities</div>

              {selectedEdition && (
                <div className="dk-level1 mb-3">
                  <button
                    className="dk-level-button mr-3"
                    onClick={(e) => listEditions(e)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                  {selectedEdition.title}
                </div>
              )}
              {selectedCategory && (
                <div className="dk-level2 mb-3">
                  <button
                    className="dk-level-button mr-3"
                    onClick={(e) => listCategories(e)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                  {selectedCategory.name}
                </div>
              )}

              {isLoading && <Loading />}

              {!isLoading && listLevel && (
                <React.Fragment>
                  {listLevel === 1 && (
                    <React.Fragment>
                      {edit && (
                        <EditEditon
                          selectedItem={selectedEditEdition}
                          handleCancel={handleCancel}
                          getEditions={getEditions}
                          handleFinalizeEditing={handleFinalizeEditing}
                        />
                      )}

                      {!edit && list && (
                        <EditionList
                          handleNew={handleNew}
                          list={list}
                          expandEdition={expandEdition}
                          handleEditEdition={handleEditEdition}
                        />
                      )}
                    </React.Fragment>
                  )}
                  {listLevel === 2 && (
                    <React.Fragment>
                      {edit && selectedEdition && (
                        <EditCategory
                          editionId={selectedEdition.id}
                          selectedItem={selectedEditCategory}
                          handleCancel={handleCancel}
                          handleFinalizeEditing={handleFinalizeEditing}
                        />
                      )}

                      {!edit && list && (
                        <CategoryList
                          handleNew={handleNew}
                          list={list}
                          expandCategory={expandCategory}
                          handleEditCategory={handleEditCategory}
                        />
                      )}
                    </React.Fragment>
                  )}
                  {listLevel === 3 && (
                    <React.Fragment>
                      {console.log('selectedEditSubcategory', selectedEditSubcategory)}
                      {edit && (
                        <EditSubcategory
                          categoryId={selectedCategory.id}
                          selectedItem={selectedEditSubcategory}
                          handleCancel={handleCancel}
                          handleFinalizeEditing={handleFinalizeEditing}
                        />
                      )}

                      {!edit && list && (
                        <SubcategoryList
                          handleEditSubcategory={handleEditSubcategory}
                          handleNew={handleNew}
                          list={list}
                        />
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminWhoPriority;
