import FootwearType from "../models/footwearType.model.js";

export const createFootwearType = async (req, res) => {
  try {
    const body = req.body;
    const newFootwearType = new FootwearType(body);
    await newFootwearType.save();
    res.status(200).json(newFootwearType)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const allFootwearType = async (req, res) => {
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
      nameType: regex,
    };
    const countFootwearType = await FootwearType.countDocuments();

    const allFootwearType = await FootwearType.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
      // .populate({ path: "idUser" })
      // .populate({ path: 'idLocation', populate: {path: 'idProvince', populate: {path: 'idCountry'}}});
    const foundRegisters = allFootwearType.length

    res.status(200).json({
      allFootwearType,
      totalRegister: countFootwearType,
      foundRegisters,
      totalPages: Math.ceil( countFootwearType/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const footwearTypeById = async (req, res) => {
  try {
    const {id} = req.params
    const footwearType = await FootwearType.findById(id)
    res.status(200).json(footwearType)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
export const verifyIdExistsFootwearType = (id) => {
  const footwearType = FootwearType.findOne({_id: id})
  return footwearType
}
export const verifyNameExistsFootwearType = async(nameType) => {
  const footwearType = nameType[0].toUpperCase() + nameType.slice(1)
  const verifyExist = await FootwearType.findOne({nameType: footwearType})
  return verifyExist
}

export const updateFootwearType = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const footwearTypeUpdated = await FootwearType.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Footwear Type updated successfully', footwearTypeUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteFootwearType = async (req, res) => {
  try {
    const {id} = req.params
    const footwearType = await FootwearType.findById(id)
    footwearType.deleted = true
    footwearType.save()
    res.status(200).json({meesage: 'Footwear Type deleted successfully'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreFootwearType = async (req, res) => {
  try {
    const {id} = req.params
    const footwearType = await FootwearType.findById(id)
    footwearType.deleted = false
    footwearType.save()
    res.status(200).json({meesage: 'Footwear Type restored successfully'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
