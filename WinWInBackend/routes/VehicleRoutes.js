// Purpose of this snippet: To handle the phone operator related operations.

// ---------------------------Importing Packages-------------------------- //
const express = require("express");
const VehicleController = require("../controllers/VehicleController");
const router = express.Router();

// ----------------------------------------------------------------------- //

// ------------------- Routes for Vehicle ---------------- //
router.post("/create-vehicle", VehicleController.createVehicle);
router.get("/all-vehicles", VehicleController.getAllVehicles);
router.post("/get-vehicle/:id", VehicleController.getVehicleById);
router.get("/update-vehicle/:id", VehicleController.updateVehicle);
router.get("/get-vehicle-details/:vehicleNumber", VehicleController.getVehicleByNumber);
router.post('/get-vehicles-by-driver', VehicleController.getVehicleDetailsByDriverId);
router.put("/delete-vehicle/:id", VehicleController.deleteVehicle);
router.put("/update-vehicle-status/:id", VehicleController.updateVehicleStatus);
router.post("/get-all-vehicle-types", VehicleController.getAllVehicleTypes);
router.post("/get-vehicle-details", VehicleController.getVehicleDetails);


// ------------------------------------------------------ //

//------------------Export module----------------//

module.exports = router;