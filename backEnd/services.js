const fs = require('fs');
const formidable = require('formidable');
const user = require('./dbOp');

module.exports = class Services {
  path = './profileImage/';

  addUser = async (userData) => {
    if (!userData.email) {
      throw error("email required");
    }
    const newUser = new user({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber ? userData.phoneNumber : "",
      profileImage: userData.profileImage
    });
    await newUser.save();
    return true; 
  }

  updateUser = async (userId, userData) => {
    await user.findByIdAndUpdate(
      userId,
      {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        profileImage: userData.profileImage  
      }
    );
    return true;
  }

  deleteUser = async (userId) => {
    const userData = await user.findByIdAndRemove(userId);
    fs.unlink(`${this.path}${userData.profileImage}`, (err) => {
      if (err) {}
    });
    return true;
  }

  getUserDetail = async (userId) => {
    const userDetails = await user.findById(userId);
    return userDetails;
  }

  getUserList = async () => {
    const userList = await user.find();
    return userList;
  }

  imageUpload = async (req, res) => {
    const form = formidable();
    form.parse(req, (err, fields, image) => {
      if (err) {
        res.send({
          status: false,
          msg: err
        });
        return;
      }
      const fileData = fs.readFileSync(image.fileKey.filepath);
      fs.writeFile(`${this.path}${image.fileKey.originalFilename}`, fileData, function(err){
        if (err) throw err;
      })
      res.send({ status: true, data: {name: image.fileKey.originalFilename}});
    });
  }

}
