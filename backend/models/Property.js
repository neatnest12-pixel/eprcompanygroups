const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    size: {
      type: String,
      default: ""
    },
    propertyType: {
      type: String,
      default: "Apartment"
    },
    area: {
      type: Number,
      default: 0
    },
    bedrooms: {
      type: Number,
      default: 0
    },
    bathrooms: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    facing: {
      type: String,
      default: ""
    },
    transactionType: {
      type: String,
      default: "sale"
    },
    featured: {
      type: Boolean,
      default: false
    },
    verified: {
      type: Boolean,
      default: true
    },
    hotDeal: {
      type: Boolean,
      default: false
    },
    contactNumber: {
      type: String,
      default: "8939427799"
    },
    agentName: {
      type: String,
      default: "ERP Group Company"
    },
    agentPhone: {
      type: String,
      default: "8939427799"
    },
    mapQuery: {
      type: String,
      default: ""
    },
    videoUrl: {
      type: String,
      default: ""
    },
    amenities: {
      type: [String],
      default: []
    },
    images: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Property", propertySchema);
