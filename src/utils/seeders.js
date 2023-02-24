import bcrypt from "bcrypt";
import Address from "../models/address.model.js";
import Branch from "../models/branch.model.js";
import Country from "../models/country.model.js";
import Discount from "../models/discount.model.js";
import Location from "../models/location.model.js";
import Province from "../models/province.model.js";
import User from "../models/user.model.js";
import users from "../models/user.model.js";
import FootwearType from "../models/footwearType.model.js";
import Footwear from "../models/footwear.model.js";
import { verifyIdDiscountExist } from "../controllers/discount.controller.js";
import ColorFootwear from "../models/color.model.js";

const password = await bcrypt.hash("2203casa", 8);
const randomNumberBetween = (min = 1000, max = 50000) =>
  Math.floor(Math.random() * (max - min + 1) + min);

/** Descuento Aleatorio **/
const randomDiscount = async () => {
  const countDiscount = await Discount.count();
  let rand = Math.floor(Math.random() * (countDiscount + 1));
  const randomDiscount = await Discount.findOne().skip(rand);
  const id = randomDiscount?._id;
  return id;
};
const randomColors = async () => {
  const countColor = await ColorFootwear.count();
  let i = 0;
  let IDColor = [];
  while (i < 2) {
    let rand = Math.floor(Math.random() * (countColor + 1));
    const randomColors = await ColorFootwear.findOne().skip(rand);
    const id = randomColors?._id;
    IDColor.push(id);
    i++;
  }
  return IDColor;
};

/** ItemCode Aleatorio **/
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const dataUser = [
  {
    name: "Alejandro",
    surname: "Penalba",
    email: "ata@gmail.com",
    password,
    phone: 3815479768,
    birthdate: "1993-09-16",
  },
  {
    name: "Belen",
    surname: "Penalba",
    email: "belen@gmail.com",
    password,
    phone: 3815479768,
    birthdate: "1993-09-16",
  },
  {
    name: "Agustina",
    surname: "Penalba",
    email: "agustina@gmail.com",
    password,
    phone: 3815479768,
    birthdate: "1993-09-16",
  },
];
const dataAddress = [
  {
    as: "Casa",
    nameAddress: "Celedonio Gutierrez",
    number: 661,
    apartament: "",
    cp: 4000,
    idUser: "63e42f07ff9eb213ab56b3ec",
    idLocation: "63e430bc7c06c485a33264a5",
  },
  {
    as: "Casa",
    nameAddress: "La Canadita",
    number: 31,
    apartament: "Lote 31",
    cp: 4005,
    idUser: "63e42f07ff9eb213ab56b3ed",
    idLocation: "63e430bc7c06c485a33264a6",
  },
  {
    as: "Departamento",
    nameAddress: "Monteguado",
    number: 751,
    apartament: "Depto 5 7",
    cp: 4000,
    idUser: "63e42f07ff9eb213ab56b3ee",
    idLocation: "63e430bc7c06c485a33264a5",
  },
  {
    as: "Local Mendoza",
    nameAddress: "Mendoza",
    number: 650,
    cp: 4000,
    idLocation: "63e430bc7c06c485a33264a5",
  },
  {
    as: "Local 24 de Sept",
    nameAddress: "24 de Septiembre",
    number: 481,
    cp: 4000,
    idLocation: "63e430bc7c06c485a33264a5",
  },
  {
    as: "Local 25 de Mayo",
    nameAddress: "25 de Mayo",
    number: 468,
    cp: 4000,
    idLocation: "63e430bc7c06c485a33264a5",
  },
];
const dataCountry = [
  { nameCountry: "Argentina" },
  { nameCountry: "Brasil" },
  { nameCountry: "Uruguay" },
  { nameCountry: "Paraguay" },
  { nameCountry: "Peru" },
  { nameCountry: "Colombia" },
];
const dataProvince = [
  { nameProvince: "Tucuman", idCountry: "63e42f7fadd5cf0dba02d6ea" },
  { nameProvince: "Cordoba", idCountry: "63e42f7fadd5cf0dba02d6ea" },
  { nameProvince: "Mendoza", idCountry: "63e42f7fadd5cf0dba02d6ea" },
  { nameProvince: "Buenos Aires", idCountry: "63e42f7fadd5cf0dba02d6ea" },
  { nameProvince: "Salta", idCountry: "63e42f7fadd5cf0dba02d6ea" },
  { nameProvince: "Rio de Janiero", idCountry: "63e42f7fadd5cf0dba02d6eb" },
  { nameProvince: "Bahia", idCountry: "63e42f7fadd5cf0dba02d6eb" },
  { nameProvince: "Cartagena", idCountry: "63e42f7fadd5cf0dba02d6ef" },
  { nameProvince: "Bogota", idCountry: "63e42f7fadd5cf0dba02d6ef" },
  { nameProvince: "Punta del Este", idCountry: "63e42f7fadd5cf0dba02d6ec" },
  { nameProvince: "Asuncion", idCountry: "63e42f7fadd5cf0dba02d6ed" },
  { nameProvince: "Lima", idCountry: "63e42f7fadd5cf0dba02d6ee" },
];
const dataLocation = [
  { nameLocation: "Capital", idProvince: "63e43011facf7905981ffe4a" },
  { nameLocation: "Yerba Buena", idProvince: "63e43011facf7905981ffe4a" },
  { nameLocation: "Trancas", idProvince: "63e43011facf7905981ffe4a" },

  { nameLocation: "Villa Totoral", idProvince: "63e43011facf7905981ffe4b" },

  { nameLocation: "Gral Alvear", idProvince: "63e43011facf7905981ffe4c" },
  { nameLocation: "San Rafael", idProvince: "63e43011facf7905981ffe4c" },

  { nameLocation: "La Plata", idProvince: "63e43011facf7905981ffe4d" },
  { nameLocation: "Belgrano", idProvince: "63e43011facf7905981ffe4d" },
  { nameLocation: "Pergamino", idProvince: "63e43011facf7905981ffe4d" },

  { nameLocation: "Oran", idProvince: "63e43011facf7905981ffe4e" },
  { nameLocation: "Gral Guemes", idProvince: "63e43011facf7905981ffe4e" },
  { nameLocation: "Metan", idProvince: "63e43011facf7905981ffe4e" },

  { nameLocation: "Copacabana", idProvince: "63e43011facf7905981ffe4f" },

  { nameLocation: "Bahia 1", idProvince: "63e43011facf7905981ffe50" },

  { nameLocation: "Cartagena 1", idProvince: "63e43011facf7905981ffe51" },
  { nameLocation: "Cartagena 2", idProvince: "63e43011facf7905981ffe51" },

  { nameLocation: "Bogota 1", idProvince: "63e43011facf7905981ffe52" },
  { nameLocation: "Bogota 2", idProvince: "63e43011facf7905981ffe52" },

  { nameLocation: "Punta del Este 1", idProvince: "63e43011facf7905981ffe53" },
  { nameLocation: "Punta del Este 2", idProvince: "63e43011facf7905981ffe53" },

  { nameLocation: "Asuncion 1", idProvince: "63e43011facf7905981ffe54" },

  { nameLocation: "Lima 2", idProvince: "63e43011facf7905981ffe55" },
];

const dataBranch = [
  {
    nameBranch: "Clara 1",
    phone: 3815121212,
    idAddress: "63e451e9cee635632148c108",
  },
  {
    nameBranch: "Clara 2",
    phone: 3815101010,
    idAddress: "63e451e9cee635632148c109",
  },
  {
    nameBranch: "Clara 3",
    phone: 3815131313,
    idAddress: "63e451e9cee635632148c10a",
  },
];
const dataDiscount = [
  {
    descriptionDiscont: "10% de descuento",
    discountPercentage: "0.1",
  },
  {
    descriptionDiscont: "50% de descuento",
    discountPercentage: "0.5",
  },
  {
    descriptionDiscont: "2da unidad del mismo producto al 50%",
    discountPercentage: "0.25",
  },
];
const dataColor = [
  {
    colorName: "Blanco",
    colorCode: "#ffffff",
  },
  {
    colorName: "Negro",
    colorCode: "#000000",
  },
  {
    colorName: "Rojo",
    colorCode: "#ff0000",
  },
  {
    colorName: "Azul",
    colorCode: "#000066",
  },
  {
    colorName: "Azul Marino",
    colorCode: "#003399",
  },
  {
    colorName: "Amarillo",
    colorCode: "#ffff00",
  },
  {
    colorName: "Marron",
    colorCode: "#331a00",
  },
  {
    colorName: "Maron Suela",
    colorCode: "#663300",
  },
  {
    colorName: "Verde Oscuro",
    colorCode: "#006600",
  },
  {
    colorName: "Oro",
    colorCode: "#adad00",
  },
  {
    colorName: "Plata",
    colorCode: "#e0e0be",
  },
  {
    colorName: "Rosa",
    colorCode: "#ff66cc",
  },
];

const dataFootwearType = [
  {
    _id: "63752e2d6517e594e197689a",
    nameType: "Sandalias",
    image:
      "https://static.vecteezy.com/system/resources/previews/010/809/351/non_2x/leather-sandals-tropical-palm-leaves-seashells-starfish-on-white-background-summer-backdrop-photo.jpg",
  },
  {
    _id: "63752e2d6517e594e197689b",
    nameType: "Zapatos Fiesta",
    image:
      "https://as1.ftcdn.net/v2/jpg/02/99/40/50/1000_F_299405072_lpjB9ZEnk2i9R9hxSf3EdPfUMfY8RKR3.jpg",
  },
  {
    _id: "63752e2d6517e594e197689c",
    nameType: "Zuecos",
    image:
      "https://i.pinimg.com/736x/c9/a6/ca/c9a6ca80e18c670ecb742a284861cff7.jpg",
  },
  {
    _id: "63752e2d6517e594e197689d",
    nameType: "Bases",
    image:
      "https://img.freepik.com/premium-photo/pair-textile-blue-sneakers-with-laces-levitate-yellow-background-shoes-sports-jogging_116441-20890.jpg?w=2000",
  },
  {
    _id: "63752e2d6517e594e197689e",
    nameType: "Botas",
    image: "https://s1.1zoom.me/big0/325/Seasons_Winter_Branches_459705.jpg",
  },
  {
    _id: "63752e2d6517e594e197689f",
    nameType: "Confort",
    image:
      "https://static.vecteezy.com/system/resources/previews/010/809/351/non_2x/leather-sandals-tropical-palm-leaves-seashells-starfish-on-white-background-summer-backdrop-photo.jpg",
  },
  {
    _id: "63752e2d6517e594e197687a",
    nameType: "Borcegos",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuJgqtlZ7ieb9CMptKWRwCiUKKIhCTuccDTUXqKRk7T92dC_gwCKn5QWlJ_yixcSpSBeA&usqp=CAU",
  },
  {
    _id: "63752e2d6517e594e197687b",
    nameType: "Bucaneras",
    image:
      "https://previews.123rf.com/images/alexraths/alexraths1512/alexraths151200010/50199455-rama-de-la-floraci%C3%B3n-de-primavera-en-el-fondo-de-madera-flores-de-apple.jpg?fj=1",
  },
  {
    _id: "63752e2d6517e594e197688d",
    nameType: "Zapatos",
    image:
      "https://maui.hawaii.edu/hooulu/wp-content/uploads/2019/05/Summer.jpg",
  },
  {
    _id: "63752e256517e594e1976889",
    nameType: "Zapatillas",
    image:
      "https://png.pngtree.com/thumb_back/fh260/background/20201208/pngtree-creative-christmas-gift-box-decoration-green-texture-background-image_504643.jpg",
  },
];
const insertDataFootwear = async () => {
  const aa = await FootwearType.find();
  let result = [];
  const datas = aa.map(async (a) => {
    for (let i = 0; i < 6; i++) {
      let neww = false;
      let size = [];
      let featured = false;
      if (i % 2 === 0) {
        neww = true;
        size = [38, 38.5, 39, 41, 41.5, 43];
      } else {
        neww = false;
        size = [37.5, 39.5, 40, 42, 42.5];
      }
      if (i % 3 === 0) {
        featured = true;
      } else {
        featured = false;
      }
      const footwear = {
        nameFootwear: `${a.nameType} - ${i}`,
        description: "Descripcion de Bucaneras",
        idFootwearType: `${a._id}`,
        photos: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQToAvmJcXz_69869YSNJvj66Sn0G__m55ZmfafkoNYgXrQ_oRD35-Er2RyII8eb-NbS2c&usqp=CAU',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlUgXnESq67NGp1zAQroOPkd92erYLdOyHWvR6NjFc6-SfBpO9U-DoyN0lCRv4DOEGT_0&usqp=CAU',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXTJvemu7Y_HqUNaUQXSK1wEKVOU9dFE8vDhXD7Rm8M83ccAyVF6hRHgzLOBSbR53YmU&usqp=CAU',
        ],
        size,
        countInStock: randomNumberBetween(0,30),
        itemCode: makeid(15),
        // color: ["Negro", "Marron"],
        idColor: await randomColors(),
        new: neww,
        featured,
        priceOriginal: randomNumberBetween(1000, 50000),
        idDiscount: await randomDiscount(),
        stock: randomNumberBetween(0, 300),
      };
      const newFootwear = new Footwear(footwear);
      if (footwear.idDiscount) {
        const discount = await verifyIdDiscountExist(footwear.idDiscount);
        newFootwear.discountedPrice =
          footwear.priceOriginal * discount.discountPercentage;
        newFootwear.totalWithDiscount =
          footwear.priceOriginal -
          footwear.priceOriginal * discount.discountPercentage;
        await newFootwear.save();
      } else {
        (newFootwear.idDiscount = null),
          (newFootwear.totalWithDiscount = footwear.priceOriginal);
        await newFootwear.save();
      }
      result.push(footwear);
    }
  });
};
// insertDataFootwear();

const seedersUp = async () => {
  const passwordRandom = await bcrypt.hash("12345678", 8);

  // await User.create(dataUser)
  // await Country.create(dataCountry)
  // await Province.create(dataProvince)
  // await Location.create(dataLocation)
  // await Address.create(dataAddress)
  // await Branch.create(dataBranch)
  // await Discount.create(dataDiscount)
  // await ColorFootwear.create(dataColor)
  // await FootwearType.create(dataFootwearType);
};

export default seedersUp;
