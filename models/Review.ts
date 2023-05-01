import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IReview } from "../interfaces/IReview";

const ReviewSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  uid: {
    type: String,
    required: true,
  },
  pid: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReviewSchema.pre<IReview>("save", async function (next) {
  // const user = this;
  // if (user.isModified("password")) {
  //   user.password = await bcryptjs.hash(user.password, salt);
  // }
  next();
});

ReviewSchema.post<IReview>("save", function () {
  logging.info("Review", "Review just saved: ");
});

export default mongoose.model<IReview>("Review", ReviewSchema);
