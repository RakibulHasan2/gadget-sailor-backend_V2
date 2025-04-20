import express from 'express';
import { UserRoute } from './../modules/users/user.route';
import { CategoriesRoute } from '../modules/categories/categories..route';
import { subCategoriesRoute } from '../modules/sub_categories/sub_categories.route';
import { productsRoute } from '../modules/Product/products.route';
import { cartRoute } from '../modules/cart/cart.route';
import { favRoute } from '../modules/favourites/favourites.route';
import { reviewsRoute } from '../modules/reviews/reviews.route';
import { paymentRoute } from '../modules/payment/payment.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: UserRoute
  },
  {
    path: '/',
    route: CategoriesRoute
  },
  {
    path: '/',
    route: subCategoriesRoute
  },
  {
    path: '/',
    route: productsRoute
  },
  {
    path: '/',
    route: cartRoute
  },
  {
    path: '/',
    route: favRoute
  },
  {
    path: '/',
    route: reviewsRoute
  },
  {
    path: '/',
    route: paymentRoute
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;