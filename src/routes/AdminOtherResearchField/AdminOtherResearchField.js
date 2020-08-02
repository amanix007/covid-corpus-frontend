import React from "react";
import AdminMenu from "components/AdminMenu/AdminMenu";
import Loading from "components/Loading";
import EditCategory from "./EditCategory";
import EditSubcategory from "./EditSubcategory";
import CategoryList from "./CategoryList";
import SubcategoryList from "./SubcategoryList";
import { otherResearchFieldCategory, otherResearchFieldSubcategory } from 'services';

const AdminOtherResearchField = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [edit, setEdit] = React.useState(null);
  const [list, setList] = React.useState(null);
  const [listLevel, setListLevel] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [subcategories, setSubcategories] = React.useState([]);

  const [selectedCategory, setSelectedCategory] = React.useState();

  const [selectedEditCategory, setSelectedEditCategory] = React.useState(null);
  const [selectedEditSubcategory, setSelectedEditSubcategory] = React.useState(null);

  React.useEffect(() => {
    getCategories();
  }, []);

  const getCategories = (editionId) => {
    setIsLoading(true);
    const x = otherResearchFieldCategory.get().then(categoryList => {
      setListLevel(1);
      setCategories(categoryList);
      setList(categoryList);
      setIsLoading(false);
    });
  }

  const getSubcategories = (categoryId) => {
    setIsLoading(true);
    const x = otherResearchFieldSubcategory.get(categoryId).then(subcategoryData => {
      setListLevel(2);
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
    setSelectedEditCategory(null);
    setSelectedEditSubcategory(null);

    if (reloadList) {
      if (listLevel === 1) {
        getCategories()
      } else if (listLevel === 2) {
        getSubcategories(selectedCategory.id)
      }
    }
  }

  /* CATEGORIES */
  const listCategories = (e) => {
    e.preventDefault();
    setSelectedCategory(null);
    getCategories();
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
    e.preventDefault();
    let x = subcategories.find((p) => p.id === id);
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
              <div className="dk-page-title">Other Research Fields Administration</div>

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
                        <EditCategory
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
                  {listLevel === 2 && (
                    <React.Fragment>
                      {edit && (
                        <EditSubcategory
                          selectedItem={selectedEditSubcategory}
                          categoryId={selectedCategory.id}
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

export default AdminOtherResearchField;
