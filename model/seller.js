const mongoose = require('mongoose');

const tier_min = {
  key: String,
  value: String
}


const TierObject = {
  entity_products: {type: []},
  acp_tag: String,
  samProductMultiTier:String,// only for selectd seller not for all user
  group_name: String,
  group_type: String,
  entity_name: String,
  // entity_type: String,
  // tier_value: String,
  // tier_name: String,
  tier_min: {type: [tier_min]},
  tier_max: {type: Array},
  tier_values: {type: Array},
  tier_status: Boolean,
  discount_type: String,
  // created_date: {type: Date,default:new Date()},
  // start_date: Date,
  // end_date: Date,
  // entity_type_ids: [Number],
  // Location_Tag_:{},
  // DiscountAppliedON:String,
  // marketRegion: {type: Array},
};
const shopifyDataSchema = new mongoose.Schema({
  MyShopifyDomain: String,
  accessToken: String,
  InstallStatus: Boolean,
  installDate: { type: Date, default: Date.now },
  IsAppEnable: Boolean,
  IsTable: Boolean,
  nonce: String,
  isMailStatus: Boolean,
  plan: Number,
  full_type:String,
  TierObject: {type: [TierObject] },

});

module.exports = mongoose.model('Seller', shopifyDataSchema);