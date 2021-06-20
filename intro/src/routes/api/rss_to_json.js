const express = require('express');
const controller = require('../../controllers/rss_to_json');

const router=express.Router();

router.get('/:url', controller.fromRSSUrlToJson);

module.exports=router;