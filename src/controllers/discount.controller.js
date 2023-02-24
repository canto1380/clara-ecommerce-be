import Discount from "../models/discount.model.js";

export const createDiscount = async (req, res) => {
  try {
    const body = req.body;
    const newDiscount = new Discount(body);
    await newDiscount.save();
    res.status(200).json(newDiscount);
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};
export const getAllDiscount = async (req, res) => {
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
      descriptionDiscont: regex,
    };
    const countDiscount = await Discount.countDocuments();

    const allDiscount = await Discount.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]]);
    const foundRegisters = allDiscount.length;

    res.status(200).json({
      allDiscount,
      totalRegister: countDiscount,
      foundRegisters,
      totalPages: Math.ceil(countDiscount / limit),
      currentPage: page,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};
export const getByIdDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const discount = await Discount.findById(id);
    res.status(200).json(discount);
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};
export const verifyIdDiscountExist = async (id) => {
  const discount = Discount.findOne({ _id: id });
  return discount;
};
export const updateDiscount = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const discountUpdated = await Discount.findByIdAndUpdate(id, body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Discount updated successfully", discountUpdated });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};
export const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const discount = await Discount.findById(id);
    discount.deleted = true;
    discount.save();
    res.status(200).json({ meesage: "Discount deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};
export const restoreDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const discount = await Discount.findById(id);
    discount.deleted = false;
    discount.save();
    res.status(200).json({ meesage: "Discount restore successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};
