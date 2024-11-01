//---------------------------Importing Packages--------------------------//
const ResponseService = require("../services/ResponseService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../services/db");

//-----------------------------------------------------------------------//

// ------------------------------ Login ---------------------------------//
const login = async (email) => {
  // Check if the user exists
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: {
      id: existingUser.id,
      email: existingUser.email,
      fullName: existingUser.fullName,
    },
  };
};

// ------------------------------ Get User By email ----------------------//
const getUserByEmail = async (email) => {
  try {
    const user = await db.drivers.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  } catch (err) {
    console.error("Error fetching user: ", err);
  }
};

// --------------------------- Update Driver Status ----------------------//
const updateDriverStatus = async (driverId, status) => {
  try {
    await db.drivers.update({
      where: {
        id: parseInt(driverId, 10), // Ensure driverId is an integer
      },
      data: {
        status: status,
      },
    });
  } catch (err) {
    console.error("Error updating driver status: ", err);
    throw err; // Rethrow to catch in controller
  }
};

// ----------------------------------------------------------------------//

//---------------------------Register a driver---------------//
const registerDriver = async (
  email,
  password,
  username,
  nic,
  phone

) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new Error("Driver already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new driver document
    await db.drivers.create({
      data: {
        email: email,
        username: username,
        nic: nic,
        phone: phone,
        password: hashedPassword,
        isEmailVerified: false,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: driver.id, email: email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return ResponseService(res, 200, {
      token,
      user: {
        id: driver._id,
        email: driver.email,
        fullName: driver.fullName,
      },
    });
  } catch (err) {
    console.error("Error registering driver: ", err);
  }
};

//------------------------------Win Win----------------------------//

//------------------------------Get Driver by Vehicle ID -------------------------------//
const getDriverbyVehicleID = async (vehicleID) => {
  try {
      const vehicleDetails = await db.vehicle.findUnique({
          where: { id: vehicleID },
      });
      return vehicleDetails;
  } catch (err) {
      console.error("Error getting driver by vehicle ID: ", err);
      throw err; // Rethrow error for handling in addRide
  }
};

//------------------------------Add a Ride ---------------------------------//
const addRide = async (addingData) => {
  const vehicle = await getDriverbyVehicleID(parseInt(addingData.vehicleId));
  try {
      const newRide = await db.rides.create({
          data: {
              driverId: parseInt(addingData.driverId),
              pickupLocation: addingData.currentPlaceName,
              dropLocation: addingData.destination,
              distance: addingData.distance,
              duration: addingData.duration,
              vehicleId: parseInt(vehicle.id),
          },
      });
      return { success: true, addingId: newRide.id };
  } catch (error) {
      console.error("Error adding the ride:", error);
      return { success: false, error };
  }
};

// ----------------------------------new update ------------------------------------//

// Middleware to verify token and attach driver to req.user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get token from 'Bearer <token>'

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token" });
    }

    req.driver = user; // Attach the decoded token (user info) to the request
    next();
  });
};

//-------------------------get driver profile details-------------------------//

const getDriverProfile = async (driverId) => {
  try {
    const driver = await db.drivers.findUnique({
      where: {
        id: parseInt(driverId),
      },
    });
    return driver;
  } catch (err) {
    console.error("Error fetching driver profile: ", err);
  }
};

//---------------------------get Vehicle Details-----------------------------------//
const getVehicleDetails = async (vehicleId) => {
  try {
    const vehicle = await db.vehicle.findUnique({
      where: {
        id: parseInt(vehicleId),
      },
    });
  } catch (err) {
    console.error("Error fetching vehicle details: ", err);
  }
};

//----------------------------------------get ride list----------------------------------//
const getRideList = async () => {
  try {
    const list = await db.rides.findMany({
      include: {
        passenger: {
          select: {
            fullName: true,
            email: true,
          },
        },
        driver: {
          select: {
            fullName: true,
            phone: true,
          },
        },
        vehicle: {
          select: {
            vehicleType: true,
            vehicleModel: true,
            vehicleNumber: true,
          },
        },
      },
    });
    return list;
  } catch (err) {
    console.error("Error fetching rides: ", err);
    return [];
  }
};
// -------------------------------------------------------------------------------------------------

//---------------------------------update ride status----------------------------------------------//
const updateRideStatus = async (rideId, status) => {
  try {
    // Validate the ride ID and status
    if (!rideId || !status) {
      throw new Error("Ride ID and status are required");
    }

    const updatedRide = await db.rides.update({
      where: {
        id: rideId,
      },
      data: {
        status: status,
      },
    });
    return updatedRide;
  } catch (err) {
    console.error("Error updating ride status: ", err);
    throw err; // Re-throw to be caught in the controller
  }
};

//-----------------------------------------------------------------------------------------------//

// ---------------------------------------------- Get total count ---------------------------------------//
const getTotalCount = async (driverId) => {
  try {
    const totalRides = await db.rides.count({
      where: {
        driverId: parseInt(driverId),
      },
    });

    return totalRides;
  } catch (ex) {
    console.error("Error fetching total count: ", ex);
  }
};
// -------------------------------------------------------------------------------------------------

//  ------------------------------------------ Get total earnings by id ----------------------------
const getTotalEarnings = async (driverId) => {
  try {
    // Fetch pending rides
    const pendingRides = await db.rides.findMany({
      select: {
        cost: true,
      },
      where: {
        driverId: parseInt(driverId),
        status: "pending",
      },
    });

    // Calculate total earnings from pending rides
    const pendingEarnings = pendingRides.reduce((total, ride) => {
      const rideCost = parseFloat(ride.cost);
      return total + (isNaN(rideCost) ? 0 : rideCost);
    }, 0);

    // Fetch completed rides
    const completedRides = await db.rides.findMany({
      select: {
        cost: true,
      },
      where: {
        driverId: parseInt(driverId),
        status: "completed",
      },
    });

 // Calculate total earnings from completed rides
 const completedEarnings = completedRides.reduce((total, ride) => {
  const rideCostStr = ride.cost.replace(/,/g, ''); // Remove commas
  const rideCost = parseFloat(rideCostStr); // Convert to float
  return total + (isNaN(rideCost) ? 0 : rideCost);
}, 0);

    // Return total earnings (completed)
    const totalEarnings =  completedEarnings;
    return totalEarnings;

  } catch (err) {
    console.error("ERROR " + err.message);
    return null;
  }
};

// ------------------------------------------------------

// ------------------------------------------- Administrator functions -----------------------------------//
const getTotalDriverCount = async () => {
  try {
    const totalDrivers = await db.drivers.count();
    return totalDrivers;
  } catch (err) {
    console.error("Error fetching total driver count: ", err);
  }
};

const getTotalVehicleCount = async () => {
  try {
    const totalVehicles = await db.vehicle.count();
    return totalVehicles;
  } catch (err) {
    console.error("Error fetching total vehicle count: ", err);
  }
};

// ---------------- Export the modules ------------------
module.exports = {
  getUserByEmail,
  registerDriver,
  addRide,
  getDriverbyVehicleID,
  login,
  getDriverProfile,
  authenticateToken,
  updateDriverStatus,
  getTotalDriverCount,
  getRideList,
  getTotalCount,
  getTotalVehicleCount,
  getTotalEarnings,
  updateRideStatus,
  getVehicleDetails,
};

// ------------------------------------------------------
