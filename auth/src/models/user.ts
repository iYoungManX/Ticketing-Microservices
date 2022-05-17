import mongoose from "mongoose";
import { Password } from "../services/password";

// an interface that describes the properties that are requrire to create a new user
// 约束user 的类型
interface UserAttrs {
  email: string;
  password: string;
}
// 
// an interface that describte the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  // here for define static method
  build(attrs: UserAttrs): UserDoc;
}

// an interface that describte the properties that a user model Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  // here for define instance method
}

const userSchema = new mongoose.Schema({
  email: {
    // here use String instead of string
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
},
{  // generate toJSON method, when called, will transformed the data automatically
  toJSON:{
    transform(doc,ret){
      ret.id=ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;

    }
  }
}
);

// before the save, hash the code, done is similar to next()
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
// define the static method, use build to create users with constraint for user input
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// model <T extends Doc, U extend Model<T> >
// because we want to add build method, we change to UserModel
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
