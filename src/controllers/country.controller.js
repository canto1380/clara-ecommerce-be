import Country from "../models/country.model.js"

export const createCountry = async(req, res) => {
  try {
    const body = req.body
    const newCountry = new Country(body)
    await newCountry.save()
    res.status(201).json({message: 'Country added successfully'})
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allCountry = async(req, res) => {
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
      nameCountry: regex
    }
    const countCountries = await Country.countDocuments()

    const allCountries = await Country.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])

    const foundRegisters = await Country.countDocuments()

    res.status(200).json({
      allCountries,
      totalRegister: countCountries,
      foundRegisters,
      totalPages: Math.ceil( foundRegisters/limit ),
      currentPage: page
    })
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const verifyIdExist =(id) => {
  const country = Country.findOne({_id: id})
  return country
}

export const verifyNameExist = async(nameCountry) => {
  const country = nameCountry[0].toUpperCase() + nameCountry.slice(1)
  const verifyExist = await Country.findOne({nameCountry: country})
  return verifyExist
}

export const countryById = async(req, res) => {
  try {
    const {id} = req.params
    const country = await Country.findById(id)
    res.status(200).json(country)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const countryNotDeleted = async(req, res) => {
  try {
    const countriesNotDeleted = await Country.find({deleted: false})
    res.status(200).json(countriesNotDeleted)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const updateCountry = async(req, res) => {
  try {
    const {id} = req.params
    const body = req.body
    const countryUpdated = await Country.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Country updated successfully', countryUpdated})
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const deleteCountry = async(req, res) => {
  try {
    const {id} = req.params
    const country = await Country.findById(id)
    country.deleted = true
    country.save()
    res.status(200).json({message: 'Country deleted successfully'})
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const restoreCountry = async(req, res) => {
  try {
    const {id} = req.params
    const country = await Country.findById(id)
    country.deleted = false
    country.save()
    res.status(200).json({message: 'Country restored successfully'})
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
