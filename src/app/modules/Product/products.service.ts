import config from "../../../config";
import { IProducts } from "./products.interface";
import { Products } from "./products.model";

// create Products function
const createProducts = async (payload: IProducts): Promise<IProducts | null | any> => {
    const min = 100000;
    const max = 999999;

    if (!payload.status) {
        payload.status = config.default_status as string;
    }

    if (!payload.product_code) {

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        payload.product_code = randomNumber
    }

    const updateProduct = Object.keys(payload.others_info)
    let obj: object | any = { ...payload }

    for (const element of updateProduct) {
        obj[element] = obj.others_info[element];
    }

    if (obj.others_info) {
        delete obj?.others_info;
    }

    const result = await Products.create(obj);
    return result;
};


// retrieve all products
const getAllProducts = async (): Promise<IProducts[]> => {
    const allProducts = await Products.find({});
    return allProducts;
};


// retrieve products by category
const getProductsByCategoryOrID = async (idOrCategoryName: string): Promise<IProducts | IProducts[] | null> => {
    if (idOrCategoryName.match(/^[0-9a-fA-F]{24}$/)) {
        // The argument is an ObjectId, so retrieve a single product by ID.
        const result = await Products.findById(idOrCategoryName);
        return result;
    } else {
        // The argument is a category name, so retrieve all products in that category.
        const result = await Products.find({
            $or: [
                { category_name: idOrCategoryName },
                { sub_category_name: idOrCategoryName },
                { brand_name: idOrCategoryName }
            ]
        });
        return result;
    }
};


//retrieve products by category and sub category
const getByCatAndSubCatOrSubCatAndBrand = async (categoryName: string, subCategoryName?: string): Promise<IProducts[] | null> => {
    const result = await Products.find({
        $or: [
            {
                $and: [
                    { category_name: categoryName },
                    { sub_category_name: subCategoryName }
                ]
            },
            {
                $and: [
                    { sub_category_name: categoryName },
                    { brand_name: subCategoryName }
                ]
            }
        ]
    });
    return result;
};

//update a single product
const updateSingleProduct = async (id: string, payload: Partial<IProducts>): Promise<IProducts | null> => {
    const updatedProduct = await Products.findOneAndUpdate({ _id: id }, payload, { new: true });
    return updatedProduct;
};

// delete Product by id
const DeleteProduct = async (id: string): Promise<IProducts | null> => {
    const result = await Products.findByIdAndDelete(id);
    return result;
};


export const ProductsService = {
    createProducts,
    getAllProducts,
    updateSingleProduct,
    DeleteProduct,
    getProductsByCategoryOrID,
    getByCatAndSubCatOrSubCatAndBrand,
}