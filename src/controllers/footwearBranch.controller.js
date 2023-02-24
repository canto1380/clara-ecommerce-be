import FootwearBranch from "../models/productBranch.model.js";
import { returnBranch } from "./branch.controller.js";

export const addStockBranch = async (req, res) => {
  try {
    const { priceOriginal, idDiscount, stock } = req.body;
    const { idFootwear } = req.params;
    const branchId = await returnBranch();
    const footwearBranch = await FootwearBranch.findOne({
      idFootwear: idFootwear,
      idBranch: branchId._id,
    });
    if (footwearBranch) {
      return res.status(400).json({
        message: "The footwear already exists registered in said branch",
      });
    } else {
      const newStockBranch = {
        idFootwear,
        idBranch: branchId._id,
        priceOriginal,
        idDiscount,
        stock,
      };
      const stockBranchSave = new FootwearBranch(newStockBranch);
      await stockBranchSave.save();
      res.status(200).json({ message: "Aggregate stock", stockBranchSave });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
export const updateFootwearBranch = async (body, id) => {
  try {
    const fieldUpdate = {
      stock: body?.stock,
      priceOriginal: body?.priceOriginal,
      idDiscount: body?.idDiscount,
    };
    const branchId = await returnBranch();
    const updatedFootwearBranch = await FootwearBranch.findOneAndUpdate(
      { idFootwear: id, idBranch: branchId._id },
      fieldUpdate,
      { new: true }
    );
    await updatedFootwearBranch.save()
  } catch (error) {
    return {message: 'Error', success: false}
  }
};
