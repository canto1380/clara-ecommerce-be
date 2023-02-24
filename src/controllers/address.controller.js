import Address from "../models/address.model.js";

export const createAddress = async (req, res) => {
  try {
    const body = req.body;
    const newAddress = new Address(body);
    await newAddress.save();
    res.status(201).json({ message: "Address added susccessfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const allAddress = async (req, res) => {
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
    };
    const countAddress = await Address.countDocuments();

    const allAddress = await Address.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
      .populate({ path: "idUser" })
      .populate({ path: 'idLocation', populate: {path: 'idProvince', populate: {path: 'idCountry'}}});
    const foundRegisters = allAddress.length

    res.status(200).json({
      allAddress,
      totalRegister: countAddress,
      foundRegisters,
      totalPages: Math.ceil( countAddress/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const addressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);
    res.status(200).json(address);
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdAddressExists = (id) => {
  const address = Address.findOne({_id: id})
  return address
}

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const addressUpdated = await Address.findByIdAndUpdate(id, body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Address updated successfully", addressUpdated });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findByIdAndDelete(id);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
