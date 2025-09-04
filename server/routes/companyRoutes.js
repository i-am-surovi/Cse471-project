import express from "express";
import {
  ChangeJobApplicationsStatus,
  changeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";
const router = express.Router();

//Register a company
router.post("/register", upload.single("image"), registerCompany);

//Company Login
router.post("/login", loginCompany);

//Get Company data
router.get("/company", protectCompany, getCompanyData);

//Post a job
router.post("/post-job", protectCompany, postJob);

//Get applicants data of comapny
router.get("/applicants", protectCompany, getCompanyJobApplicants);

//Getcompany joblist
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);

//change apllication status
router.post("/change-status", protectCompany, ChangeJobApplicationsStatus);

//change applications visibility
router.post("/change-visiblity", protectCompany, changeVisiblity);

export default router;
