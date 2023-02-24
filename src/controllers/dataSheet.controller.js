import DataSheet from "../models/dataSheet.model.js";

export const createDataSheet = async(req, res) => {
  try {
    const body = req.body;
    const newDataSheet = new DataSheet(body);
    await newDataSheet.save()
    res.status(200).json(newDataSheet);
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
export const getAllDataSheet = async(req, res) => {
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
    const countDatSheet = await DataSheet.countDocuments();

    const allDataSheet = await DataSheet.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
      .populate({ path: "idFootwear" });
    const foundRegisters = allDataSheet.length;

    res.status(200).json({
      allDataSheet,
      totalRegister: countDatSheet,
      foundRegisters,
      totalPages: Math.ceil(countDatSheet / limit),
      currentPage: page,
    });
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
export const getByIdDataSheet = async(req, res) => {
  try {
    const { id } = req.params;
    const dataSheet = await DataSheet.findById(id)
      .populate({ path: "idFootwear" })
      .populate({ path: "idDiscount" });
    res.status(200).json(dataSheet);
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
export const verifyExistsDataSheet = async(id) => {
    const dataSheet = DataSheet.findOne({_id: id})
    return dataSheet
}
export const updateDataSheet = async(req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const dataSheetUpdated = await DataSheet.findByIdAndUpdate(id, body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "DataSheet updated successfully", dataSheetUpdated });
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
export const deleteDataSheet = async(req, res) => {
  try {
    const { id } = req.params;
    const dataSheet = await DataSheet.findById(id);
    dataSheet.deleted = true;
    dataSheet.save();
    res.status(200).json({ meesage: "DataSheet deleted successfully" });
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
export const restoreDataSheet = async(req, res) => {
  try {
    const { id } = req.params;
    const dataSheet = await DataSheet.findById(id);
    dataSheet.deleted = false;
    dataSheet.save();
    res.status(200).json({ meesage: "DataSheet restored successfully" });
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
