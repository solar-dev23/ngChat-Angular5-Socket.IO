import * as bcrypt from "bcrypt-nodejs";
import * as mongoose from "mongoose";

// create a schema
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) { return next(); }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error , isMatch: boolean) => {
    cb(err, isMatch);
  });
};

userSchema.methods.genToken = function () {
  return this.email;
};

if (!userSchema.options.toObject) userSchema.options.toObject = {};

userSchema.options.toObject.transform = (doc, ret) => {
  return {
    email: ret.email,
    username: ret.username,
  };
};

const User = mongoose.model("users", userSchema);

export default User;