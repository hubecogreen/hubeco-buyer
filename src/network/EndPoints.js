const endPoints = {
  ADDRESSES: "address/getAllAddress",
  CONTACTUS: "generalEnquiry/addAnEnquiry",
  // Guest Enquiry
  GUEST_ENQUIRY: "guest-users",
  GETALLPOLICIES: 'policies/getAllPolicies',
  POLICIES: "policies/getPolicy",
  POLICYBYID: 'policies/getPolicyById',
  POLICYBYUSERTYPE: 'policies/getPolicyByIdUserType',

  //Plans Module
  PLANS: "subscriptionPlans/getAll",
  MYPLANS: 'subscriptionPlans/mySubscription',
  SLUG_USER: 'products/vendorProfile',
  BLOGS: "blog/getAllBlogs",
  PROJECTS: 'projects/getAllProjects',
  SLUG_PROJECT: 'projects/getProjectByVendor',
  SLUG_PRODUCT: 'products/products',
  GETPROJECTS: 'projects/getProjectById',
  GETBLOGS: "blog/getBlogById",
  LOGIN: "auth/buyerLogin",
  REGISTER: "user/buyerRegister",
  SENDOTP: "auth/sendOtp",
  VERIFYOTP: "auth/verifyOtp",
  FORGOT_PASSWORD: "auth/forgetPassword",
  RESET_PASSWORD: "auth/resetPassword",
  ADDADDRESS: "address/addAnAddress",
  UPDATEADDRESS: 'address/updateAnAddress',
  DELETEADDRESS: 'address/deleteAnAddress',
  SETPASSWORD: "auth/setPassword",
  SETPASSWORDWITHOTPTOKEN: "auth/setPasswordWithOtpToken",
  GET_MEDIA: 'media/presignedUrl',
  GET_PUBLIC_MEDIA: 'media/presignedUrlPublic',
  DETAILS: "user/updateProfile",
  AUTH_ME: "auth/me",
  CHANGE_PASSWORD: "auth/changePassword",
  LOGOUT: 'auth/logout',
  COUNTRIES: 'countries',
  STATES: 'state',
  CITIES: 'city',
  PINCODEINFO: 'pincodeInfo',
  UPDATEBUYER: 'user/updateProfile',
  SENDUPDATEPHONEOTP: 'user/sendUpdatePhoneNumberOtp',
  UPDATEMOBILE: 'user/updatePhone',
  SENDUPDATEEMAILOTP: 'user/sendUpdateEmailOtp',
  UPDATEEMAIL: 'user/updateEmail',
  BUY_SUBSCRIPTION: 'subscriptionPlans/buysubscription',
  VERIFY_SUBSCRIPTION_PAYMENT: 'subscriptionPlans/verifySubscriptionPayment',

  //brands API
  VENDORS: 'products/getPublicVendorListing',

  //Products API's
  CATEGORIES: 'categories/getCategoryTree',
  PRODUCTS_CATEGORIES: 'categories/getProductCategoryTree',
  MENU_CATEGORIES: 'categories/getMenuCategoryTree',
  GETPRODUCT: 'products/product',
  GETPRODUCTWITHSLUG: 'products/shop',
  PRODUCTSLIST: 'products/shop/list',
  FLITERS: 'products/shop/filters',

  //CART MODULE
  CART: "cart/myCart",
  ADDTOCART: "cart/addToCart",
  UPDATECART: "cart/updateCart",
  CLEARCART: "cart/deleteCart",
  CALCULATESHIPPING: "cart/calculateShipping",

  //WISHLIST MODULE
  WISHLIST: 'cart/wishlist',
  ADDTOWISHLIST: 'cart/addToWishlist',
  WISHLISTDATA: 'cart/wishlist/',

  //CHECKOUT MODULE
  CHECKOUT: 'checkout/createCheckout',
  VALIDATEPAYMENT: 'checkout/validatePayment',

  //GLOBAL SEARCH
  SEARCH: 'globalSearch',



  //Green Certificates
  GREENCERTIFICATES: 'greenCertificateAuthorities/getAllCertificateAuthority',


  //ORDERS
  ORDERHISTORY: 'orders/orderHistory',
  UPDATEORDERSTATUS: 'orders/updateOrderStatus',
  CANCELORDER: 'orders/cancel',
  RETURNORDER: 'orders/return',
  SUPPORT: 'customerSupport/createTicket',
  SUPPORT_LISTING: 'customerSupport/getAllTickets',
  SUPPORT_SUMMARY: 'customerSupport/ticketSummary'
};
export default endPoints;
