const express = require("express");
const router = express.Router();
const Seller = require('../model/seller');
//All data .....
router.post('/mongodbqureyData', async (req, res) => {
  try {
    let DataSeller = {
      MyShopifyDomain: "bharat-test-store.myshopify.com",
      accessToken: "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",
      InstallStatus: true,
      IsAppEnable: false,
      IsTable: true,
      nonce: "hRmDsWUyn0QuRe2j7KeryQtmoP9A1DUzbL8Jlt0ff4FvzlyCZDBlAI1KSfti",
      isMailStatus: false,
      plan: 1,

      TierObject:{
        entity_products:[],
        acp_tag:'VIP',
        samProductMultiTier:'hello',
        group_name:'BM',
        group_type:'Tset',
        entity_name:'Name',
        tier_min: {type: Array},
        tier_max: {type: Array},
        tier_values: {type: Array},
        tier_status: true,
        discount_type: 'amount',

      }
    };

    const dummyData = new Seller(DataSeller);
    let dat = await dummyData.save();

    res.status(200).send({ message: "success", GetData: dat });
  } catch (error) {
    console.log("error: ", error);
    return res.send({ status: 'error', message: 'Something went wrong, please try again later.', errorMessage: error.message });
  }
});


router.get('/mongodbqureyGet',async(req,res) => {
  try {
    let { shop } = req.body;
    //{ $set: { InstallStatus: false ,IsAppEnable:true }} //Update
    // let data = await Seller.find({MyShopifyDomain:shop}).limit(2);
    let data = await Seller.findOneAndUpdate({MyShopifyDomain:shop},
      // { $addToSet: { full_type: "New Value" } },//new feild add
      // { new: true }
    );

    // { $set: { full_type: "unleaded" } }, // Use $set to add the new field
    // { new: true } // To return the updated document

    console.log("data: ", data);


    // let data = await Seller.aggregate([
    //     { $match: { MyShopifyDomain: shop } }, // Match documents with the given shop
    //     { $limit: 1 }, // Limit the result to one document

    //     {
    //         $project: {
    //             _id: 0, // Exclude the default '_id' field
    //             MyShopifyDomain: 1,
    //             accessToken: 1,
    //             InstallStatus: 1,
    //             customField: "Some custom value" // Example of adding a custom field
    //         }
    //     }
    // ]);


    res.status(200).send({ message: "success", GetData: data})
  } catch (error) {
    console.log("error: ", error);
    return res.send({ status: 'error', massage: 'Something Get Wrong, Please Try Again Latter.', errorMessage : error.message });

  }
})

router.post('/pushData',async(req,res) => {
  try {
    let { shop } = req.body;
    //.......... Push data....
    //   let data = await Seller.findOneAndUpdate({MyShopifyDomain:shop,"TierObject.group_name": "BM"},
    //   {
    //     $push: {"TierObject.$.tier_min": { key: 'name', value: 'newOtherValue' }} //push data Done
    //   },
    // { new: true }
    // )

    //......................Delete fildes
    // let data = await Seller.updateOne({MyShopifyDomain:shop},
    //     { $unset: { MyShopifyDomain: 1 } }
    //  );


    //......................update fildes.....
    // let data = await Seller.updateOne({MyShopifyDomain:shop},
    //     { $set: { InstallStatus: true } }
    //  );


    //......................check Emty Arry
    let data = await Seller.find({MyShopifyDomain:shop},
      {"TierObject.entity_products": { $exists: true, $size: 0 }}
    );



    res.status(200).send({message:"success",pushData : data});

  }catch (error) {
    return res.send({ status: 'error', massage: 'Something Get Wrong, Please Try Again Latter.', errorMessage : error.message });
  }

});

module.exports = router;

