import User from "../models/user.model.js";
import bcrypt from "bcrypt";


export const allUser = async(req, res) => {
  try {
    const allUser = await User.find()
    res.status(200).json(allUser)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
export const userList = async (req, res) => {
  try {
    const { page = 1, limit = 30, search = '', order = '', sortBy = '', deleted=false } = req.query
    let orderSearch = order ? order : 'desc'
    let sortybySearch = sortBy ? sortBy : 'createdAt'
    const regex = new RegExp(search, 'i')
    let filters = {
      deleted,
      email: regex,
    }
    const countUser = await User.countDocuments()
    User.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortybySearch, orderSearch]])
      .exec((err, users) => {

        const foundRegisters = users.length
        if (err) {
          return res.status(400).send({ message: err });
        } else {
          res.status(200).json({
            users,
            totalRegisters: countUser,
            foundRegisters,
            totalPages: Math.ceil( foundRegisters/ limit),
            currentPage: page
          });
        }
      })
  } catch (error) {
    return res.status(404).send({error: error.message, success: false});
  }
};

export const createUser = async (req, res) => {
  try {
    const body = req.body;
    const newUser = new User(body);
    // newUser.idAddress = body.idAddress

    const passExpiration =new Date()
    passExpiration.setDate(passExpiration.getDate() + 60)
    newUser.passExpiration = passExpiration

    const email = body.email
    const nickname = email.split('@')
    switch(nickname[1]) {
      case 'gmail.com' :
        newUser.nickname = nickname[0]
        break;
      case 'hotmail.com' :
        newUser.nickname = nickname[0] + '.'
        break;
      default:
        newUser.nickname = nickname[0] + '-'
        break;
    }
    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(404).send({error: error.message, success: false});
  }
};

export const userById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(404).send({error: error.message, success: false});
  }
};

export const userByNickname = async(req, res) => {
  try {
    const {nickname} = req.params
    const user = await User.findOne({nickname})
    res.status(200).json(user)
  } catch (error) {
    res.status(404).send({error: error.message, success: false})
  }
}

export const verifyExists = (email) =>  {
  const user = User.findOne({email: email})
  return user
}
export const verifyIdExist = (id) => {
  const user = User.findOne({_id: id})
  return user
}

export const findByCredential = async (email, password) => {
  try {
    const error = "";
    const user = await User.findOne({ email });
    if (!user)
      return { error: 'Error en el email ingresado' };

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      updateIncorrectPass(email, password)
      return { error: 'Error en la clave ingresada' };
    }

    return user;
  } catch (error) {
    res.status(404).send({error: error.message, success: false});
  }
};

export const updateIncorrectPass = async(email, lastPassIncorrect) => {
  const userSearch = await User.findOne({ email })
  userSearch.counterPassIncorrect += 1
  userSearch.lastPassIncorrect = lastPassIncorrect
  userSearch.save()
}

export const updateLastSession = async(email, lastSession) => {
  const userSearch = await User.findOne({ email })
  userSearch.lastSession = lastSession
  userSearch.counterPassIncorrect = 0
  userSearch.save()
}

export const updateUser = async (req, res) => {
  try {
    const body = req.body
    const { id } = req.params
    const userUpdated = await User.findByIdAndUpdate(id, body, {new: true})

    const email = body.email
    const nickname = email.split('@')
    switch(nickname[1]) {
      case 'gmail.com' :
        userUpdated.nickname = nickname[0]
        break;
      case 'hotmail.com' :
        userUpdated.nickname = nickname[0] + '.'
        break;
      default:
        userUpdated.nickname = nickname[0] + '-'
        break;
    }

    await userUpdated.save()
    res.status(200).json({message: 'User updated successfuly', userUpdated})
  } catch (error) {
    res.status(404).send({error: error.message, success: false});
  }
};

export const updatePass = async(req, res) => {
  try {
    const body = req.body
    const {id} = req.params
    const user = await User.findOne({_id: id})

    const isMatchPass = await bcrypt.compare(body.passwordOld, user.password)
    if(!isMatchPass) {
      return res.status(400).json({ error: 'La clave actual no es correcta' })
    } else {
      if(body.password) body.password = await bcrypt.hash(body.password, 8);

      const passUpdated = await User.findByIdAndUpdate(id, body, {new: true})
      const passExpiration =new Date()
      passExpiration.setDate(passExpiration.getDate() + 60)
      passUpdated.passExpiration = passExpiration
      await passUpdated.save()
      res.status(200).json({message: 'Pass updated successfully'})
    }


  } catch (error) {
    res.status(400).send({error: error.message, success: false})
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const userDeleting = await User.findById(id)
    userDeleting.deleted = true
    userDeleting.save()
    res.status(200).json({message: 'User deleted'})
  } catch (error) {
    res.status(404).send({error: error.message, success: false});
  }
};

export const restaurarUser = async (req, res) => {
  try {
    const { id } = req.params
    const userRestoring = await User.findById(id)
    userRestoring.deleted = false
    userRestoring.save()
    res.status(200).json({message: 'Restored user'})
  } catch (error) {
    res.status(404).send({error: error.message, success: false});
  }
};

export const passwordUpdate = async(req, res) => {
  try {
    const body = req.body
  } catch (error) {
    res.tatus(404).send({error: error.message, success: false})
  }
}
