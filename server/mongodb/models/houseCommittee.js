import mongoose, { Schema } from "mongoose";
import moment from "moment";
import mongoosePaginate from "mongoose-paginate-v2";

let houseCommitteeSchema = new Schema({
  committee: {
    type: String,
    required: [true, "A valid house committee is required."],
    enum: [
      "hasc",
      "hfac",
      "hvac",
      "hhsc",
      "hagc",
      "hapc",
      "hbuc",
      "help",
      "nrgy",
      "fisv",
      "admn",
      "ntty",
      "ovst",
      "scnc",
      "smbs",
      "trns",
      "wymn",
      "clmt",
    ],
  },
  title: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    required: false,
  },
  time: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  witnesses: [
    {
      type: String,
    },
  ],
  type: {
    type: String,
    require: true,
  },
});

// Convert dates + times
houseCommitteeSchema
  .path("date")
  .get((v) => (moment(v).isValid() ? moment(v).format("LL") : null));
houseCommitteeSchema
  .path("time")
  .get((v) => (moment(v).isValid() ? moment(v).format("LT") : null));

// Pagination plugin
houseCommitteeSchema.plugin(mongoosePaginate);

// Make model and export
const houseCommittee = mongoose.model("houseCommittee", houseCommitteeSchema);
export { houseCommittee };
