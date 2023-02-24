import Branch from "../models/branch.model.js";
import Footwear from "../models/footwear.model.js";
import FootwearBranch from "../models/productBranch.model.js";
import { verifyIdDiscountExist } from "./discount.controller.js";
import { returnBranch } from "./branch.controller.js";
import { updateFootwearBranch } from "./footwearBranch.controller.js";

export const createFootwear = async (req, res) => {
  try {
    const body = req.body;
    const newFootwear = new Footwear(body);
    if (body.idDiscount) {
      const discount = await verifyIdDiscountExist(body.idDiscount);
      newFootwear.discountedPrice =
        body.priceOriginal * discount.discountPercentage;
      newFootwear.totalWithDiscount =
        body.priceOriginal - body.priceOriginal * discount.discountPercentage;
      await newFootwear.save();
    } else {
      newFootwear.totalWithDiscount = body.priceOriginal;
      await newFootwear.save();
    }
    res.status(200).json(newFootwear);
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const footwearNews = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 1000,
      order = 0,
      filterSearch,
      filterColor,
      filterSize,
      deleted = false,
    } = req.query;

    let filterOrder;
    switch (parseInt(order)) {
      case 0:
        filterOrder = { createdAt: "desc" };
        break;
      case 1:
        filterOrder = { totalWithDiscount: "desc" };
        break;
      case 2:
        filterOrder = { totalWithDiscount: "asc" };
        break;
      case 3:
        filterOrder = { nameFootwear: "asc" };
        break;
      case 4:
        filterOrder = { nameFootwear: "desc" };
        break;
      default:
        filterOrder = { createdAt: "desc" };
        break;
    }
    let filters = { deleted };
    console.log(typeof filterSize)
    if (filterSearch && filterSearch === "new")
      filters = { ...filters, new: true };
    if (filterSearch && filterSearch === "featured")
      filters = { ...filters, featured: true };

    if (filterColor && filterColor !== "")
      filters = { ...filters, idColor: filterColor };
    if (filterColor && filterColor.length) {
      const listColor = filterColor.split(",");
      filters = { ...filters, idColor: { $in: listColor } };
    }
    if (filterSize && filterSize !== "")
      filters = { ...filters, size: filterSize };
    if (filterSize && filterSize.length) {
      const listSize = filterSize.split(",");
      filters = { ...filters, size: { $in: listSize } };
    }
    const allFootwear = await Footwear.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(filterOrder)
      .populate({ path: "idFootwearType" })
      .populate({ path: "idDiscount" })
      .populate({ path: "idColor" });

    const countFootwear = allFootwear.length;

    res.status(200).json({
      allFootwear,
      totalRegister: countFootwear,
      totalPages: Math.ceil(countFootwear / limit),
      currentPage: page,
    });
  } catch (error) {}
};

export const footwearByType = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 1000,
      order = 0,
      sortBy = "",
      filterColor,
      filterSize,
      filterMaterial,
      deleted = false,
    } = req.query;

    const { nameType } = req.params;
    let filterOrder;
    switch (parseInt(order)) {
      case 0:
        filterOrder = { createdAt: "desc" };
        break;
      case 1:
        filterOrder = { totalWithDiscount: "desc" };
        break;
      case 2:
        filterOrder = { totalWithDiscount: "asc" };
        break;
      case 3:
        filterOrder = { nameFootwear: "desc" };
        break;
      case 4:
        filterOrder = { nameFootwear: "asc" };
        break;
      default:
        filterOrder = { createdAt: "desc" };
        break;
    }
    let filters = { deleted };

    if (filterColor && filterColor !== "")
      filters = { ...filters, idColor: filterColor };
    if (filterColor && filterColor.length) {
      const filterColorString = filterColor.toString();
      const listColor = filterColorString.split(",");
      filters = { ...filters, idColor: { $in: listColor } };
    }
    if (filterSize && filterSize !== "")
      filters = { ...filters, size: filterSize };
    if (filterSize && filterSize.length) {
      const filterSizeString = filterSize.toString();
      const listSize = filterSizeString.split(",");
      filters = { ...filters, size: { $in: listSize } };
    }

    const allFootwear = await Footwear.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(filterOrder)
      .populate({ path: "idFootwearType" })
      .populate({ path: "idDiscount" })
      .populate({ path: "idColor" });

    let footwearByType = allFootwear;
    if (nameType && nameType !== "") {
      footwearByType = allFootwear.filter(
        (footwear) => footwear.idFootwearType.nameType === nameType
      );
    }
    const countFootwear = footwearByType.length;

    res.status(200).json({
      footwearByType,
      totalRegister: countFootwear,
      totalPages: Math.ceil(countFootwear / limit),
      currentPage: page,
    });
  } catch (error) {}
};
export const allFootwear = async (req, res) => {
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
      nameFootwear: regex,
    };
    const countFootwear = await Footwear.countDocuments();

    const allFootwear = await Footwear.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
      .populate({ path: "idFootwearType" })
      .populate({ path: "idDiscount" });
    // .populate({ path: 'idLocation', populate: {path: 'idProvince', populate: {path: 'idCountry'}}});
    const foundRegisters = allFootwear.length;

    res.status(200).json({
      allFootwear,
      totalRegister: countFootwear,
      foundRegisters,
      totalPages: Math.ceil(countFootwear / limit),
      currentPage: page,
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const footwearById = async (req, res) => {
  try {
    const { id } = req.params;
    const footwear = await Footwear.findById(id)
      .populate({ path: "idFootwearType" })
      .populate({ path: "idDiscount" });
    res.status(200).json(footwear);
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
export const footwearByName = async (req, res) => {
  try {
    const { nameFootwear } = req.params;
    console.log(nameFootwear)
    let filters = {
      deleted: false,
      nameFootwear,
    };
    const footwear = await Footwear.find(filters)
      .populate({ path: "idFootwearType" })
      .populate({ path: "idDiscount" });
    res.status(200).json(footwear);
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsFootwear = (id) => {
  const footwear = Footwear.findOne({ _id: id });
  return footwear;
};
export const verifyNameExistsFootwear = async (nameFootwear) => {
  const footwear = nameFootwear[0].toUpperCase() + nameFootwear.slice(1);
  const verifyExist = await Footwear.findOne({ nameFootwear: footwear });
  return verifyExist;
};

export const verifyItemCode = async (itemCode) => {
  const footwear = await Footwear.findOne({ itemCode: itemCode });
  return footwear;
};

export const updateFootwear = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const footwearUpdated = await Footwear.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (body.idDiscount) {
      const discount = await verifyIdDiscountExist(body.idDiscount);
      footwearUpdated.discountedPrice =
        body.priceOriginal * discount.discountPercentage;
      footwearUpdated.totalWithDiscount =
        body.priceOriginal - body.priceOriginal * discount.discountPercentage;
      await footwearUpdated.save();
    } else {
      footwearUpdated.discountedPrice = 0;
      footwearUpdated.totalWithDiscount = 0;
      await footwearUpdated.save();
    }
    if (body.idDiscount || body.priceOriginal || body.stock) {
      await updateFootwearBranch(body, id);
    }

    res
      .status(200)
      .json({ message: "Footwear updated successfully", footwearUpdated });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteFootwear = async (req, res) => {
  try {
    const { id } = req.params;
    const footwear = await Footwear.findById(id);
    footwear.deleted = true;
    footwear.save();
    res.status(200).json({ meesage: "Footwear deleted successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreFootwear = async (req, res) => {
  try {
    const { id } = req.params;
    const footwear = await Footwear.findById(id);
    footwear.deleted = false;
    footwear.save();
    res.status(200).json({ meesage: "Footwear restored successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
