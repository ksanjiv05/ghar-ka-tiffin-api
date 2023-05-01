import express from "express";
import { addUser, getUser, getUsers, register } from "../../controllers/authController/auth";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../../controllers/productController/product";
import { addAddress, deleteAddress, getAddress, getAddresses, updateAddress } from "../../controllers/addressController/address";
import { auth } from "../../middelware/firebaseAuth";
const router = express.Router();

//user
router.post('/user',addUser);
router.get('/user',auth, getUsers);
router.get('/user/current',auth, getUser);


//address
router.post("/address",auth,addAddress)
router.put("/address/:id",auth,updateAddress)
router.get("/address",auth,getAddresses)
router.get("/address/:id",auth,getAddress)
router.delete("/address/:id",auth,deleteAddress)


export default router;
