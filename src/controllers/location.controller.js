import Location from "../models/location.model.js";

export const createLocation = async (req, res) => {
  try {
    const body = req.body;
    const newLocation = new Location(body);
    await newLocation.save();
    res.status(201).json({ message: "Location added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const allLocation = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      order = "",
      sortBy = "",
      deleted = false,
    } = req.query;
    let orderSearch = order ? order : "desc";
    let sortBySearch = sortBy ? sortBy : "createdAt";
    const regex = new RegExp(search, "i");

    let filters = {
      deleted,
      nameLocation: regex,
    };
    const countLocations = await Location.countDocuments();

    const allLocation = await Location.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
      .populate({ path: "idProvince", populate: { path: "idCountry" } });

    const foundRegisters = await Location.countDocuments();

    res.status(200).json({
      allLocation,
      totalRegister: countLocations,
      foundRegisters,
      totalPages: Math.ceil(foundRegisters / limit),
      currentPage: page,
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const locationById = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id).populate({
      path: "idProvince",
      populate: { path: "idCountry" },
    });
    res.status(200).json(location);
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistLocation = (id) => {
  const location = Location.findOne({ _id: id });
  return location
};

export const verifyNameExistLocation = async(nameLocation) => {
  const location = nameLocation[0].toUpperCase() + nameLocation.slice(1)
  const verifyExist = await Location.findOne({nameLocation: nameLocation})
  return verifyExist
}

export const locationNotDeleted = async (req, res) => {
  try {
    const locationNotDeleted = await Location.find({ deleted: false });
    res.status(200).json(locationNotDeleted);
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const locationUpdated = await Location.findByIdAndUpdate(id, body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Location updated successfully", locationUpdated });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);
    location.deleted = true;
    location.save();
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);
    location.deleted = false;
    location.save();
    res.status(200).json({ message: "Location restored successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
