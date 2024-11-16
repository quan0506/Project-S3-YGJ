import Home from '../pages/home/Home'
import Order from '../Auth/pages/Order'
import Shop from '../pages/shop/Shop';
import Product from '../pages/product/Product';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Blog from '../pages/Blog/Blog';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/checkout/checkout';
import Categories from '../Auth/pages/Categories/Categories';
import Dashboard from '../Auth/pages/Dashboard';
import Customers from '../Auth/pages/Customers';
import Products from '../Auth/pages/Products';
import ProductDetail from '../pages/product/New/productDetail/productDetail';
import Shipping from '../Auth/pages/Shipping';
import AddToCartButton from '../components/addToCart/addToCart';
import ThankYouPage from '../pages/ThankYouPage/ThankYouPage'
import OrderComponent from '../Auth/pages/OrderStatus/OrderStatus.jsx'
import ListOrder from '../pages/CheckOrderPage/ListOrder/ListOrder.jsx';
import CheckOrderPage from "../pages/CheckOrderPage/CheckOrderPage.jsx"


const privateRoutes = {
    home: {
        path: '/',
        component: Home,
    },
    shop: {
        path: '/shop/:name?',
        component: Shop,

    },
    product: {
        path: '/product',
        component: Product,

    },
    productDetail: {
        path: '/Product/:id',
        component: ProductDetail,

    },
    about: {
        path: '/about',
        component: About,

    },
    contact: {
        path: '/contact',
        component: Contact,

    },
    blog: {
        path: '/blog',
        component: Blog,

    },
    cart: {
        path: '/cart',
        component: Cart,
        requiredLogin: true,
    },

    thankyou: {
        path: '/thankyou',
        component: ThankYouPage,
        requiredLogin: true,
    },

    addtoCart: {
        path: '/addToCart',
        component: AddToCartButton,
        requiredLogin: true,
    },
    ListOrder: {
        path: '/listOrder',
        component: ListOrder,
        requiredLogin: true,
    },
    CheckOrderPage: {
        path: '/checkOrderPage/:id/:iddh/:idpr',
        component: CheckOrderPage,
        requiredLogin: true,
    },
    checkout: {
        path: '/checkout',
        component: Checkout,
        requiredLogin: true,
    },
    categories: {
        path: '/system/categories',
        component: Categories,
        requiredLogin: true,
        role: "Admin"
    },

    order: {
        path: '/system/orders',
        component: Order,
        requiredLogin: true,
        role: "Admin"
    },

    orderstatus: {
        path: '/system/orderstatus/:id/:iddh/:idpr',
        component: OrderComponent,
        requiredLogin: true,
        role: "Admin"
    },

    dashboard: {
        path: '/system',
        component: Dashboard,
        requiredLogin: true,
        role: "Admin"
    },
    customers: {
        path: '/system/customers',
        component: Customers,
        requiredLogin: true,
        role: "Admin"
    },
    products: {
        path: '/system/products',
        component: Products,
        requiredLogin: true,
        role: "Admin"
    },
    shipping: {
        path: '/system/shipping',
        component: Shipping,
        requiredLogin: true,
        role: "Admin"
    },
};

export default privateRoutes;
