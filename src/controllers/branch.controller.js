import Branch from "../models/branch.model.js";

export const returnBranch = async(id) => {
  if(id === null || id === undefined) {
    const branch = await Branch.findOne({_id: '6375a30f978b471560ff9e29'})
    return branch
  } else {
    const branch = await Branch.findOne({_id: id})
    return branch
  }
}

export const createBranch = async (req, res) => {
  try {
    const body = req.body;
    const newBranch = new Branch(body);
    await newBranch.save();
    res.status(200).json(newBranch)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const allBranch = async (req, res) => {
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
      nameBranch: regex,
    };
    const countBranch = await Branch.countDocuments();

    const allBranch = await Branch.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
      .populate({ path: "idAddress" })
      // .populate({ path: 'idLocation', populate: {path: 'idProvince', populate: {path: 'idCountry'}}});
    const foundRegisters = allBranch.length

    res.status(200).json({
      allBranch,
      totalRegister: countBranch,
      foundRegisters,
      totalPages: Math.ceil( countBranch/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const branchById = async (req, res) => {
  try {
    const {id} = req.params
    const branch = await Branch.findById(id)
    res.status(200).json(branch)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
export const verifyIdExistsBranch = (id) => {
  const branch = Branch.findOne({_id: id})
  return branch
}
export const verifyNameExistsBranch = async(nameBranch) => {
  const branch = nameBranch[0].toUpperCase() + nameBranch.slice(1)
  const verifyExist = await Branch.findOne({nameBranch: branch})
  return verifyExist
}

export const updateBranch = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const branchUpdated = await Branch.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Branch updated successfully', branchUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteBranch = async (req, res) => {
  try {
    const {id} = req.params
    const branch = await Branch.findById(id)
    branch.deleted = true
    branch.save()
    res.status(200).json({meesage: 'Branch deleted successfully'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreBranch = async (req, res) => {
  try {
    const {id} = req.params
    const branch = await Branch.findById(id)
    branch.deleted = false
    branch.save()
    res.status(200).json({meesage: 'Branch restore successfully'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
