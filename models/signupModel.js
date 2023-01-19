const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const signupSchema = mongoose.Schema(
  {
   
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
// HERE PRE MEANS BEFORE GOING TO SAVE THE SHEMA IN DATA BASE
signupSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

signupSchema.methods.matchPassword=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}

const signupUser = mongoose.model("SingupUser", signupSchema);
module.exports = signupUser;