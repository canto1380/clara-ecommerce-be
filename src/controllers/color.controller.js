import ColorFootwear from "../models/color.model.js";

export const createColor = async (req, res) => {
  try {
    const body = req.body;
    const newColor = new ColorFootwear(body);
    await newColor.save();
    res.status(201).json({ message: "ColorFootwear added susccessfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
export const allColorFootwear = async (req, res) => {
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
      colorName: regex,
    };
    const countColorFootwear = await ColorFootwear.countDocuments();

    const allColorFootwear = await ColorFootwear.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]]);
    const foundRegisters = allColorFootwear.length;

    res.status(200).json({
      allColorFootwear,
      totalRegister: countColorFootwear,
      foundRegisters,
      totalPages: Math.ceil(countColorFootwear / limit),
      currentPage: page,
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const colorById = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await ColorFootwear.findById(id);
    res.status(200).json(color);
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdcolorFootwearExists = (id) => {
  const color = colorFootwear.findOne({ _id: id });
  return color;
};

export const updatecolorFootwear = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const colorUpdated = await ColorFootwear.findByIdAndUpdate(id, body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Color updated successfully", colorUpdated });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteColorFootwear = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await ColorFootwear.findById(id);
    color.deleted = true;
    color.save();
    res.status(200).json({ message: "Color deleted successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreColorFootwear = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await ColorFootwear.findById(id);
    color.deleted = false;
    color.save();
    res.status(200).json({ message: "Color restored successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
