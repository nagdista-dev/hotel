import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
// 10 20 |  11 14
// !Start Building;
const checkAvailability = async ({
  checkInSearch,
  checkOutSearch,
  roomSearch,
}) => {
  try {
    const bookings = await Booking.find({
      room: roomSearch,
      checkOutData: { $gte: checkInSearch },
      checkInData: { $lte: checkOutSearch },
    });
    const isAvailable = bookings.length === 0;

    return isAvailable;
  } catch (error) {
    console.log(error.message);
  }
};

// !API To Check Available;
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      room,
      checkInDate,
      checkOutDate,
    });

    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// !API To Create Booking
export const createBooking = async (req, res) => {
  try {
    const { room, checkInData, checkOutData, guests } = req.body;
    const user = req.user._id;
    // !Check ava
    const isAvailable = await checkAvailability({
      checkInSearch: checkInData,
      checkOutSearch: checkOutData,
      roomSearch: room,
    });

    if (!isAvailable) {
      return res.json({ success: true, message: "Room is not available" });
    }
    // !Total Price
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;
    const checkIn = new Date(checkInData);
    const checkOut = new Date(checkOutData);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice *= nights;
    // !Booking
    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInData,
      checkOutData,
      totalPrice,
    });
    //   !Response
    res.json({ success: true, message: "Booking Created Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// !Get All Booking For One User
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = (
      await Booking.find({ user }).populate("room hotel")
    ).toSorted({ createdAt: -1 });
    //   !Response
    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// !Get All Booking For One User
export const getHotelBookings = async (req, res) => {
  try {
    const hotel = Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ success: true, message: "No Hotel Found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    //   !Total
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );
    //   !Response
    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
