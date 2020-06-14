import mongoose, { Schema } from "mongoose";
import moment from "moment";
import mongoosePaginate from "mongoose-paginate-v2";

let senateCommitteeSchema = new Schema({
  committee: {
    type: String,
    required: [true, "A valid house committee is required."],
    enum: [
      "sfrc",
      "sasc",
      "svac",
      "sagc",
      "sapc",
      "sbnk",
      "sbdg",
      "sstr",
      "snat",
      "senv",
      "sfin",
      "shlp",
      "shsc",
      "sind",
      "sjud",
      "srle",
      "seth",
      "ssci",
      "ssbs",
      "svet",
    ],
  },
  type: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    required: false,
  },
  witnesses: [
    {
      type: String,
    },
  ],
});

// Pagination plugin
senateCommitteeSchema.plugin(mongoosePaginate);

// Convert dates + times
senateCommitteeSchema
  .path("date")
  .get((v) => (moment(v).isValid() ? moment(v).format("LL") : null));
senateCommitteeSchema
  .path("time")
  .get((v) => (moment(v).isValid() ? moment(v).format("LT") : null));

// Make model and export
const senateCommittee = mongoose.model(
  "senateCommittee",
  senateCommitteeSchema
);
export { senateCommittee };
