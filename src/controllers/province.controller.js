import Province from "../models/province.model.js";

export const createProvince = async(req, res) => {
  try {
    const body = req.body
    const newProvince = new Province(body)
    await newProvince.save()
    res.status(201).json({message: 'Province added successfully'})
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
export const allProvinces = async (req, res) => {
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
      nameProvince: regex
    };
    const countProvinces = await Province.countDocuments();

    const allProvince = await Province.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
      .populate({ path: "idCountry" });
    const foundRegisters = allProvince.length

    res.status(200).json({
      allProvince,
      totalRegister: countProvinces,
      foundRegisters,
      totalPages: Math.ceil( foundRegisters/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const provinceById = async (req, res) => {
  try {
    const { id } = req.params;
    const province = await Province.findById(id);
    res.status(200).json(province);
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistProvince = (id) => {
  const province = Province.findOne({ _id: id})
  return province
}

export const verifyNameExistProvince = async(nameProvince) => {
  const province = nameProvince[0].toUpperCase() + nameProvince.slice(1)
  const verifyExist = await Province.findOne({nameProvince: province})
  return verifyExist
}

export const ProvinceNotDeleted = async(req, res) => {
  try {
    const provincesNotDeleted = await Province.find({deleted: false})
    res.status(200).json(provincesNotDeleted)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const updateProvince = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const provinceUpdated = await Province.findByIdAndUpdate(id, body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Province updated successfully", provinceUpdated });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteProvince = async(req, res) => {
  try {
    const {id} = req.params
    const province = await Province.findById(id)
    province.deleted = true
    province.save()
    res.status(200).json({message: 'Province deleted successfully'})
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const restoreProvince = async(req, res) => {
  try {
    const {id} = req.params
    const province = await Province.findById(id)
    province.deleted = false
    province.save()
    res.status(200).json({message: 'Province restored successfully'})
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
