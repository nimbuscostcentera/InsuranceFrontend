import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AuthSlice from "../Slice/AuthSlice";
import SetPasswordSlice from "../Slice/SetPasswordSlice";
import SalesDetailSlice from "../Slice/SalesDetailSlice";
import GeneratePolicySlice from "../Slice/GeneratePolicyNoSlice";
import UploadExcelSlice from "../Slice/UploadExcelSlice";
import InvoiceListSlice from "../Slice/InvoiceListSlice";
import  FetchTokenSlice  from "../Slice/FetchTokenSlice";
import UpdateCompanySlice from "../Slice/UpdateCompanySlice";
import PolicyInsertSlice from "../Slice/InsertPolicySlice";
const rootReducer = combineReducers({
  auth: AuthSlice,
  setpass: SetPasswordSlice,
  genpolicy: GeneratePolicySlice,
  salesdetail: SalesDetailSlice,
  uploadexcel: UploadExcelSlice,
  invoicelist: InvoiceListSlice,
  token: FetchTokenSlice,
  updatecompany: UpdateCompanySlice,
  insertpolicy: PolicyInsertSlice,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["register", "rehydrate"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }), // Correctly setting middleware,
});

export const persistor = persistStore(store);
